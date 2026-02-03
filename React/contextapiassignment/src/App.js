import React from 'react';
import PriceContext from './PriceContext.js';

class App extends React.Component {
  render() {
    return (
      <PriceContext.Consumer>
        {(value) => {
          const actualPrice = value.price;
          const discountPercent = value.discount;
          const discountAmount = (actualPrice * discountPercent) / 100;
          const discountedPrice = actualPrice - discountAmount;

          return (
            <div style={{ border: '0.5px solid black', padding: '2px' }}>
              <h2>AppComp</h2>
              <p>Actual Price : {actualPrice}</p>
              <p>Discount Given : {discountAmount}</p>
              <p>Discounted Price : {discountedPrice}</p>
            </div>
          );
        }}
      </PriceContext.Consumer>
    );
  }
}

export default App;

