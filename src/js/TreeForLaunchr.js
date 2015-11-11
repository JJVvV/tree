/**
 * Created by AlexLiu on 2015/9/7.
 */


import React, { PropTypes } from 'react'
import classnames  from 'classnames';
import Tree from './Tree.js';
import TreeNode from './TreeNode.js';

export default class TreeForLaunchr extends React.Component{

    static defaultProps = {
        getKey: (t) =>(t.SHOW_ID),
        defaultCheckedKeys: [],
        excludedKeys:[],// 排除的用户
        onCheck: () => {},
        multiple:true,
        data: []

    }
    constructor(props){
        super(props);
        this.state = {
            tree : this.props.data || []
        }

    }





    render(){

        return (


            <div className="launchr-tree" ref="tree">

                <Tree {...this.props}>
                    {this.buildTreeView(this.props.data)}
                </Tree>
            </div>
        );
    }

     buildTreeView(tree){
        return tree.map((t, i) => {

            let hasChildren = t.children && t.children.length > 0;
            let isUser= !!t.U_NAME;
            let label = t.D_NAME;
            let child;
            return (
                <TreeNode isUser={isUser} key={this.props.getKey(t)} data={t}  title={label}  defaultCollapsed={false} label={label}>
                    {hasChildren && ::this.buildTreeView(t.children)}
                </TreeNode>
            );
        });
    }


}










