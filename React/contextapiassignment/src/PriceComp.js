import React from 'react';
import PriceContext from './PriceContext.js';

class PriceComp extends React.Component {
  render() {
    const price = 4000;

    return (
      <PriceContext.Provider value={{ price }}>
        {this.props.children}
      </PriceContext.Provider>
    );
  }
}

export default PriceComp;
