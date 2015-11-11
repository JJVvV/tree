/**
 * Created by RichardJi on 2015/9/14.
 */

import React from 'react';

import classnames from 'classnames';

import {getSectionPersionTree, loopTreeForLaunchr, getSectionByInitial} from './utils/sectionPeopleTree.js';
import TreeForLaunchr from './TreeForLaunchr.js';
import TreeNodeForSearch from './TreeNodeForSearch.js';
import {FadeModal as Modal} from '../boron/Boron.js';

import AvatarComponent from './Avatar.js';
import $ from 'jquery';
import InitialT from './InitialT.js';
import Pop from "./Pop.js";

var base = {};
let cache = {};

const INITIAL_TYPE = 'iniital';


export default class SelectUserArea extends React.Component{

    static defaultProps = {
            getKey: (t) => (t.SHOW_ID),
            getSelectKeys: () => ([]),
            selectKeys: []
    }

    constructor(props){
        super(props);
        this.state = {
            selectKeys : props.selectKeys || [],
            responseType:'',
            tree: [],
            showInitial: props.showInitial || false,
            initial: {},
            searchUsers: []
        }
        this.selectKeys = props.selectKeys || [];
        this.updateSelectKeys = props.selectKeys || [];
        this.sectionTree = [];
        this.person = [];

    }



    componentWillUpdate(props){
        this.updateSelectKeys = props.selectKeys;
        this.selectKeys = props.selectKeys;
    }

    componentDidMount(){
        getSectionPersionTree([]).then(({section, person}) => {

            this.sectionTree = section;
            this.person = person;
            this.renderTree(section);

        });

        //getSectionByInitial().then(([initialList, personList]) => {
        //
        //    this.setState({
        //        initial: {
        //            initialList,
        //            personList
        //        }
        //    });
        //})
    }

    renderTree(sectionTree){
        this.setState({
            treeData: sectionTree,
            tree: this.getSelectedObj(this.sectionTree)
        });
    }

    _search(e){
        let value = e.target.value.trim();

        let users = this._filterUsers(value, this.state.selectKeys);
        this.setState({
            searchUsers: users
        });
    }

    _filterUsers(value ,selectKeys = []){
        if(!value.trim()) return [];
        let users = this.person.filter((item) => item.U_TRUE_NAME.search(new RegExp(value, 'gim')) !== -1);

        users = users.map((item) => {
            item = $.extend({}, item);
            item.checked = selectKeys.some((i) => i === item.SHOW_ID);
            return item;
        });
        return users;
    }

    render(){

        return (
            <TreeForLaunchr multiple={this.props.multiple} onCheck={::this.handleCheck} getKey={::this.props.getKey} defaultCheckedKeys={this.state.selectKeys} data={this.state.treeData} />


        );
    }

    toggleTree(type){
        this.setState({
            showInitial: type === INITIAL_TYPE
        });
    }
    getSelectKeysObj(tree){
        let selectedKeys = [];

        loopTreeForLaunchr(tree, (item) => {
            this.selectKeys.forEach((k) => {
                if(k === item.U_NAME){
                selectedKeys.push({
                    name: item.U_NAME,
                    trueName: item.U_TRUE_NAME,
                    url: '../../../redux-launchr/public/img/jinmuyan.jpg',
                    deptName: item.D_NAME
                });
            }
            });
        })

        return selectedKeys;
    }
    getSelectedObj(tree){
        let selectedKeys = [];

        let {
            selectKeys
            } = this.props;
        let uniqueObj = {};
        loopTreeForLaunchr(tree, (item) => {
            selectKeys.forEach((k) => {
            if(k === item.U_NAME && !uniqueObj[k]){
                uniqueObj[k] = true;
                selectedKeys.push({
                    name: item.U_NAME,
                    trueName: item.U_TRUE_NAME,
                    url: '../../../redux-launchr/public/img/jinmuyan.jpg',
                    deptName: item.D_NAME
                });
            }
        });
    })

        return selectedKeys;


    }

    sureClick(){
        this.props.onCheck && this.props.onCheck(this.state.tree);
        this.hide();
    }

