"use client";

import OrderItem from "@/components/order-item";
import ShoppingCartItem from "@/components/shopping-cart-item";
import { callAPI } from "@/utils/api-caller";
import { getUser, isLogined } from "@/utils/helper";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA
const MyOrders = ()=>{
    const searchParams = useSearchParams()
    const router = useRouter();

    const [orders, setOrders] = useState([])
    useEffect(()=>{fetchData();
        if (!isLogined()) {
          router.replace("/login")
      }
      if (getUser()?.role?.name === "ShopManager"){
          router.replace("/shop-manager")
      }
    }, [searchParams])
    const fetchData = async()=>{
        try {
            const res = await callAPI("/my-orders", "GET")
            console.log(res.data)
            setOrders(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="bg-gray-100 h-full py-8">
            <div className="container w-[60vw] mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold  text-center  mb-4">MY ORDERS</h1>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full">
                    {
                                    orders.map((val, index) => {
                                        return (
                                            <OrderItem
                                                products={val.products}
                                                totalPrice={val.totalPrice}
                                                key={index}
                                                firstName={val.firstName}
                                                lastName={val.lastName}
                                                phone={val.phone}
                                                address={val.address}
                                            />
                                        )
                                    })
                                }
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export default MyOrders