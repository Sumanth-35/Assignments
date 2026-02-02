import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PriceComp from './PriceComp';
import DiscountComp from './DiscountComp';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <PriceComp>
    <DiscountComp>
      <App />
    </DiscountComp>
  </PriceComp>
);
