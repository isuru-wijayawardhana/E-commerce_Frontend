import React, { useCallback, useContext, useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom';
import SummaryApi from '../common';
import { FaStar } from "react-icons/fa";
import { FaStarHalfStroke } from "react-icons/fa6";
import displayLKRCurrency from '../helpers/displayCurrency'
import VerticalCardProduct from '../components/VerticalCardProduct';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const ProductDetails = () => {
  const [data,setData] = useState({
    productName : "",
    brandName : "",
    category : "",
    productImage : [],
    description : "",
    price : "",
    sellingPrice : ""  
  })

  const params = useParams()
  const [loading,setLoading] = useState(true)
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage,setActiveImage] = useState('')
  const [zoomImageCoodinate,setZoomImageCoodinate] = useState({
    x:0,
    y:0
  })
  const [zoomImage,setZoomImage]=useState(false)
  //console.log("produxt Id",params)

  const {fetchUserAddToCart} = useContext(Context)

  const navigate = useNavigate()

  const fetchProductDetails = async()=>{
    setLoading(true)
    const response = await fetch(SummaryApi.productDetails.url,{
      method : SummaryApi.productDetails.method,
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify({
        productId : params?.id
      })
    })
    setLoading(false)
    const dataResponse = await response.json()

    setData(dataResponse?.data)
    setActiveImage(dataResponse?.data?.productImage[0])
  }

  //console.log("data",data)

  useEffect(()=>{
    fetchProductDetails()
  },[params])

  const handleMouseEnterProduct = (imgURL)=>{
    setActiveImage(imgURL)
  }

  const handleZoomImage = useCallback((e) =>{
    setZoomImage(true)
    const { left, top, width, height } = e.target.getBoundingClientRect()
    console.log("cordinate ",left,top,width,height)

    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height
    
    setZoomImageCoodinate({
      x,
      y
    })
  },[zoomImageCoodinate])

  const handleLeaveImageZoom = ()=>{
    setZoomImage(false)
  }

  const handleAddToCart = async(e,id) =>{
    await addToCart(e,id)
    fetchUserAddToCart()
  }

  const handleBuyProduct = async(e,id) =>{
    await addToCart(e,id)
    fetchUserAddToCart()
    navigate("/cart")
  }

  return (
   <div className='container mx-auto p-4'>
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4 m-20 my-20'>

        {/**product Image */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'> 
            <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom}/>

            {/**product Zoom */}
            {
              zoomImage && (
                
                <div className='hidden lg:block absolute min-w-[400px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                <div 
                    className='w-full h-full min-h-[500px] min-w-[500px] mix-blend-multiply '
                    style={{
                      backgroundImage : `url(${activeImage})`,
                      backgroundRepeat : 'no-repeat',
                      backgroundPosition : `${zoomImageCoodinate.x * 100}% ${zoomImageCoodinate.y * 100}%`

                }}>

                </div>
              </div>
              )
            }
              

          </div>
            <div className='h-full'>
              {
                loading ? (

                  <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                    {
                      productImageListLoading.map((el,index) =>{
                        return(
                          <div className='h-20 w-20 bg-slate-300 rounded animate-pulse' key={"loadingImage"+index}>
    
                        </div>
                        )
                      })
                    }
                  </div>
                  
                ) : (
                  <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                    {
                      data?.productImage?.map((imgURL,index) =>{
                        return(
                          <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imgURL}>
                            <img src={imgURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={()=>handleMouseEnterProduct(imgURL)} onclick={()=>handleMouseEnterProduct(imgURL)}/>
                          </div>
                        )
                      })
                    }
                  </div>
                )
              }
            </div>
        </div>
        {/**product Details */}
        {
          loading ? (
            <div className='grid gap-1 w-full'>

          <p className='bg-slate-300 animate-pulse h-6 w-full lg:h-8 rounded-full inline-block'></p>
          <h2 className='text-2xl lg:text-4xl font-medium  h-6 lg:h-8 bg-slate-300 animate-pulse w-full' ></h2>
          <p className=' capitalize text-slate-400 bg-slate-300 min-w-[100px] animate-pulse h-6 lg:h-8 w-full'></p>

          <div className='text-red-600 bg-slate-300 h-6 animate-pulse flex items-center gap-1 w-full lg:h-8'>
            
          </div>
          <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 animate-pulse w-full lg:h-8'>
              <p className='text-red-600 bg-slate-300 w-full '></p>
              <p className='text-slate-400 line-through bg-slate-300 w-full'></p>
          </div>

          <div className='flex items-center gap-3 my-2'>
            <button className='h-6 lg:h-8 bg-slate-300 rounded animate-pulse w-full'></button>
            <button className='h-6 lg:h-8 bg-slate-300 rounded animate-pulse w-full'></button>
          </div>

          <div>
            <p className='text-slate-600 font-medium my-1 h-6 lg:h-8 bg-slate-300 rounded animate-pulse w-full'></p>
            <p className='h-10 bg-slate-300 rounded animate-pulse lg:h-12 w-full'></p>
          </div>
        
        </div>
          ) : (
          <div className='flex flex-col gap-1'>

            <p className='bg-red-200 capitalize text-red-600 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
            <h2 className='text-2xl lg:text-4xl font-medium capitalize'>{data?.productName}</h2>
            <p className=' capitalize text-slate-500'>{data?.category}</p>

          <div className='text-red-600 flex items-center gap-1'>
            <FaStar/>
            <FaStar/>
            <FaStar/>
            <FaStar/>
            <FaStarHalfStroke/>
          </div>
          <div className='flex items-center gap-3 text-2xl lg:text-3xl font-medium my-1'>
              <p className='text-red-600'>{displayLKRCurrency(data.sellingPrice)}</p>
              <p className='text-slate-400 line-through'>{displayLKRCurrency(data.price)}</p>
          </div>

          <div className='flex items-center gap-3 my-2'>
            <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white' onClick={(e)=>handleBuyProduct(e,data?._id)}>Buy</button>
            <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-white bg-red-600 hover:text-red-600 hover:bg-white' onClick={(e)=>handleAddToCart(e,data?._id)}>Add to Cart</button>
          </div>

          <div>
            <p className='text-slate-600 font-medium my-1'>Description : </p>
            <p className=''>{data?.description}</p>
          </div>
        
        </div>
          )
        }
        

      </div>

        {
         data.category && (
          <CategoryWiseProductDisplay category={data?.category} heading={"Recommended Product"}/>
         ) 
        }
      
       </div>
    
  )
}

export default ProductDetails