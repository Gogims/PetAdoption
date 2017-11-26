import React from 'react';

class Category extends React.Component{
  render(){
    return(
      <tr>
        <td colSpan="2">
          <b>{this.props.category}</b>
        </td>
      </tr>
    );
  }
}

export default Category;