import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword,setShowPassword] = useState(false);
  const [showConfirmPassword,setShowConfirmPassword] = useState(false);
  const [data,setData] = useState({
    email : "",
    password : "",
    name : "",
    confirmPassword : "",
    profilePic : "", 
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

  const handleUplodPic = async(e)=>{
    const file=e.target.files[0]
    ///console.log("file",file)
    const imagePic = await imageTobase64(file)
    //console.log("imagePic",imagePic)

    setData((preve)=>{
      return{
        ...preve,
        profilePic : imagePic
      }
    })
    
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()

    if(data.password === data.confirmPassword){
      const dataResponse = await fetch(SummaryApi.signUP.url,{
        method : SummaryApi.signUP.method,
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })
  
      const dataApi = await dataResponse.json()

      if(dataApi.success){
        toast.success(dataApi.message)
        navigate("/login")
      }

      if(dataApi.error){
        toast.error(dataApi.message)
      }
  
      //console.log("data",dataApi)
    }else{
      toast.error("Please check password and confirm password")
    }
  }

console.log("data Login",data)
  return (
    <section id='signUp'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-2 py-5 w-full max-w-md m-auto'>
          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
            <div>
            <img src={data.profilePic || loginIcons} alt='login icons'/>
            </div>
            <form>
              <label>
                <input type='file' className='hidden' onChange={handleUplodPic}/>
                <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                Uplode Photo
              </div>
              </label>
              
            </form>
          </div>

          <form className='pt-6 flex flex-col gap-3' onSubmit={handleSubmit}>
            <div className='grid'>
              <label>Name : </label>
              <div className='bg-slate-100 p-2'>
              <input 
                type='text' 
                placeholder='Enter Your Name'
                name='name'
                value={data.name}
                onChange={handleOnChange}
                required
                className='w-full h-full outline-none  bg-transparent'/>
              </div>
            </div>
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
            <div>
              <label>Password : </label>
              <div className='bg-slate-100 p-2 flex'>
              <input 
                type={showPassword ? "text":"password"} 
                placeholder='Enter Password' 
                name='password'
                value={data.password}
                onChange={handleOnChange}
                required
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
            <div>
              <label>Confirm Password : </label>
              <div className='bg-slate-100 p-2 flex'>
              <input 
                type={showConfirmPassword ? "text":"password"} 
                placeholder='Enter Confirm Password' 
                name='confirmPassword'
                value={data.confirmPassword}
                onChange={handleOnChange}
                required
                className='w-full h-full outline-none bg-transparent'/>
              <div className='cursor-pointer text-lg' onClick={()=>setShowConfirmPassword((preve)=>!preve)}>
                <span>
                  {
                    showConfirmPassword? <FaEye/>:<FaEyeSlash/>
                  } 
                </span>
              </div>
              </div>
            </div>

            <div>
              <button className='bg-red-600 text-white px-6 py-2 w-full max-w-{150px] hover:bg-red-700 rounded-full hover:scale-110 transition-all m-auto block mt-4'>SignUp</button>
            </div>
          </form>
          <p className='my-5'>Already have Account ? <Link to={"/login"} className='text-red-600 hover:text-red-700 hover:underline'>Login</Link></p>
        </div>
      </div>
    </section>
  )
}

export default SignUp