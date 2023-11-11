import axios from 'axios';
import { func } from 'joi';
import { createContext, useEffect, useState } from 'react';

export let storeContext=createContext(0);

export default function StoreProvider(props) {
    const[isLogin,setIsLogin]=useState(false)
    useEffect(()=>{
      let data=JSON.parse(localStorage.getItem('cart'));
      if(data!=null){
        setCart(data)
      }
    },[])

    const[cart,setCart]=useState([]);
    let copyCart=[...cart];
    function receiveProduct(product){
      let exist=cart.find((obj)=>{
       return obj.id===product.id
      })
      if(exist==undefined){
      copyCart.push({...product,qty:1});
      setCart(copyCart)
      localStorage.setItem('cart',JSON.stringify(cart));

      console.log(cart);
      }
      else{
      let result= cart.map((elm)=>elm.id===product.id?{...exist,qty:exist.qty+1}:elm
        )

        setCart(result)
        localStorage.setItem('cart',JSON.stringify(cart));

      }
    }

   function removeItem(product){
    let exist=cart.find((obj)=>{
      return obj.id===product.id
     })
     if(exist.qty>1){
      let result= cart.map((elm)=>elm.id===product.id?{...exist,qty:exist.qty-1}:elm)
      setCart(result)
     }
    
   }

   function deleteItem(product){
    let result=cart.filter((obj)=>obj.id!==product.id)
    setCart(result)
    localStorage.setItem('cart',JSON.stringify(cart));
   }

   let cartCount=cart.reduce((x,y)=>x+y.qty,0);
   let cartPrice='$'+cart.reduce((x,y)=>x+y.price*y.qty,0).toFixed(2);

   let [searchData,setSearchData]=useState([])
   async function getSearchData(obj){
    if(obj!=''){
      let {data}=await axios.get('https://fakestoreapi.com/products');
      setSearchData(data)
      let filteredData=data.filter((ele)=>{
        return ele.title.includes(obj)
      })
      setSearchData(filteredData)
      console.log(filteredData);
    }
    else{
      setSearchData([])
    }
   


   }

  return (
    
    <storeContext.Provider value={{isLogin,setIsLogin,receiveProduct,setCart,cart,removeItem,deleteItem,cartCount,cartPrice,getSearchData,searchData}}>
        {props.children}
    
    </storeContext.Provider>
    
  )
}
