var $ = require ('jquery');
import React from 'react';
var moment = require('moment');

import Button from './button.jsx'

class Memoitem extends React.Component{
    constructor(props) {
       super(props);
       this.state = {data: {content: '', created:''}};
    }

    loadFromServer() {
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          success: (data)  => {
            this.setState({data: data});
          },
          error: (xhr, status, err) => {
            console.error(this.props.url, status, err.toString());
          }
        });
    }

    componentDidMount() {
        this.loadFromServer();
    }

    render() {
      var date = '';

      if (this.state.data.created) {
           date =  moment(this.state.data.created).format("DD-MM-YY");
      }

      return (<tr>
      <td className="col-xs-6">{ this.state.data.content }</td>
      <td className="col-xs-4 text-muted"><em className="item-date">{ date }</em></td>
      <td className="col-xs-2 text-muted"><Button onClick={this.props.handleDelete} glyph="glyphicon glyphicon-remove" /></td>
      </tr>);
    }
}

export default Memoitem;