import axios from 'axios';
import Joi, { func } from 'joi';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignUp() {

    const[registerData,setRegisterData]=useState({
        first_name:'',
        last_name:'',
        age:0,
        email:"",
        password:""
    })
    let copyRegisterData={...registerData};
    const[showErrors,setShowErrors]=useState([]);
    let copyShowErrors=[...showErrors];

  const[backMsg,setBackMsg]=useState('');

  const navigateTo=useNavigate()

    function showEachError(err){


     return showErrors.map((obj)=>{
        if(obj.message.includes(err)){
          return <p className='text-danger'>{obj.message}</p>
        }
      })

    }

    async function register(){
      if(validation()){
      let {data}=await axios.post('https://movies-api.routemisr.com/signup',registerData); 
      console.log(data);
      if(data.errors){
        setBackMsg(data.errors.email.message)
      }
      else{
        navigateTo('/login')
      }
       }
      }
    

   
    useEffect(()=>{
        console.log(registerData);
        // console.log(showErrors);
    },[registerData,showErrors])

    function validation(){
    
        let rules=Joi.object({
            first_name:Joi.string().min(3).max(15).required(),
            last_name:Joi.string().min(3).max(15).required(),
            age:Joi.number().min(18).max(100).required(),
            email:Joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}),
            password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))            

        })
        
        let data=rules.validate(registerData,{abortEarly:false});
        console.log(data);
        if(data.error!=undefined){
        let detailso=data.error.details;
        copyShowErrors=detailso;
        setShowErrors(copyShowErrors);
        console.log(showErrors);
        return false;
        }
        else{
          setShowErrors([]);
          return true;
        }

    }
    
  return (
    <>
     <div className="container margo">
    <h1>Registeration Form</h1>
    
    <form onSubmit={(e)=>{
      e.preventDefault()
      register();

    }}>
      <div className='mb-2'>     
       <label htmlFor="firstName" className='mb-1'>First Name:</label>
      <input onChange={(e)=>{
        copyRegisterData.first_name=e.target.value;
        setRegisterData(copyRegisterData);
       
       
      }} className='form-control from' type="text" name="" id="first_Name" />
      </div>
    {showErrors.length>0?showEachError('first_name'):<></>}
    
      <div className='mb-2'>     
       <label htmlFor="lastName" className='mb-1'>Last Name:</label>
      <input onChange={(e)=>{
                copyRegisterData.last_name=e.target.value;
                setRegisterData(copyRegisterData);
               
                


       }} className='form-control from' type="text" name="" id="lastName" />
      </div>
      {showErrors.length>0?showEachError('last_name'):<></>}
   

      <div className='mb-2'>     
       <label htmlFor="age" className='mb-1'>Age:</label>
      <input
       onChange={(e)=>{
        copyRegisterData.age=e.target.value;
        setRegisterData(copyRegisterData);
       


}}  className='form-control from' type="text" name="" id="age" />
      </div>
      {showErrors.length>0?showEachError('age'):<></>}
   

      <div className='mb-2'>     
       <label htmlFor="email" className='mb-1'>Email:</label>
      <input  onChange={(e)=>{
                copyRegisterData.email=e.target.value;
                setRegisterData(copyRegisterData);
               
                


       }}  className='form-control from' type="text" name="" id="email" />
      </div>
      {showErrors.length>0?showEachError('email'):<></>}

      <div className='mb-2'>     
       <label htmlFor="password" className='mb-1'>Password:</label>
      <input  onChange={(e)=>{
                copyRegisterData.password=e.target.value;
                setRegisterData(copyRegisterData);
               
                


       }}  className='form-control from' type="text" name="" id="password" />
      </div>
      {showErrors.length>0?showEachError('password'):<></>}
 

      <div className='mb-2'>     
     <button className='btn btn-info'>Regsiter</button>
      </div>

    </form>
    <p className='text-danger'>{backMsg}</p>
    
    </div>
    
    
    </>
  )
}
