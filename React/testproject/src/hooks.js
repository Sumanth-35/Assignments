import React ,{useState,useMemo} from 'react';

function Product(){
      const[price]=useState(2000);
      const[discount]=useState(20);
      const[quantity, setQuantity]=useState(1);
      const finalPrice= useMemo( () => {                   //this will memorize the value calculated
            console.log("Calculating discounted price...");
            return price - (price * discount / 100);
      },[price,discount]);

        return(
            <div>
                <h2>Product price before discount: INR {price}</h2>
                <h2>Discount: {discount} %</h2>
                <h2>Final Price after discount: INR {finalPrice}</h2>
                <h3>Quantity: {quantity} </h3>
                <button onClick={ () => setQuantity(quantity + 1) }> Add Product </button>
            </div>
        )
}
export default Product;
// function CountApp(){
//     const [count, setCount] = useState(0);   //usestate hook
//     const[name, setName] = useState({ firstName:"dhulipalla",lastName:"sumanth"})
//     const[title]=useState("Employee")

//     useEffect( () => {   
//         const timer = setTimeout( () => {   
//              setName({ firstName:"muppidi",lastName:"harsha"})
//         },3000)
//         return () => clearTimeout(timer);
//         // document.title = `You clicked ${count} times `
//         // setName({ firstName:"muppidi",lastName:"harsha"})
//     },[]);

//     return(
//         <div>
//             I clicked the button {count} times
//             <button onClick ={ () => setCount( count + 1) }> Add </button>
//             <h2>Title: {title} </h2>
//             <h3>First Name: {name.firstName}</h3>
//             <h3>Last Name: {name.lastName}</h3>
//         </div>
//     )
// }
// export default CountApp;