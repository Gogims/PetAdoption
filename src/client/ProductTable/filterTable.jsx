import React from 'react';

class FilterTable extends React.Component{
  constructor(props){
    super(props);

    this.onFilterProduct = this.onFilterProduct.bind(this);
    this.onToggleStock = this.onToggleStock.bind(this);
  }

  onFilterProduct(e){
    this.props.onFilterTextbox(e.target.value);
  }

  onToggleStock(e){
    this.props.onStockedCheckbox(e.target.checked);
  }
  
  render(){
    return(
      <div>
        <input type="textbox" placeholder="Search..." value={this.props.filter} onChange={this.onFilterProduct} />
        <br/>
        <label>
          <input type="checkbox" onChange={this.onToggleStock} checked={this.props.stocked}/>
          <span>Only show products in stock</span>
        </label>
      </div>
    )
  }
}

export default FilterTable;