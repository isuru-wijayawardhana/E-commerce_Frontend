import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayLKRCurrency from '../helpers/displayCurrency'

import { TfiAngleDoubleLeft } from "react-icons/tfi";
import { TfiAngleDoubleRight } from "react-icons/tfi";
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context'

const HorizontalCarProduct = ({category, heading}) => {
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(true)
  const loadingList = new Array(13).fill(null)

  const [scroll,setScroll] = useState(0)
  const scrollElement = useRef()

  const {fetchUserAddToCart} = useContext(Context)

  const handleAddToCart = async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
   }

  const fetchData = async() =>{
    setLoading(true)
    const categoryProduct = await fetchCategoryWiseProduct(category)
    setLoading(false)

    //console.log("horizontal Data",categoryProduct.data)
    setData(categoryProduct?.data)
    
  }

  useEffect(()=>{
    fetchData()
  },[])

  const scrollRight = () =>{
    scrollElement.current.scrollLeft +=300
  }

  
  const scrollLeft = () =>{
    scrollElement.current.scrollLeft -=300
  }

  return (
    <div className='container mx-auto px-4 my-6 relative'>
      <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
      <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>

      <button className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><TfiAngleDoubleLeft/></button>
      <button className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}><TfiAngleDoubleRight/></button>
      {
        loading ? (
          loadingList.map((product,index)=>{
            return(
              <div className='w-full min-w-[350px] md:min-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex' key={index+product} >
                <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>
                  
                </div>
                <div className='p-3 grid w-full gap-2'>
                  <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'></h2>
                  <p className='capitalize text-slate-500 animate-pulse p-1 rounded-full bg-slate-200'></p>
                  <div className='flex gap-3 w-full'>
                    <p className='text-red-600 font-medium text-sm animate-pulse p-1 rounded-full bg-slate-200 w-full'></p>
                    <p className='text-slate-500 line-through animate-pulse p-1 rounded-full bg-slate-200 w-full'></p>
                  </div>
                  <button className=' text-sm text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse p-1 '></button>
                </div>
  
             </div>
            )
          })
        ) : (
        data.map((product,index)=>{
          return(
            <Link to={"product/"+product?._id} key={index+product} className='w-full min-w-[350px] md:min-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
              <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                <img src={product?.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/>
                
              </div>
              <div className='p-3 grid'>
                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 capitalize'>{product?.productName}</h2>
                <p className='capitalize text-slate-500'>{product?.category}</p>
                <div className='flex gap-3'>
                  <p className='text-red-600 font-medium text-sm'>{ displayLKRCurrency(product?.sellingPrice) }</p>
                  <p className='text-slate-500 line-through text-sm'>{ displayLKRCurrency(product?.price) }</p>
                </div>
                <button className=' text-sm bg-red-600 hover:bg-red-800 text-white px-3 py-0.5 rounded-full max-w-[150px] 'onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
              </div>

           </Link>
          )
        })
      )
      }
      </div>
    </div>
  )
}
export default HorizontalCarProduct