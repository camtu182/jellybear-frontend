"use client"
import { useAppContext } from "@/components/context"
import ShoppingCartItem from "@/components/shopping-cart-item"
import { callAPI } from "@/utils/api-caller"
import { getUser, isLogined } from "@/utils/helper"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA
const ShoppingCartPage = () => {
    const { shoppingCart, setShoppingCart } = useAppContext()
    const [totalPrice, setTotalPrice] = useState(0)
    const searchParams = useSearchParams()
    const router = useRouter();

    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [firstName, setfirstName] =useState("")
    const [lastName, setlastName] =useState("")

    console.log(shoppingCart)
    useEffect(() => {
        calcTotalPrice();
        if (!isLogined()) {
            router.replace("/login")
        }
        if (getUser()?.role?.name === "ShopManager"){
            router.replace("/shop-manager")
        }
    }, [shoppingCart,searchParams])
    const calcTotalPrice = () => {
        var sum = 0
        for (var i = 0; i < shoppingCart.length; i++) {
            sum += +shoppingCart[i].price * +shoppingCart[i].amount
        }
        console.log(sum)
        setTotalPrice(sum)
    }
    const add = async (productId) => {
        try {
            const res = await callAPI("/add-to-shopping-cart", "POST", { productId, amount: 1 })
            console.log(res)
            setShoppingCart(res.data)
            calcTotalPrice()
        } catch (error) {

        }
    }
    const decrease = async (productId) => {
        try {
            const res = await callAPI("/add-to-shopping-cart", "POST", { productId, amount: -1 })
            console.log(res)
            setShoppingCart(res.data)
            calcTotalPrice()
        } catch (error) {

        }
    }
    const remove = async (productId, amount) => {
        try {
            const res = await callAPI("/add-to-shopping-cart", "POST", { productId, amount })
            console.log(res)
            setShoppingCart(res.data)
        } catch (error) {

        }
    }
    const onCheckOut = async() => {
        try {
            const data = {
                address,
                phone,
                firstName,
                lastName
            }
            const res = await callAPI("/check-out","POST", data)
            console.log(res.data)
            setShoppingCart([])
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="bg-gray-100 h-screen lg:py-11 md:py-40">
            <div className="container lg:w-[80vw] md:w-[90vw] mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold  text-center  mb-4">SHOPPING CART</h1>
                <div className="md:flex md:flex-col lg:flex-row gap-4">
                    <div className="lg:w-3/5 md:w-5/5">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="text-canter text-xl font-bold">Product</th>
                                        <th className="text-center text-xl font-bold">Price</th>
                                        <th className="text-center text-xl font-bold">Quantity</th>
                                        <th className="text-center text-xl font-bold">Total</th>
                                    </tr>
                                </thead>
                                {
                                    shoppingCart.map((val, index)=>{
                                        return(
                                            <ShoppingCartItem
                                            //ID= {val.id}
                                            productId = {val.id}
                                            add = {add}
                                            decrease = {decrease}
                                            remove={remove}
                                            key={index}
                                            imageUrl={URL_SERVER + val.image[0].url}
                                            productName={val.name}
                                            category={val.category.name}
                                            amount={val.amount}
                                            unitPrice={val.price}
                                            price={val.price*val.amount}
                                            />
                                        )
                                    })
                                }
                        
                            
                        
                            </table>
                        </div>
                    </div>
                    <div className="lg:w-2/5 md:w-5/5">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl text-center font-bold mb-4">Summary</h2>
                            
                            <hr className="my-2"/>
                            <div className="flex lg:justify-between md:justify-center mb-2">
                                <span className="text-xl font-bold md:right-0">Total: </span>
                                <span className="text-xl font-bold"> ${totalPrice}</span>
                            </div>
                            
                            <div className="block text-center">
                                <div className=" text-2xl font-bold py-5">Shipping details</div>
                                <div className="block">
                                    <div className="flex justify-between">
                                        <div className="text-left w-full mr-1">
                                            <label htmlFor="">First Name</label>
                                            <input value={firstName} onChange={e=>setfirstName(e.target.value)} className="block ring-inset ring-blue-200 ring-2 rounded-md py-2 px-3 w-full my-2" type="text" placeholder="First Name"/>
                                        </div>
                                        <div className="text-left w-full ml-1">
                                            <label htmlFor="">Last Name</label>
                                            <input value={lastName} onChange={e=>setlastName(e.target.value)} className="block ring-inset ring-blue-200 ring-2 rounded-md py-2 px-3 w-full my-2" type="text" placeholder="Last Name"/>
                                        </div>
                                    </div>
                                    <div className="flex justify-between py-3">
                                        <div className="text-left w-full mr-1">
                                            <label htmlFor="">Phone Number</label>
                                            <input value={phone} onChange={e=>setPhone(e.target.value)} className="block ring-inset ring-blue-200 ring-2 rounded-md py-2 px-3 w-full my-2" type="text" placeholder="Your phone number"/>
                                        </div>
                                        <div className="text-left w-full ml-1">
                                            <label htmlFor="">Address</label>
                                            <input value={address} onChange={e=>setAddress(e.target.value)} className="block ring-inset ring-blue-200 ring-2 rounded-md py-2 px-3 w-full my-2" type="text" placeholder="Your address"/>
                                    </div>
                                    </div>
                                    
                                </div>
                                


                            </div>
                            <button onClick={()=> onCheckOut()} className="bg-blue-400 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ShoppingCartPage;