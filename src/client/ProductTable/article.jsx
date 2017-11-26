import React from 'react';

class Article extends React.Component{
  render(){
    if (this.props.stocked) {
      return(
        <tr>
          <td>{this.props.name}</td>
          <td>{this.props.price}</td>
        </tr>
      );
    }
    else{
      return(
        <tr style={{color: 'red'}}>
          <td>{this.props.name}</td>
          <td>{this.props.price}</td>
        </tr>
      );
    }
  }
}

export default Article;