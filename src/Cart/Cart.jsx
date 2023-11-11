import React, { useContext } from 'react'
import { storeContext } from '../Store/Store'

export default function Cart() {

  let{cart,receiveProduct,removeItem,deleteItem}=useContext(storeContext)
  console.log(cart);
  return (
    <>

    {cart.length!==0?
     <div className="container margo ">
     <div className="row gy-3">


    {cart.map((obj)=>{
     return <div key={obj.id} className="col-lg-2">
       <div className="position-relative">
    <img className='w-100' src={obj.image} alt="" />
         <p>{obj.title}</p>
        <p>{(obj.price*obj.qty).toFixed(2)}$</p>
        
        <div className='position-absolute top-0 end-0 bg-danger fs-6'>{obj.rating.rate}</div>
        <p className='fs-5'>{obj.qty}</p>
       
        <div className='d-flex my-3'>
         <button onClick={()=>{
          receiveProduct(obj)
          
         }} className='btn btn-outline-success me-2'>add</button>
         <button onClick={()=>{
          removeItem(obj)
         }} className='btn btn-outline-info me-2'>dec</button>
         <button onClick={()=>{
          deleteItem(obj)
         }} className='btn btn-outline-danger me-2'>delete</button>

        </div>
 
       </div>
     </div>
    
     })}
     
   </div>
   </div> :<h1>Cart is Empty</h1>}
   
    </>
    
  )
}