    _handleCheck(person, check){

        let {item} = person.props;
        //console.log(item);
        let keys = this.state.selectKeys;
        let existed;
        let user;
        let tree = this.state.tree;
        this.props.multiple || (keys = [], tree = []);
        if(check){

            existed = keys.some((i) => (i === item.SHOW_ID));

            if(!existed){
                keys.push(item.SHOW_ID);
                user = getUser(item);
                tree.push(user);

            }
        }else{
            keys = keys.filter((i) => item.SHOW_ID !== i);
            tree = tree.filter((i) => item.SHOW_ID !== i.id)
        }
        let searchUsers = this._filterUsers(this.refs.search.getDOMNode().value, keys);
        this.setState({
            selectKeys: keys,
            tree,
            searchUsers
        });
    }
    handleCheck(result){
        let list = [];
        let keys = [];
        let uniqueObj = {};

        result.data.forEach((item, index) =>{
            let user = getUser(item);
            if(!uniqueObj[user.id]){
                uniqueObj[user.id] = true;
                list.push(user);
            }
            //keys.push(item.SHOW_ID);
        });
        keys = result.checkedAllKeys;
        this.selectKeys = keys;
        debugger;
        let searchUsers = this._filterUsers(this.refs.search.getDOMNode().value, keys);
        this.setState({
            tree: list,
            selectKeys: keys,
            searchUsers
        });
    }



    removeUser(index){
        let selectUser = this.state.tree;
        selectUser.splice(index, 1);
        let selectKeys = selectUser.map((i) => i.name);

        this.selectKeys = selectKeys;
        let searchUsers = this._filterUsers(this.refs.search.getDOMNode().value, selectKeys);
        this.setState({
            tree:selectUser,
            selectKeys,
            searchUsers
        });
    }

    show(){
        var tree = this.getSelectedObj(this.sectionTree);
        this.setState({
            selectKeys: this.props.selectKeys,
            tree,
            showInitial: true
        });
        this.refs.modal.show();

    }

    hide(){
        this.refs.modal.hide();
    }

}


function getUser(item){
    return {
        id:item.SHOW_ID,
        name:item.U_NAME,
        trueName: item.U_TRUE_NAME,
        url:  '../../../redux-launchr/public/img/jinmuyan.jpg',
        deptName: item.D_NAME
    }
}


//<Pop>
//    <Modal ref="modal">
//        <div className="choose-people-box clearfix" style={{boxShadow: 'none'}}>
//            <div className="half-box">
//                <div className="item-wrapper">
//                    <div className="form-feedback left input-whole-width ">
//                        <input ref="search" type="search" className="form-c" placeholder={base.Search} onChange={::this._search} />
//                    </div>
//                </div>
//                <div className="item-wrapper">
//                    <div className="approval-handle-title clearfix ">
//                        <div className={classnames('choose-people-title-item', {active: this.state.showInitial})} onClick={this.toggleTree.bind(this, INITIAL_TYPE)}>
//                            <span>{base.ByName}</span>
//                        </div>
//                        <div className="choose-people-title-item active" className={classnames('choose-people-title-item', {active: !this.state.showInitial})} onClick={this.toggleTree.bind(this)}>
//                            <span>{base.ByDept}</span>
//                        </div>
//                    </div>
//                </div>
//                {this.state.showInitial ?  <InitialT  multiple={this.props.multiple} excludedKeys={this.props.excludedKeys} onCheck={::this.handleCheck} defaultCheckedKeys={this.state.selectKeys} initial={this.state.initial} />:
//                }
//            </div>
//            <div className="half-box">
//                <div className="meeting-box-body">
//                    <div className="attend-person-group select-num-title">
//                        <span>{base.Selected+this.state.tree.length+base.Contacts}</span>
//                        <i className="demo-icon icon-glyph-167 pull-right" onClick={::this.hide}></i>
//                    </div>
//                    {
//                        this.state.tree.length > 0 && this.state.tree.map((item, index)=>{
//                            return (
//                                <label>
//                                    <div className="person-group clearfix" key={item.name}>
//                                        <AvatarComponent userName={item.name} trueName={item.trueName} width={30} height={30} className="pull-left" style={{marginRight:'8'}}/>
//                                        <div className="person-group-detail">
//                                            <span style={{verticalAlign:'top'}}>{item.trueName}</span>
//                                            <p className="team-name">{item.deptName}</p>
//                                            <i className="demo-icon icon-glyph-194" onClick={::this.removeUser.bind(this, index)}></i>
//                                        </div>
//                                    </div>
//                                </label>)
//                        })
//                    }
//                </div>
//                <div className="meeting-box-footer">
//                    <span className="btn-comfirm" onClick={::this.sureClick}>{base.Confirm}</span>
//                    <span className="btn-cancle" onClick={::this.hide}>{base.Cancel}</span>
//                </div>
//            </div>
//        </div>
//    </Modal>
//</Pop>