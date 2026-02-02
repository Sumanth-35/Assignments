import React from 'react';
import {HashRouter, Route, NavLink} from 'react-router-dom';

function App() {
  return (
    <div>
      <HashRouter>
        <div>
          <Route exact path="/home"  component={FeaturedProducts} />
          <Route exact path="/products/:id" component={ProductDetails} />
        </div>
      </HashRouter>
    </div>
  )
}

export default App;
