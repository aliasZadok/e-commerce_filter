import React from 'react';

export default (props) => {
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return <div key={props.id} className="cell" style={{background: "#d3d3d3"}}>
            <h2>{props.productName}</h2>
            <p>By: {props.brand}</p>
            <p>Price: ₹{numberWithCommas(props.price)}</p>
            <p>Customer Rating: {props.rating}</p>
         </div>

}
