var $ = require ('jquery');
import React from 'react';

import Memolist from './memolist.jsx'
import Addlist from './addlist.jsx'

class Memoboard extends React.Component{
    constructor(props) {
       super(props);
       this.state = {data: []};
    }

    loadFromServer() {
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          success: (data) => {
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

    reLoad() {
        this.loadFromServer();
    }

    render() {
      return (<div>
              {this.state.data.map(function(memolistData ,i){
                    return <Memolist key={i} data={memolistData} url={memolistData.uri} />;
              })}
              <Addlist url={this.props.url} onAdd={this.reLoad}/>
      </div>);
    }
}

export default Memoboard;