import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { storeContext } from '../Store/Store';

export default function ProductDetails() {

  let {receiveProduct}=useContext(storeContext);

    let {productId}=useParams()
    const[product,setProduct]=useState({})
   

    async function getData(){
        let {data}=await axios.get(`https://fakestoreapi.com/products/${productId}`);
        console.log(data);
        setProduct(data)
    }

    useEffect(()=>{
        getData()
    },[])

  return (
    <>
    {product!=undefined?  
     <div className="container mt-3 ">
    <div className="row">
      <div className="col-lg-4">
        <div className="bg-danger">
          <img className='w-100'src={product.image} alt="" />
        </div>
      </div>
      <div className="col-lg-8 mt-5 text-white">
          <div className="p-3">
            <h2>{product.title}</h2>
            <p className=''>{product.description}</p>
            <p>{product.price}</p>
            <button onClick={()=>{
              receiveProduct(product)
              
              
            }} className='btn btn-outline-info'>Buy Now</button>
         

          </div>
        </div>
    </div>
  </div> :<></>}
   
    </>

  )
}
