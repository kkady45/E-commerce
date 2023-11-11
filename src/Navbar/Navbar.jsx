import React, { useContext, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import  { storeContext } from '../Store/Store';
import { jwtDecode } from 'jwt-decode';

export default function Navbar() {
  let data=useContext(storeContext)

  const navigateTo=useNavigate();

  function checkUserName(){
    if(localStorage.getItem('token')!=undefined){
    let datas=jwtDecode(localStorage.getItem('token'))
    let userName=datas.first_name;
    return userName;
    }
    else{
      return '';
    }
  }

  
  useEffect(()=>{
    console.log(data);
  },)


  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark navo fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" >{checkUserName()}</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {data.isLogin? <li className="nav-item">
            <NavLink aria-current="page" to='home' 
            style={({ isActive, isPending }) => {
                return {
                  color: isActive ? "" : "white",
                };
              }}
              className={({ isActive, isPending }) => {
                return isActive ? "nav-link active bg-danger " : isPending ? "" : "nav nav-link";
                }}>Home</NavLink>
            </li> :<></>}
           {data.isLogin?  <li className="nav-item">
            <NavLink aria-current="page" to='men' 
            style={({ isActive, isPending }) => {
                return {
                  color: isActive ? "" : "white",
                };
              }}
              className={({ isActive, isPending }) => {
                return isActive ? "nav-link active bg-danger " : isPending ? "" : "nav nav-link";
                }}>Men</NavLink>
          
            </li> :<></>}
          
            {data.isLogin? <li className="nav-item">
            <NavLink aria-current="page" to='women' 
            style={({ isActive, isPending }) => {
                return {
                  color: isActive ? "" : "white",
                };
              }}
              className={({ isActive, isPending }) => {
                return isActive ? "nav-link active bg-danger " : isPending ? "" : "nav nav-link";
                }}>Women</NavLink>
          
            </li> :<></>}
           
           {data.isLogin?  <li className="nav-item">
            <NavLink aria-current="page" to='jewellery' 
            style={({ isActive, isPending }) => {
                return {
                  color: isActive ? "" : "white",
                };
              }}
              className={({ isActive, isPending }) => {
                return isActive ? "nav-link active bg-danger " : isPending ? "" : "nav nav-link";
                }}>Jewellery</NavLink>
          
            </li> :<></>}
          
          {data.isLogin?      <li className="nav-item">
            <NavLink aria-current="page" to='cart' 
            style={({ isActive, isPending }) => {
                return {
                  color: isActive ? "" : "white",
                };
              }}
              className={({ isActive, isPending }) => {
                return isActive ? "nav-link active bg-danger " : isPending ? "" : "nav nav-link";
                }}>Cart</NavLink>
          
            </li> :<></>}
      
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {data.isLogin?  <li className='nav-item me-2'>
              <input onChange={(e)=>{
                data.getSearchData(e.target.value)
              }} className='form form-control ' type="text" name="" id="" />

            </li> :<></>}
        
            {data.isLogin? <></>:<li className="nav-item">
            <NavLink aria-current="page" to='login' 
            style={({ isActive, isPending }) => {
                return {
                  color: isActive ? "" : "white",
                };
              }}
              className={({ isActive, isPending }) => {
                return isActive ? "nav-link active bg-danger " : isPending ? "" : "nav nav-link";
                }}>Login</NavLink>
            </li>}
            {data.isLogin?<></> :  <li className="nav-item">
            <NavLink aria-current="page" to='' 
            style={({ isActive, isPending }) => {
                return {
                  color: isActive ? "" : "white",
                };
              }}
              className={({ isActive, isPending }) => {
                return isActive ? "nav-link active bg-danger " : isPending ? "" : "nav nav-link";
                }}>SignUp</NavLink>
          
            </li>}
          


            {data.isLogin? <li className='nav-item me-2'>
              <button onClick={()=>{
                localStorage.removeItem('token');
                localStorage.removeItem('cart')
                navigateTo('login');
                data.setIsLogin(false)
               data.setCart([])

              }} className='btn btn-outline-success ms-2'>Log Out</button>

            </li> :<></>}


            {data.isLogin?
             <li className='nav-item me-2 position-relative me-2'>
              <p className=' fas fa-shopping-cart fs-1'></p>
              <p className='position-absolute carto fs-5 bg-success'>{data.cartCount}</p>
            </li> :<></>}

            
            
           
          {data.isLogin?
          <li className='nav-item ms-2'>
            <p className='fs-5'>{data.cartPrice}</p>
            </li> :<></>}  
          </ul>
          
        </div>
      </div>
    </nav>
    
    </>
  )
}
