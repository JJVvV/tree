/**
 * Created by Alex Liu on 2015/7/10.
 */

import React from 'react';

import SelectUserArea from './js/SelectUserArea';








export default class ApplicationPage extends React.Component{

  constructor(){
    super();
  }

  show(){
      this.refs.tree.show();
  }

  render(){
    return (
       <div className="test">
           <button onClick={::this.show}>click me</button>
           <SelectUserArea ref="tree" multiple={true} />
       </div>
    );
  }

}

