import React, { Component } from 'react';

import CheckBox from './CheckBox';
import FilteredList from './FilteredList';
import data from './data.json';

class App extends Component {
  state = {
    brands: [
      {id: 1, value:'Motorola', isChecked: false},
      {id: 2, value:'Apple', isChecked: false},
      {id: 3, value:'OnePlus', isChecked: false},
      {id: 4, value:'Oppo', isChecked: false},
      {id: 5, value:'Vivo', isChecked: false},
      {id: 6, value:'Lyf', isChecked: false},
    ],
    ratings: [
      {id: 1, value:'5 stars', isChecked: false},
      {id: 2, value:'4 stars', isChecked: false},
      {id: 3, value:'3 stars', isChecked: false},
      {id: 4, value:'2 stars', isChecked: false},
      {id: 5, value:'1 star', isChecked: false}
    ],
    range: [
      {id: 1, value:'lowest-highest', isChecked: false},
      {id: 2, value:'highest-lowest', isChecked: false}
    ],
    productsByBrand: [],
    productsByRating: [],
    lowToHigh: [],
    highToLow: []
  }

  handleCheckBrands = event => {
    const { brands } = this.state;
    brands.forEach((brand) => {
      if (brand.value === event.target.value) {
        brand.isChecked = event.target.checked;

        const productsByBrandList = data.products.filter( (product) => {
          return product.brand === brand.value ? product : null;
        })

        if (event.target.checked) {
          let joined = this.state.productsByBrand.concat(productsByBrandList);
          this.setState({ productsByBrand: joined });
          console.log(this.state.productsByBrand);
        } else {
          this.setState(({productsByBrand}) => ({
            productsByBrand: productsByBrand.filter((element) =>  (brand.value !== element.brand))
          }));
          console.log(this.state.productsByBrand);
        }

      }
    });
    this.setState({ brands });
  }

  handleCheckRatings = event => {
    let { ratings } = this.state;
    ratings.forEach((rating) => {
      if (rating.value === event.target.value) {
        rating.isChecked = event.target.checked;
        const productsByRatingList = data.products.filter( (product) => {
          return product.rating === rating.value ? product : null;
        })

        if (event.target.checked) {
          let joined = this.state.productsByRating.concat(productsByRatingList);
          this.setState({ productsByRating: joined });
          console.log(this.state.productsByRating);
        } else {
          this.setState(({productsByRating}) => ({
            productsByRating: productsByRating.filter((element) =>  (rating.value !== element.rating))
          }));
        }
      }
    });
    this.setState({ ratings });
  }

  handlePriceRange = event => {
    const { range } = this.state;
    range.forEach((item) => {
      if (item.value === event.target.value) {
        item.isChecked = event.target.checked;
        const priceRange = data.products.sort( (low, high) => low.price - high.price);

        if (item.value === 'lowest-highest') {
          this.setState({ lowToHigh: this.state.lowToHigh.concat(priceRange) });
        }

        if (item.value === 'highest-lowest') {
          this.setState({ highToLow: this.state.highToLow.concat(priceRange.reverse()) });
        }
      }
    });
    this.setState({ range });

  }

  render(){
    let content;

    this.state.brands.forEach((value) => {
      if (value.isChecked) {
        content = (
          this.state.productsByBrand.map( (product) => {
                return <FilteredList
                        id={product.id}
                        productName={product.product_name}
                        brand={product.brand}
                        price={product.price}
                        rating={product.rating}/>
              })
        )
      }
    });

    this.state.ratings.forEach((value) => {
      if (value.isChecked) {
        content = (
          this.state.productsByRating.map( (product) => {
                return <FilteredList
                        id={product.id}
                        productName={product.product_name}
                        brand={product.brand}
                        price={product.price}
                        rating={product.rating}/>
              })
        )
      }
    });

    this.state.range.forEach((value) => {
      if (value.id === 1 && value.isChecked) {
        content = (
          this.state.lowToHigh.map( (product) => {
                return <FilteredList
                        id={product.id}
                        productName={product.product_name}
                        brand={product.brand}
                        price={product.price}
                        rating={product.rating}/>
              })
        )
      }

      if (value.id === 2 && value.isChecked) {
        content = (
          this.state.highToLow.map( (product) => {
                return <FilteredList
                        id={product.id}
                        productName={product.product_name}
                        brand={product.brand}
                        price={product.price}
                        rating={product.rating}/>
              })
        )
      }
    });

    return (
      <div className="parent">
        <div className="div1">
          <h1>Multi-select filter</h1>
        </div>
        <div className="div2">
          <h4>Range:</h4>
          <ul>
            {
              this.state.range.map((brand) => {
                return (<CheckBox key={brand.id} handleCheck={this.handlePriceRange} {...brand} />)
              })
            }
          </ul>
          <h4>Brands:</h4>
          <ul>
            {
              this.state.brands.map((brand) => {
                return (<CheckBox key={brand.id} handleCheck={this.handleCheckBrands} {...brand} />)
              })
            }
          </ul>
          <h4>Ratings:</h4>
          <ul>
            {
              this.state.ratings.map((rating) => {
                return (<CheckBox key={rating.id} handleCheck={this.handleCheckRatings} {...rating} />)
              })
            }
          </ul>
        </div>
        <div className="div3">
          <div className="grid-container product-index">
            <div className="grid-x grid-margin-x small-up-2 medium-up-2 large-up-3">
              {
                content
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
