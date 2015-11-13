/**
 * Created by Alex Liu on 2015/7/10.
 */

import React from 'react';


import treeData from './js/utils/treeData.js';

import TreeWrapper from './js/TreeWrapper';






export default class ApplicationPage extends React.Component{

  constructor(){
    super();
  }

  state = {
      tree: [],
      checkedNodes: [],
      checkPartNodes: [],
      checkedData: []
  }

  show(){
      this.refs.tree.show();
  }

    renderNodes(nodes, title){
        return (
            <ul>
                <li>{title}:</li>
                {nodes.map((item, index) => <li key={index}>{typeof item === 'string' ? item : JSON.stringify(item)}</li>)}
            </ul>
        );
    }

  render(){
    return (
       <div className="test">
           <TreeWrapper

               tree={treeData}
               onCheck={::this._onCheck} />
           {this.renderNodes(this.state.checkedNodes, 'checkedNodes')}
           {this.renderNodes(this.state.checkPartNodes, 'checkPartNodes')}
           {this.renderNodes(this.state.checkedData, 'checkedData')}
       </div>
    );
  }

    _onCheck({checkedNodes, checkPartNodes, checkedData}){

        this.setState({
            checkedNodes,
            checkPartNodes,
            checkedData
        });
    }

}

