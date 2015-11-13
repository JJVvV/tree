/**
 * Created by AlexLiu on 2015/9/7.
 */


import React, { PropTypes , Children} from 'react'
import classnames  from 'classnames';
import getTopNode from './utils/getTopNode.js';
import {posLength, parentPos} from './utils/pos.js';
import TreeNode from './TreeNode';
import extend from './utils/extends';


export default class Tree extends React.Component {

    static defaultProps = {
        checkedKeys:[],
        multiple:true,
        expandedKeys: []
    }

    constructor(props){
        super(props);

        //this.state = {
        //    collapsed:props.defaultCollapsed,
        //    checkedKeys: this.props.multiple ? this.props.defaultCheckedKeys : [this.props.defaultCheckedKeys[0]]
        //}



        this.allNodes = [];
    }

    componentWillReceiveProps(props){
        debugger;

    }

   //componentWillReceiveProps(props){
   //     this.setState({
   //         collapsed:props.defaultCollapsed,
   //         checkedKeys: props.multiple ?props.defaultCheckedKeys : [props.defaultCheckedKeys[0]]
   //     });
   // }


    loopTreeData(children, callback){
        const loop = (Children, level) => {
            Children.forEach((item, index) => {
                const pos = `${level}-${index}`;
                const newChildren = item.children;

                callback(item, index, pos);
                if(newChildren){
                    loop(newChildren, pos);
                }
            });

        }
        loop(children, 0);
    }



    handleCheckState(obj, checkedArr, multiple, event){
        let eve = false;
        if(typeof event === 'boolean'){
            eve = true;
        }

        checkedArr.forEach((pos) => {

            let loopUp = (obj, pos) => {

                let pPos = parentPos(pos);
                const parentLen = posLength(pPos);
                let parentObj = obj[pPos];
                if(parentLen < 2) return;
                let i = 0;
                let checkedNum = 0;
                let cur;
                while(cur = obj[`${pPos}-${i}`]){
                    if(cur.checked){
                        checkedNum++
                    }else if(cur.checkPart){
                        checkedNum += 0.5;
                    }
                    i++
                }

                if(checkedNum === 0){
                    parentObj.checked = false;
                    parentObj.checkPart= false;
                }else if(checkedNum === i){
                    parentObj.checked = true;
                    parentObj.checkPart = false;

                }else{
                    parentObj.checked = false;
                    parentObj.checkPart = true;
                }

                loopUp(obj, pPos);

            }




            let loopDown = (obj, pos, checked) => {
                let i = 0;
                let cur ;
                while(cur = obj[`${pos}-${i}`]){
                    cur.checked = checked;
                    loopDown(obj, `${pos}-${i}`, checked);
                    cur.checkPart = false;
                    i++
                }
            }

            loopDown(obj, pos, eve ? event : true);
            loopUp(obj, pos);




        });
    }

    handleCheck(treeNode){

        let tProps = treeNode.props;
        let checked = !tProps.checked;


        let pos;
        let item = this.treeNodes[tProps.pos];
        item.checked = checked;
        if(item.checked) item.checkPart = false;

        this.handleCheckState(this.treeNodes, [tProps.pos], this.props.multiple, checked);
        let keys = this.getCheckedNodes();


        this.setState({
            //checkedKeys: keys.checkedKeys
        });

        if(typeof this.props.onCheck === 'function'){
            this.props.onCheck({
                checked,
                node: treeNode,
                checkedNodes: keys.checkedNodes,
                checkPartNodes: keys.checkPartNodes,
                checkedData: keys.checkedData
            });
        }
    }

    getCheckedNodes(){
        const checkedNodes = [];
        const checkPartNodes = [];
        const checkedData = [];

        this.allNodes.forEach((item, index) => {
            if(item.checked){
                checkedNodes.push(item.id);
                checkedData.push(extend({}, item));
            }else if(item.checkPart){
                checkPartNodes.push(item.id);
            }
        });



        return {
            checkedNodes,
            checkPartNodes,
            checkedData
        }

    }

    getCheckedKeys(){
        let {
            multiple,
            checkedKeys
            } = this.props;

        return  multiple ? checkedKeys: [checkedKeys[0]];
    }

    beforeRender(){
        const {
            multiple
            } = this.props;

        this.treeNodes = {};
        let checkedKeys = this.getCheckedKeys();

        const checkedPos = [];
        this.allNodes = [];
        this.loopTreeData(this.props.tree, (item, index, pos) => {

            let key = pos;
            let checked = false;
            let {
                children,
                ...others
                } = item;
            if(checkedKeys.indexOf(key) !== -1){
                checked = true;
                checkedPos.push(pos);
            }

            this.treeNodes[pos] = {
                checked,
                pos,
                checkPart: false,
                section: item.children.length,
                ...others
            };

            this.allNodes.push(this.treeNodes[pos]);
        });

        this.handleCheckState(this.treeNodes, getTopNode(checkedPos), multiple);



    }

    render(){


        this.allNodes.length || this.beforeRender();
        return (
            <div className="tree">
                {this.renderTree(this.allNodes)}
            </div>
        );
    }

    renderTree(tree){
        var i=0, len=tree.length;
        var usefulTree = [];
        let parentCollapsed;

        while(i<len){
            if(tree[i].collapsed){
                if(!parentCollapsed || tree[i].pos.indexOf(parentCollapsed.pos) !== 0){
                    parentCollapsed = tree[i];
                }
            }
            this.allNodes[i].show = (!parentCollapsed ||
                                    tree[i].pos.indexOf(parentCollapsed.pos) !== 0 ||
                                    tree[i] === parentCollapsed);

           i++

        }

        return this.allNodes.map((item, i) => {
            let collapsed = typeof item.collapsed === 'boolean' ? item.collapsed : false;
                return item.show &&
                    <TreeNode
                        key={i}
                        {...item}
                        collapsed={collapsed}
                        pos={item.pos}
                        toggleCollapsed={this.onClick.bind(this, item, i)}
                        handleCheck={::this.handleCheck}
                    />
        });

    }

    onClick(item,index, e){

        let collapsed = item.collapsed;
        this.allNodes[index].collapsed = !collapsed;
        this.setState({});

    }



}

