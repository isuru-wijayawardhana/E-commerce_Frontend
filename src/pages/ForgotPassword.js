import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common/index';
import { toast } from 'react-toastify';


const ForgotPassword = () => {
  const [data,setData] = useState({
      email : ""
    })
    const navigate = useNavigate()

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
  
  const dataResponse = await fetch(SummaryApi.forgotPassword.url,{
    method : SummaryApi.forgotPassword.method,
    headers : {
      "content-type" : "application/json"
    },
    body : JSON.stringify(data)
  })

  const dataApi = await dataResponse.json()
  if(dataApi.success){
    toast.success(dataApi.message)
    navigate("/verify-forgot-password-otp",{
      state : data
    })

  }
  if(dataApi.error){
        toast.error(dataApi.message)
      }
}    
  return (
        <section id='forgetPassword'>
          <div className='mx-auto container p-4'>
            <div className='bg-white p-2 py-5 w-full max-w-md m-auto mt-24'>
              <div className='w-20 h-20 mx-auto'>
                <img src={loginIcons} alt='login icons'/>
              </div>
    
              <form className='pt-6 flex flex-col gap-3 ' onSubmit={handleSubmit} >
                <div className='grid'>
                  <label>Email : </label>
                  <div className='bg-slate-100 p-2'>
                  <input 
                    type='email' 
                    placeholder='Enter Email'
                    name='email'
                    value={data.email}
                    onChange={handleOnChange} 
                    required
                    className='w-full h-full outline-none  bg-transparent'/>
                  </div>
                </div>
                <Link to={'/login'} className='block w-fit ml-auto text-blue-700  hover:underline hover:text-red-500'>
                      Login
                </Link>
                <div>
                  <button className='bg-red-600 text-white px-6 py-2 w-full max-w-{150px] hover:bg-red-700 rounded-full hover:scale-110 transition-all m-auto block mt-4'>Submit</button>
                </div>
              </form>
            </div>
          </div>
        </section>
  )
}

export default ForgotPassword