import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { storeContext } from '../Store/Store'
import { useContext } from 'react'
import { Link } from 'react-router-dom'



export default function Layout() {
  let data=useContext(storeContext)
  let {searchData}=useContext(storeContext)
  useEffect(()=>{
    if(localStorage.getItem('token')){
      data.setIsLogin(true)
    }
  },[])
  function showData(arr){
    {
     
      return arr.map((obj)=>{
      return <div key={obj.id} className="col-lg-2">
        <div className="position-relative">
    <Link to={`/productDetails/${obj.id}`}><img className='w-100' src={obj.image} alt="" /></Link>
          <p>{obj.title}</p>
         <p>{obj.price}$</p>
         <button onClick={()=>{
          
          data.receiveProduct(obj)
         }} className='btn btn-outline-info'>Buy now</button>
         <div className='position-absolute top-0 end-0 bg-danger fs-6'>{obj.rating.rate}</div>
  
        </div>
      </div>
     
    })}

  }


  return (
   <>
   
   <Navbar/>
   {searchData.length==0?<Outlet/> :
       <>

       <div className="container margo">     
   
     <div className="row g-2">
   
      {searchData.length>0?showData(searchData):<p>a7aaaa</p>}
     </div>
       </div>
       </>}

   </>
   
   
  )
}
