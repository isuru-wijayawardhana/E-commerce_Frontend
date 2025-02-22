import React, { useEffect, useState } from 'react'
import { useAsyncError, useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import VerticalCard from '../components/VerticalCard'
import SummaryApi from '../common'

const CategoryProduct = () => {
    const [data,setData] = useState([])
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)

    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListinArray = urlSearch.getAll("category")

    const urlCategoryListObject = {}
    urlCategoryListinArray.forEach(el =>{
      urlCategoryListObject[el] = true
    })

    
    //console.log("urlCategoryListinArray",urlCategoryListinArray)
    //console.log("urlCategoryListObject",urlCategoryListObject)
    const [selectCategory,setSelectCategory] = useState(urlCategoryListObject)
    const [filterCategoryList,setFilterCategoryList] = useState([])

    const [sortBy,setSortBy] = useState("")
    console.log("sortBy",sortBy)

    const fetchData = async()=>{
      const response = await fetch(SummaryApi.filterProduct.url,{
        method : SummaryApi.filterProduct.method,
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify({
          category : filterCategoryList
        })
      })

      const dataResponse = await response.json()

      setData(dataResponse.data || [])

      //console.log(dataResponse)
    }

    const handleSelectCategory = (e) =>{
      const {name,value,checked} = e.target

      setSelectCategory((preve)=>{
        return{
          ...preve,
          [value] : checked
        }
      })

    //  console.log("selectCategory",name,value,checked)
    }

    //console.log("selectCategory",selectCategory)
    useEffect(()=>{
      fetchData()
    },[filterCategoryList])

    useEffect(()=>{
      const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName=>{
        if(selectCategory[categoryKeyName]){
          return categoryKeyName
        }
        return null
      }).filter(el => el)  // after adding this ".filter(el => el)" code we cant see "null" in array

      //console.log("selectd c",arrayOfCategory)

      setFilterCategoryList(arrayOfCategory)

      const urlFormat = arrayOfCategory.map((el,index) =>{
        if((arrayOfCategory.length - 1)=== index) {
          return `category=${el}`
        }
        return `category=${el}&&`
      })
      //console.log("urlFormat",urlFormat.join(""))

      navigate("/product-category?"+urlFormat.join(""))
      //product-category?category=Airpodes&&category=Camera
    },[selectCategory])

    const handleOnChangeSortBy = (e)=>{
      const { value } = e.target

      setSortBy(value)
      if(value == 'asc'){
        setData(preve => preve.sort((a,b)=>a.sellingPrice - b.sellingPrice))
      }
      if(value == 'dsc'){
        setData(preve => preve.sort((a,b)=>b.sellingPrice - a.sellingPrice))
      }
    }

    useEffect(()=>{

    },[sortBy])

  return (
    <div className='container mx-auto p-4'>
        {/**desktop vertion */}
        <div className='hidden lg:grid grid-cols-[200px,1fr] '>
          {/**left side */}
          <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll '>
            {/**Sort By */}
            <div className=''>
              <h3 className='text-base uppercase font-medium text-slate-500 border-slate-300 border-b pb-1 '>Sort by</h3>
              <form className='text-sm flex flex-col gap-2 py-2'>
                <div className='flex items-center gap-3'>
                  <input type='radio' name='sortBy' value={"asc"} checked={sortBy === 'asc'} onChange={handleOnChangeSortBy}/>
                  <label>Price - Low to High</label>
                </div>
                <div className='flex items-center gap-3'>
                  <input type='radio' name='sortBy' value={"dsc"} checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy}/>
                  <label>Price - High to Low</label>
                </div>
              </form>
            </div>

            {/**Filter By */}
            <div className=''>
              <h3 className='text-base uppercase font-medium text-slate-500 border-slate-300 border-b pb-1 '>Category</h3>
              <form className='text-sm flex flex-col gap-2 py-2 capitalize'>
                {
                  productCategory.map((categoryName,index)=>{
                    return(
                      <div className='flex items-center gap-3'>
                        <input type='checkbox' name={"category"} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value}  onChange={handleSelectCategory}/>
                        <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                      </div>
                    )
                  })
                }
              </form>
            </div>


          </div>

          {/**right side (product) */}
          <div  className=''>
            <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>

            <div className='min-h-[calc(100vh-120px)] max-h-[calc(100vh-120px)] overflow-y-scroll'>
            {
              data.length !== 0 && (
                <VerticalCard data={data} loading={loading}/>
              )
            }
            </div>
          </div>
        </div>
        
    </div>
  )
}

export default CategoryProduct