import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCarProduct from '../components/HorizontalCarProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCarProduct category={"Watches"} heading={"Popular Watches"}/>
      <HorizontalCarProduct category={"Airpodes"} heading={"Top's airpodes"}/>
      <HorizontalCarProduct category={"Earphones"} heading={"Top's Earphones"}/>

      <VerticalCardProduct category={"Mobiles"} heading={"Popular Mobiles"}/>
      <VerticalCardProduct category={"Speakers"} heading={"Popular Speakers"}/>
      <VerticalCardProduct category={"Televissions"} heading={"Popular Televissions"}/>
      <VerticalCardProduct category={"Refrigerator"} heading={"Popular Refrigerator"}/>
      <VerticalCardProduct category={"Camera"} heading={"Popular Camera"}/>
      <VerticalCardProduct category={"Processor"} heading={"Popular Processor"}/>
      <VerticalCardProduct category={"Mouse"} heading={"Popular Mouse"}/>
      <VerticalCardProduct category={"printers"} heading={"Popular printers"}/>
      <VerticalCardProduct category={"Trimmers"} heading={"Popular Trimmers"}/>
      
    </div>
  )
}

export default Home