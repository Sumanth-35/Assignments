import React from 'react';
import PriceContext from './PriceContext.js';

class DiscountComp extends React.Component {
  render() {
    const discount = 30;

    return (
      <PriceContext.Consumer>
        {(value) => (
          <PriceContext.Provider
            value={{ ...value, discount }}
          >
            {this.props.children}
          </PriceContext.Provider>
        )}
      </PriceContext.Consumer>
    );
  }
}

export default DiscountComp;
