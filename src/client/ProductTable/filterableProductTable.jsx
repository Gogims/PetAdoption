import React from 'react';
import axios from 'axios';
import FilterTable from './filterTable';
import ProductTable from './productTable';

class FilterableProductTable extends React.Component{
  constructor(props){
    super(props);

    this.state={
      filteredText: '',
      isStocked: false,
      products: []
    };

    this.handleFilterTextbox=this.handleFilterTextbox.bind(this);
    this.handleStockedCheckbox=this.handleStockedCheckbox.bind(this);
    this.getProducts=this.getProducts.bind(this);
  }

  getProducts(){
  
    axios.get('http://localhost:3000/api/products/1').then(response => {
    
    this.setState({
        products: [
          {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
          {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
          {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
          {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
          {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
          {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
        ]
      });

    }).catch(function (error) {
      console.log(error);
    });;
  }

  componentDidMount(){
    this.getProducts();
  }

  handleFilterTextbox(text){
    this.setState({
      filteredText: text
    });
  }

  handleStockedCheckbox(isChecked){
    this.setState({
      isStocked: isChecked
    });
  }

  render(){
    return(
      <div>
        <FilterTable filter={this.state.filteredText} stocked={this.state.isStocked}  
        onFilterTextbox={this.handleFilterTextbox} onStockedCheckbox={this.handleStockedCheckbox} />
        <br/>
        <ProductTable products={this.state.products} filter={this.state.filteredText} 
        stocked={this.state.isStocked}/>
      </div>
    );
  }
}

export default FilterableProductTable;