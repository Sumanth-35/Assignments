import React from 'react';
import ReactDOM from 'react-dom/client';
// import Price from './price';
// import Music from './lifecycle';
// 
// import CountApp from './hooks';
import Product from './hooks';

// function Logincomponent () {
//     return (
//       <div>
//         <Header />
//         <h2>Login page</h2>
//         <p>This is a login page.</p>

//         <form>
//           <label>Username:</label>
//           <input type="text" name="username" />
//           <br /><br />

//           <label>Password:</label>
//           <input type="password" name="password" />
//           <br /><br />

//           <button type="submit">Login</button>
//         </form>
//         <Footer />
//       </div>
//     );
//   }

//   function Header(){
//     return(
//       <h1>Keysight Login Page</h1>
//     )
//   }

//   function Footer(){
//     return(
//       <p>Copyright @ 2024 Keysight Technologies</p>
//     )
//   }

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<Price />);
// ReactDOM.render(<shoppingcomponent />, document.getElementById('root'));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Product />); // add value in Music  New="Drums" to test getDerivedStateFromProps