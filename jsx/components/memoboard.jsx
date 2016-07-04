import React from 'react';
import axios from 'axios';

import Memolist from './memolist.jsx'
import Addlist from './addlist.jsx'

class Memoboard extends React.Component{
    render() {
      return (<div className="container">
                <div className="row">
                <div className="col-lg-4 col-sm-6 col-xs-12"><h1>MemoBoard</h1></div>
                <div className="col-lg-4  visible-lg"></div>
                <div className="col-lg-4 col-sm-6 col-xs-12">
                <Addlist url={this.props.url} /></div>
                </div>
                <hr />
                <div className="row">
                  {this.props.lists.map(function(memolistData){
                        return <Memolist key={memolistData.id} {...this.props}/>;
                  })}
                </div>
      </div>);
    }
}

export default Memoboard;