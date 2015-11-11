/**
 * Created by AlexLiu on 2015/9/7.
 */


import React, { PropTypes } from 'react'
import classnames  from 'classnames';
import {Promise} from 'es6-promise';
import AvatarComponent from './Avatar.js';


export default class TreeNodeForSearch extends React.Component {

    static defaultProps = {
        showInput:true,
        item: {}
    }

    constructor(props){
        super(props);

    }


    render(){
        const {
            item,
            handleCheck,
            showInput
        } = this.props;



        return(
            <li className="dropdown-item" style={{borderBottom:'none'}}>
                <label className="treeview-user" style={{display:'block', cursor: 'pointer'}}>
                    <AvatarComponent className="treenode-avatar" userName={item.U_NAME} trueName={item.U_TRUE_NAME}  width={30} height={30} style={{marginRight:10, verticalAlign:'middle'}}/>
                    <span>{item.U_TRUE_NAME}</span>
                    {showInput && <input className="treeview-user-check" style={{float:'right'}} type="checkbox" onClick={::this.handleCheck} checked={item.checked} value={item.checked}  />}
                </label>
            </li>

        );

    }

    handleCheck(e){
        this.props.handleCheck && this.props.handleCheck(this, e.target.checked);
    }



}

