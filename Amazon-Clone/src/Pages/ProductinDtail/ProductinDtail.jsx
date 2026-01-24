import React, { useEffect, useState } from 'react'
import './ProductinDtail.module.css'
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from 'react-router-dom';
import axios from 'axios'
import {productUrl} from "../../Api/endPoints";
import Productcard from '../../Components/Products/ProductCard'
import Loader from "../../Components/Loader/Loader";  // adjust path

function ProductinDtail()
{

  const { productId } = useParams()
  const [product, setproduct] = useState(null);
    const [isLoading, setisLoading] = useState(true);
  
  useEffect(() => {
    setisLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setproduct(res.data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
    
  }, [productId]);
  return (
    <LayOut>
      {isLoading ? <Loader /> : <Productcard product={product}
        flex={true}
        renderDesc={true}
       renderAdd={true}
      />}
    </LayOut>
  );
}

export default ProductinDtail
