/**
 * Created by AlexLiu on 2015/9/7.
 */


import React, { PropTypes } from 'react'
import classnames  from 'classnames';
import {posLength} from './utils/pos';

export default class TreeNode extends React.Component {

    constructor(props){
        super(props);

    }



    render(){
        let {toggleCollapsed,
            collapsed,
            title,
            section,
            pos,
            checked,
            checkPart,
            handleCheck

        } = this.props;
        let className = checkPart ? 'half' : '';
        return (
            <div style={{marginLeft:posLength(pos) * 20}}>
                <span onClick={toggleCollapsed}>{title}</span>
                <input
                    style={{float:'right'}}
                    className={className}
                    type="checkbox"
                    checked={checked}
                    onClick={::this.handleCheck}
                />
            </div>
        );




    }

    shouldComponentUpdate(props, state){
        let {
            checked,
            checkPart
            } = this.props;

        return checked !== props.checked || checkPart !== props.checkPart;
    }

    handleCheck(){
        this.props.handleCheck(this);
    }

}

