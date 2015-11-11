/**
 * Created by AlexLiu on 2015/9/7.
 * 首字母排序的tree
 */


import React, { PropTypes } from 'react'
import classnames  from 'classnames';
import AvatarComponent from './Avatar.js';

import {combinePersonByInitial} from './utils/sectionPeopleTree.js';



const ID = 'SHOW_ID';

export default class TreeForLaunchr extends React.Component{

    static defaultProps = {
        getKey: (t) =>(t.SHOW_ID),
        defaultCheckedKeys: [],
        excludedKeys:[],// 排除的用户
        onCheck: () => {},
        multiple:true
    }

    state = {
        tree: [],
        checkedKeys: this.props.multiple ? this.props.defaultCheckedKeys : [this.props.defaultCheckedKeys[0]]
    }

    constructor(props){
        super(props);
        this.personList = [];
    }

    componentWillReceiveProps(props){
        this.handleCheckState(props.defaultCheckedKeys);

        let resultList = combinePersonByInitial(this.initialList, this.personList);
        this.setState({
            tree: resultList
        });

    }
    handleCheckState(checkedKeys, event){

        let evt = false;
        if(typeof event === 'boolean'){
            evt = true;
        }
        let keys = [];
        this.personList.forEach((person) => {
            person.checked = false;
        });

        this.personList.forEach((person) => {
            checkedKeys.forEach((k) => {
                if(k === person.SHOW_ID){
                    if(evt){
                        person.checked = event;
                    }else{
                        person.checked = true;
                    }
                }
            });
        });

    }

    handleCheck(person){
        let that = this;
        let checked;
        //let checkedKeys = [];
        let checkedNode = [];
        checkedAllKeys = [];
        this.personList.forEach((p) => {

            if(person.SHOW_ID === p.SHOW_ID){
                p.checked = !p.checked;
                checked = p.checked;
            }else if(!that.props.multiple){
                p.checked = false;
            }




            if(p.checked){
                checkedAllKeys.push(p.SHOW_ID);
                checkedNode.push(p);
            }
        });



        let resultList = combinePersonByInitial(this.initialList, this.personList);
        this.setState({
            tree: resultList
        });


        if(typeof this.props.onCheck === 'function'){
            this.props.onCheck({
                checked,
                //node: treeNode,
                checkedAllKeys,
                data: checkedNode
            });
        }

    }

    componentDidMount(){

        let {initialList, personList} = this.props.initial;
        this.initialList = initialList;
        this.personList = personList;
        this.handleCheckState(this.state.checkedKeys);
        let resultList = combinePersonByInitial(this.initialList, this.personList);
        this.setState({
            tree: resultList
        });
    }





    renderTree(sectionTree){
        this.setState({
            tree: sectionTree
        });
    }

    render(){

        return (


            <div className="launchr-tree" ref="tree">
                {this.generateInitialList(this.state.tree)}
            </div>
        );
    }

    generateInitialList(list){
        return (
            <div className="tree">
                {list.map((item) => {
                    return this.generateInitialItem(item);
                })}
            </div>
        );

    }


    generateInitialItem(item){
        return (
            <div className="initial-item">
                <p className="letter">{item.initial}</p>


                {item.person.map((person, index) => {
                    return (
                        <label htmlFor={person.D_NAME+person[ID]} className="person-group clearfix" key={index} style={{cursor:'pointer', display:'block'}}>
                            <AvatarComponent userName={person.U_NAME} trueName={person.U_TRUE_NAME} width={30} height={30} style={{float: 'left'}} className="treenode-avatar" />
                            <div className="person-group-detail">
                                <input id={person.D_NAME+person[ID]} type="checkbox" className="select-name-input pull-right" checked={person.checked} onClick={::this.handleCheck.bind(this, person)} />
                                <span>{person.U_TRUE_NAME}</span>
                                <p className="team-name">{person.D_NAME}</p>

                        </div>
                        </label>
                    );
                })}


            </div>
        );
    }




}










