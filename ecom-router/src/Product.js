import React ,{useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom'
import axios from 'axios';

const Product = ({Match}) => {
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetchProductDetails();
    }, [])

    const fetchProductDetails= () => {
        axios.get(`https://fakestoreapi.com/products/?id=${Match.params.id}`)
        .then((res) => {
            setData(res.data);
            console.log(res.data);
        })
        .catch((err) => console.log(err))
    };
    return (
        <div>
            {data.map((item)=>(
                return(
                    
                )
            ))}
        </div>
    )
}