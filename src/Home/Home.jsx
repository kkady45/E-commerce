import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { storeContext } from '../Store/Store';

export default function Home() {

  const[menClothes,setMenClothes]=useState([]);
  const[womenClothes,setWomenClothes]=useState([]);
  const[jewelery,setJewelery]=useState([]);
  const[electronics,setElectronics]=useState([]);
  let {receiveProduct}=useContext(storeContext);
  async function getData(cat,setData){
    let {data}=await axios.get(`https://fakestoreapi.com/products/category/${cat}`);
    console.log(data);
    setData(data)
  }

  function showData(arr){
    {return arr.map((obj)=>{
      return <div key={obj.id} className="col-lg-2">
        <div className="position-relative">
    <Link to={`/productDetails/${obj.id}`}><img className='w-100' src={obj.image} alt="" /></Link>
          <p>{obj.title}</p>
         <p>{obj.price}$</p>
         <button onClick={()=>{

          receiveProduct(obj)
          
         }} className='btn btn-outline-info'>Buy now</button>
         <div className='position-absolute top-0 end-0 bg-danger fs-6'>{obj.rating.rate}</div>
  
        </div>
      </div>
     
    })}

  }

  useEffect(()=>{
    getData(`men's clothing`,setMenClothes);
    getData(`women's clothing`,setWomenClothes);
    getData(`jewelery`,setJewelery);
    getData(`electronics`,setElectronics);
  },[])
  return (
    <>

    <div className="container margo">     

  <div className="row g-2">
  <div className='col-lg-4'>
   <div className="">
    <h1>
    Trending <br/> Mens's Clotheing <br /> to buy
    </h1>
    </div>
    </div>

   {menClothes.length>0?showData(menClothes):<></>}
   <div className='col-lg-4'>
   <div className="">
    <h1>
    Trending <br/> Womens's Clotheing <br /> to buy
    </h1>
    </div>
    </div>
    {womenClothes.length>0?showData(womenClothes):<></>}
  </div>
  <div className="row gy-3">
  <div className='col-lg-4 mt-5'>
   <div className="">
    <h1>
    Trending <br/> Jewelery <br /> to buy
    </h1>
    </div>
    </div>
    {jewelery.length>0?showData(jewelery):<></>}
  <div className='col-lg-4 mt-5'>
   <div className="">
    <h1>
    Trending <br/> Electronics <br /> to buy
    </h1>
    </div>
    </div>
    {electronics.length>0?showData(electronics):<></>}
  </div>
    </div>
    </>
  )
}
