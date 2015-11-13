/**
 * Created by AlexLiu on 2015/9/7.
 */


import React, { PropTypes } from 'react'
import classnames  from 'classnames';
import Tree from './Tree.js';
//import Tree from './Tree_copied.js';
import TreeNode from './TreeNode.js';

export default class TreeForLaunchr extends React.Component{

    static defaultProps = {
        keyName: 'SHOW_ID',
        defaultCheckedKeys: [],
        onCheck: () => {},
        multiple:true,
        tree: []

    }
    constructor(props){
        super(props);

    }



    render(){

        return (

            <div className="launchr-tree" ref="tree">
                <Tree {...this.props} />
            </div>
        );
    }




}










