import { useEffect, useState } from "react";
import React from 'react';
import { UNSAFE_getPathContributingMatches } from "@remix-run/router";

const Right = ({iteam}) =>{

    const[price,setPrice] = useState(0);

    useEffect(()=>{
        totalAmount();
    },[iteam])

  const totalAmount = ()=>{
    let price = 0;
    iteam.map((item)=>{
        price += item.price.cost 
    });
    setPrice(price)
  }

    return(
        <div className='right_buy'>
         
         <div className='cost_right'>
            <p>Your order is eligible for FREE Delivery</p> <br/>
            <span style={{color:"#565959"}}>Select this option at checkout. Details</span>
            <h3>Subtotal ({iteam.length} items) : <span style={{fontWeight:'700'}}>₹{price}.00</span></h3>
            <button className='rightbuy_btn'>Proceed to Buy</button>
            <div className='emi'>
            Emi available
            </div>
         </div>
        </div>
    )
};
export default Right;