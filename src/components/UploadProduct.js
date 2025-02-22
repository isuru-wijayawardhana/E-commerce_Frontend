import React, { useState } from 'react'
import { MdClose } from "react-icons/md";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const UploadProduct = ({
    onClose,
    fetchData,
}) => {
    const [data,setData] = useState({
        productName : "",
        brandName : "",
        category : "",
        productImage : [],
        description : "",
        price : "",
        sellingPrice : ""
    })

    const [openFullScreenImage,setOpenFullScreenImage] = useState(false)
    const [fullScreenImage,setFullScreenImage] = useState("")

    const handleOnChange = (e)=>{
        const {name, value} =e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const handleUplodeProduct = async(e)=>{
        const file = e.target.files[0]
        const uploadImageCloudinary = await uploadImage(file)

        setData((preve)=>{
            return{
                ...preve,
                productImage : [ ...preve.productImage,uploadImageCloudinary.url]
            }
        })

//        console.log("upload image",uploadImageCloudinary.url)
    }

    const handleDeleteProductImage = async(index) =>{
       // console.log("image index",index)

        const newProductImage = [...data.productImage]
        newProductImage.splice(index,1)

        setData((preve)=>{
            return{
                ...preve,
                productImage : [...newProductImage]
            }
        })
    }

   // {/**upload Product **/}

   /**  
    *doesn't show toast and close component but uploded product sucssfully  
     const handleSubmit = async(e) =>{
        e.preventDefault()
        
        const response = await fetch(SummaryApi.uploadProduct.url,{
            method : SummaryApi.uploadProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })

        const responseData = await response.json()

        //console.log(responseData.message)
        if (response.success) {
            toast.success(responseData?.message);
            onClose(); 
        }
        if(response.error){
            toast.error(responseData?.message)
        }
    }*/
   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(SummaryApi.uploadProduct.url, {
            method: SummaryApi.uploadProduct.method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to upload product');
        }

        const responseData = await response.json();
        toast.success(responseData?.message || 'Product uploaded successfully');
        //console.log('Closing modal after success'); // Debug log
        onClose(); // Close the component
        fetchData()
    } catch (error) {
        //console.error(error);
        toast.error(error.message || 'Something went wrong');
    }
};

  return (
    
    <div className='fixed w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-slate-200 bg-opacity-35'>
        <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
            
            <div className='flex justify-between items-center pb-3'>
                <h2 className='font-bold text-lg'>Uplode product</h2>
                <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                    <MdClose/>
                </div>
            </div>
             <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
                <label htmlFor='productName'>Product Name :</label>
                <input
                type='text'
                id='productName'
                placeholder='Enter Product Name'
                name='productName'
                value={data.productName}
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                required
                />

                <label htmlFor='brandName' className='mt-2'>Brand Name :</label>
                <input
                type='text'
                id='brandName'
                placeholder='Enter Brand Name'
                name='brandName'
                value={data.brandName}
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                required
                />

                <label htmlFor='category' className='mt-3'>Category :</label>
                <select required value={data.category} name='category' id='category' className='p-2 bg-slate-100 border rounded'onChange={handleOnChange}>
                <option value={""} >Select Category</option>
                    {
                        productCategory.map((el,index)=>{
                            return(
                                <option value={el.value} key={el.value+index}>{el.label}</option>
                            )
                        })
                    }
                </select>

                <label htmlFor='uplodImageInput' className='mt-3'>Product Image :</label>
                <label htmlFor='uplodImageInput'>
                <div className='p-2 bg-slate-100 border rounded h-48 w-full flex justify-center items-center cursor-pointer'>
                    <div className='text-slate-500 hover:text-black flex justify-center items-center flex-col gap-2'>
                        <span className='text-4xl '><FaCloudUploadAlt/></span>
                        <p className='text-sm'>Uplode Product Image</p>
                        <input type='file' id='uplodImageInput' className='hidden' onChange={handleUplodeProduct}/>
                    </div>
                    
                </div> 
                </label>
                <div>
                    {
                        data?.productImage[0] ? (
                            <div className='flex items-center gap-2'>
                                {
                                data.productImage.map((el, index)=>{
                                return(
                                    <div className='relative group' key={index} >
                                        <img 
                                            src={el}
                                            key={index}
                                            alt=''
                                            width={80} 
                                            height={80} 
                                            className='bg-slate-100 border cursor-pointer'
                                            onClick={() =>{
                                                setOpenFullScreenImage(true)
                                                setFullScreenImage(el)
                                    }}/>
                                    <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={() =>handleDeleteProductImage(index)}>
                                        <MdDelete/>
                                    </div>
                                    </div> 
                                )
                                })
                                }
                            </div>
                                ) : ( 
                                    <p className='text-red-600 text-xs'>*Please Uplode product image</p>
                                )
                    }
                </div>
                
                <label htmlFor='price' className='mt-3'>Price :</label>
                <input
                type='number'
                id='price'
                placeholder='Enter price'
                name='price'
                value={data.price}
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                required
                />

                <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
                <input
                type='number'
                id='sellingPrice'
                placeholder='Enter selling price'
                name='sellingPrice'
                value={data.sellingPrice}
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                required
                />

                <label htmlFor='description' className='mt-3'>Description</label>
                <textarea
                id='description' 
                className='h-28 bg-slate-100 border resize-none p-1' 
                placeholder='enter product description' 
                rows={3} onChange={handleOnChange} 
                name='description'
                value={data.description}
                >

                </textarea>

                <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>Uplode Product</button>
             </form>
        </div>

        {/*** display image full Screen */}
        {
            openFullScreenImage && (
                <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
            )
        }
        
    </div>
  )
}

export default UploadProduct