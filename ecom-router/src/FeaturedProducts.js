import React ,{useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom'
import axios from 'axios';

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    })

    const fetchProducts = () => {
        axios.get('https://fakestoreapi.com/products')
        .then((res) => {
            console.log(res.data);
            setProducts(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    return (
        <div>
            <h2>Featured Products</h2>
            <div ClassName='item-container'>
                {products.map( (product) => (
                    <div ClassName='card' key={product.id}>
                        <img src={product.image} alt=''/>
                        <h3>{product.title}</h3>
                        <p> INR. {product.price}</p>
                        <NavLink to ={`/products/${product.id}`}>View Details</NavLink>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FeaturedProducts;