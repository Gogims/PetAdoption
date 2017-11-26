import React from 'react';
import Category from './category';
import Article from './article';

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

export default ProductTable;