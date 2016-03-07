var $ = require ('jquery');
import React from 'react';

import Memoitem from './memoitem.jsx'
import Button from './button.jsx'
import Additem from './additem.jsx'

class Memolist extends React.Component{
    constructor(props) {
       super(props);
       this.state = {data: {items: []}};
    }

    loadFromServer() {
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          success: (data) => {
            this.setState({data: data});
          },
          error: (xhr, status, err)  => {
            console.error(this.props.url, status, err.toString());
          }
        });
    }

    componentDidMount() {
        this.loadFromServer();
    }

    deleteItem(url) {
        $.ajax({
            type: 'DELETE',
            url: url,
            success: function() {
                this.loadFromServer();
            }.bind(this)
        });
    }

    render() {
      return (<div className="col-lg-4 col-sm-6 col-xs-12">
      <div className="panel panel-default">
      <div className="panel-heading clearfix"><h4 className="panel-title  pull-left">{ this.state.data.name } </h4>
      <div className="btn-group pull-right"><Button onClick={this.props.handleDelete} glyph="glyphicon glyphicon-remove" /></div></div>

      <div className="table-responsive">
        <table className="table table-striped">
        <thead>
          <tr>
            <th>Item</th>
            <th>Added</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
         {this.state.data.items.map(function(memoitemData){
            return <Memoitem key={memoitemData.id} url={memoitemData.uri} handleDelete={this.deleteItem.bind(this, memoitemData.uri)} />;
          }.bind(this))}
         </tbody>
         </table>
         </div>
      <div className="panel-body">
      <Additem url={this.state.data.items_uri} onAdd={this.loadFromServer.bind(this)}/>
      </div>
      </div>
      </div>);
    }
}

export default Memolist;