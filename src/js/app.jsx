import React from 'react';
import ReactDOM from 'react-dom';
import '../css/index.css';
//  import keenImage from '../assets/keen.png';

function getProducts(){
  return [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
  ];
}

class FilterableProductTable extends React.Component{
  constructor(props){
    super(props);

    this.state={
      filteredText: '',
      isStocked: false
    };

    this.handleFilterTextbox=this.handleFilterTextbox.bind(this);
    this.handleStockedCheckbox=this.handleStockedCheckbox.bind(this);
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
        <ProductTable products={this.props.products} filter={this.state.filteredText} 
        stocked={this.state.isStocked}/>
      </div>
    );
  }
}

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

class ProductTable extends React.Component{
  render(){
    let categories=[];
    let products=[];

    const filteredProduct = this.props.products.filter(         
      (product) => {
        return  (!this.props.filter || product.name.includes(this.props.filter)) &&
                (!this.props.stocked || product.stocked === this.props.stocked)
      }
    );

    filteredProduct.map(
      (product) => {

        if (!categories.some(category => category === product.category)) {        
          products.push(<Category key={product.category} category={product.category} />);
          categories.push(product.category);
        }

        products.push(<Article 
        key={product.name} 
        name={product.name} 
        price={product.price}
        stocked={product.stocked}
        />
        );
      }
    );

    return(
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products}
        </tbody>
      </table>
    );
  }
}

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

ReactDOM.render(
  <FilterableProductTable products={getProducts()}/>,
  document.getElementById('root')
);
