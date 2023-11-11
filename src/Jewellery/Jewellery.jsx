import axios from 'axios';
import React, {useContext,useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { storeContext } from '../Store/Store';


export default function Home() {
  let {receiveProduct}=useContext(storeContext);

  const[jewelery,setJewelery]=useState([]);
  async function getData(cat,setData){
    let {data}=await axios.get(`https://fakestoreapi.com/products/category/${cat}`);
    console.log(data);
    setData(data)
  }

  function showData(arr){
    {
      return arr.map((obj)=>{
      return <div key={obj.id} className="col-lg-2">
        <div className="position-relative">
    <Link to={`/productDetails/${obj.id}`}><img className='w-100' src={obj.image} alt="" /></Link>
          <p>{obj.title}</p>
         <p>{obj.price}$</p>
         <button onClick={()=>{
          receiveProduct(obj);
         }} className='btn btn-outline-info'>Buy now</button>
         <div className='position-absolute top-0 end-0 bg-danger fs-6'>{obj.rating.rate}</div>
  
        </div>
      </div>
     
    })}

  }

  useEffect(()=>{
    getData(`jewelery`,setJewelery);
  },[])
  return (
    <>

    <div className="container margo">     

  <div className="row g-2">

   {jewelery.length>0?showData(jewelery):<></>}
  </div>
    </div>
    </>
  )
}
