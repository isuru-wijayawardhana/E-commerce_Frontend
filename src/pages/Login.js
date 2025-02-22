import React, { useContext, useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
  const [showPassword,setShowPassword] = useState(false);
  const [data,setData] = useState({
    email : "",
    password : ""
  })

  const navigate = useNavigate()
  const {fetchUserDetails , fetchUserAddToCart} = useContext(Context)

  const handleOnChange = (e) =>{
    const { name , value } = e.target

    setData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
    
  }

  const handleSubmit = async(e) =>{
    e.preventDefault() 

    const dataResponse = await fetch(SummaryApi.signIn.url,{
      
      method : SummaryApi.signIn.method,
      credentials : 'include' ,
      headers : {
          "content-type" : "application/json"
      },
      body : JSON.stringify(data)
    })
    const dataApi = await dataResponse.json()
//console.log("check", dataResponse)
    if(dataApi.success){
      toast.success(dataApi.message)
      navigate('/')
      fetchUserDetails()
      fetchUserAddToCart()
    }
    
    if(dataApi.error){
      toast.error(dataApi.message)
    }
      
  }

//console.log("data Login",data)
  return (
    <section id='login'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-2 py-5 w-full max-w-md m-auto'>
          <div className='w-20 h-20 mx-auto'>
            <img src={loginIcons} alt='login icons'/>
          </div>

          <form className='pt-6 flex flex-col gap-3' onSubmit={handleSubmit}>
            <div className='grid'>
              <label>Email : </label>
              <div className='bg-slate-100 p-2'>
              <input 
                type='email' 
                placeholder='Enter Email'
                name='email'
                value={data.email}
                onChange={handleOnChange} 
                className='w-full h-full outline-none  bg-transparent'/>
              </div>
            </div>
            <div>
              <label>Password : </label>
              <div className='bg-slate-100 p-2 flex'>
              <input 
                type={showPassword ? "text":"password"} 
                placeholder='Enter Password' 
                name='password'
                value={data.password}
                onChange={handleOnChange}
                className='w-full h-full outline-none bg-transparent'/>
              <div className='cursor-pointer text-lg' onClick={()=>setShowPassword((preve)=>!preve)}>
                <span>
                  {
                    showPassword? <FaEye/>:<FaEyeSlash/>
                  } 
                </span>
              </div>
              </div>
            </div>
            <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-500'>
                  Forgot Password ?
            </Link>
            <div>
              <button className='bg-red-600 text-white px-6 py-2 w-full max-w-{150px] hover:bg-red-700 rounded-full hover:scale-110 transition-all m-auto block mt-4'>Login</button>
            </div>
          </form>
          <p className='my-5'>Don't have account ? <Link to={"/sign-up"} className='text-red-600 hover:text-red-700 hover:underline'>Sign Up</Link></p>
        </div>
      </div>
    </section>
  )
}

export default Login