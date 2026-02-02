import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// //import App from './App';
// // import MyErrorBoundary from './ErrorBoundary';
// // import Form from './Form';
// import UncontrolledFrom from './uncontrolform';
 import App from './HOCAdv'


// function Books(props){
//     const left = (
//         <ul>
//             {books.map((book) =>
//                 <li key={book.id}>
//                   {book.title}
//                 </li>
//             )}
//             </ul>
//     )
//     const right =  books.map((book) =>
//         <div key={book.id}>
//          <h2> {book.title} </h2>
//          <p>{book.content} </p>
//         </div>
//     )
//     return(
//         <div>
//             <div>{left} </div>
//             <br/>
//             <div>{right} </div>
//         </div>
//     )
// }
// const books = [
//     {
//         id:1,
//         title:"ABC",
//         content:"fiction book"
//     },
//     {
//         id:2,
//         title:"XYZ",
//         content:"mystrry book"
//     },
//     {
//         id:3,
//         title:"MNP",
//         content:"fiction book"
//     }
// ]
 
// ReactDOM.render( <MyErrorBoundary>document.getElementById("root"));
 
// ReactDOM.render(<Form />, document.getElementById("root"));
ReactDOM.render(<App />,document.getElementById("root"));