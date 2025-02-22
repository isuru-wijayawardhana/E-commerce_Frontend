import React, {  useState } from 'react'
import { Link , useLocation, useNavigate} from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);

    const location = useLocation()
    const [data,setData] = useState({
      email : location?.state?.data.email,
      confirmPassword : ""
    })

    //console.log("location",location)

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
    const handleSubmit = async(e)=>{
      e.preventDefault()
      const dataResponse = await fetch(SummaryApi.resetPassword.url,{
        method : SummaryApi.resetPassword.method,
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })
      const dataApi = await dataResponse.json()
  
      if(dataApi.success){
        toast.success(dataApi.message)
        navigate('/login')
      }
  
      if(dataApi.error){
            toast.error(dataApi.message)
          }
    }

    
  return (
      <section id='signUp'>
        <div className='mx-auto container p-4'>
          <div className='bg-white p-2 py-5 w-full max-w-md m-auto'>
            
            <form className='pt-6 flex flex-col gap-3' onSubmit={handleSubmit}>       
              <div>
                <label>Password : </label>
                <div className='bg-slate-100 p-2 flex'>
                <input 
                  type={showPassword ? "text":"password"} 
                  placeholder='Enter Password' 
                  name='password'
                  //value={data.password}
                  //onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent'/>
                <div className='cursor-pointer text-lg'  onClick={()=>setShowPassword((preve)=>!preve)}>
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
                <div className='cursor-pointer text-lg' onClick={()=>setShowConfirmPassword((preve)=>!preve)} onChange={handleOnChange} >
                  <span>
                    {
                      showConfirmPassword? <FaEye/>:<FaEyeSlash/>
                    } 
                  </span>
                </div>
                </div>
              </div>
  
              <div>
                <button className='bg-red-600 text-white px-6 py-2 w-full max-w-{150px] hover:bg-red-700 rounded-full hover:scale-110 transition-all m-auto block mt-4'>Change Password</button>
              </div>
            </form>
            <p className='my-5'>Already have Account ? <Link to={"/sign-up"} className='text-red-600 hover:text-red-700 hover:underline'>signup</Link></p>
          </div>
        </div>
      </section>
    )
}

export default ResetPassword