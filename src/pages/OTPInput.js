import React, { useEffect, useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';


const OTPInput = () => {
  const location = useLocation()
  const [data,setData] = useState({
    otp : "",
    email : location?.state?.email
  })

  const navigate = useNavigate()

  //console.log("location",location)
  const handleOnChange = (e) =>{
    const { name , value } = e.target

    setData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
    
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const dataResponse = await fetch(SummaryApi.verifyForgotPassword.url,{
      method : SummaryApi.verifyForgotPassword.method,
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(data)
    })
    const dataApi = await dataResponse.json()

    if(dataApi.success){
      toast.success(dataApi.message)
    navigate('/reset-password',{
      state : {
                data
      }
    })
    }

    if(dataApi.error){
          toast.error(dataApi.message)
        }
  }
  
    useEffect(()=>{
      if(!location?.state?.email){
        navigate("/forgot-password")
      }
    },[])
    return (
          <section id='inputOTP'>
            <div className='mx-auto container p-4'>
              <div className='bg-white p-2 py-5 w-full max-w-md m-auto mt-24'>
                <div className='w-20 h-20 mx-auto'>
                  <img src={loginIcons} alt='login icons'/>
                </div>
      
                <form className='pt-6 flex flex-col gap-3'onSubmit={handleSubmit} >
                  <div className='grid'>
                  <h2 className='text-red-500 flex justify-center pb-2'>We are sending a OTP to your Email</h2>
                    <label>OTP : </label>
                    <div className='bg-slate-100 p-2'>
                    
                    <input 
                      type='text' 
                      placeholder='Enter OTP'
                      name='otp'
                      value={data.otp}
                      onChange={handleOnChange} 
                      id='otp'
                      maxLength={6}
                      className='w-full h-full outline-none  bg-transparent'/>
                    </div>
                  </div>
                  <Link to={'/login'} className='block w-fit ml-auto text-blue-700  hover:underline hover:text-red-500'>
                        Login
                  </Link>
                  <div>
                    <button className='bg-red-600 text-white px-6 py-2 w-full max-w-{150px] hover:bg-red-700 rounded-full hover:scale-110 transition-all m-auto block mt-4'>Verify</button>
                  </div>
                </form>
              </div>
            </div>
          </section>
    )
}

export default OTPInput