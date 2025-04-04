"use client";
import { callAPI } from "@/utils/api-caller";
import { getUser, isLogined, setToken, setUser } from "@/utils/helper";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppContext } from "./context";

const Header = () => {
    const [searchText, setSearchText] = useState('')
    const [category2s, setCategory2s] = useState([])
    const [categories, setCategories] = useState([])
    const [user, setUserState] = useState(getUser())
    const router = useRouter()
    useEffect(() => {
        fetchData()
        fetchData2()
        const getUserfromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
        if (isLogined())
            fetchShoppingCart();
    }, [])
    const fetchData = async () => {

        try {
            const res = await callAPI("/categories", "GET")
            setCategories(res.data.data)
            console.log(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }
     const fetchData2 = async () => {

        try {
            const res = await callAPI("/category2s", "GET")
            setCategory2s(res.data.data)
            console.log(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    const { setShoppingCart, isFetchedShoppingCart, setIsFetchedShoppingCart } = useAppContext();
    const fetchShoppingCart = async () => {
        if (!isFetchedShoppingCart) {
            try {
                const res = await callAPI("/my-shopping-cart", "GET")
                console.log(res)
                setShoppingCart(res.data)
                setIsFetchedShoppingCart(true)
            } catch (error) {
                console.log(error)
            }
        }

    }

    const logout = () => {
        setToken("")
        setUser(null)
        setUserState(null)
        router.replace("/")
    }
    const { shoppingCart } = useAppContext();
    return (
        <header className="fixed w-full bg-orange-50 lg:px-16 px-4 py-0 flex flex-wrap justify-between items-center z-50" >

            <Link href="/" className="lg:block md:block items-center">
            <img className="w-15 h-16 object-contain  m-1 ml-20" src="/logo_2.png " alt="image description"/>
                <a className="text-4xl font-extrabold"></a>
            </Link>
            <div className="flex items-center">
                <div className="relative w-2xl mx-auto ">
                    <button onClick={() => { window.location.href = '/search?searchText=' + searchText }} className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 ">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.795 13.408l5.204 5.204a1 1 0 01-1.414 1.414l-5.204-5.204a7.5 7.5 0 111.414-1.414zM8.5 14A5.5 5.5 0 103 8.5 5.506 5.506 0 008.5 14z" />
                        </svg>
                    </button>
                    <input onChange={(e) => setSearchText(e.target.value)} className="w-full py-2 px-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 " type="search" placeholder="Search" />

                </div>

            </div>


            <div className=" md:flex md:items-center md:w-auto w-full justify-between " id="menu">

                <ul className="md:flex items-center justify-between text-lg text-gray-700 pt-4 md:pt-0">
                    <li><Link href="/" className="md:p-4 block duration-200 hover:text-yellow-400 font-medium" >Home</Link></li>

                </ul>

                <ul className="group relative cursor-pointer text-lg text-gray-700 md:pt-0">
                    <li className="flex items-center justify-between ">
                        <a href="/products" className="menu-hover md:p-4  block duration-200 hover:text-yellow-400 font-medium" >Products</a>
                    </li>
                    {
                        <li className="invisible absolute w-36 z-50 flex flex-col bg-gray-100 py-1 px-4 text-gray-800 shadow-xl group-hover:visible " aria-labelledby="dropdownLargeButton">

                            {
                                categories.map((val, index) => {
                                    return (
                                        <li>
                                            <Link key={index} href={"/category/" + val.id} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{val.attributes.name}</Link>
                                        </li>)
                                })
                            }
                        </li>
                    }
                </ul>

                <ul className="group relative cursor-pointer text-lg text-gray-700 md:pt-0">
                    <li className="flex items-center justify-between space-x-5  ">
                        <a href="/collections " className="menu-hover md:p-4 py-3 px-0 block duration-200 hover:text-yellow-400 font-medium">Coming soon</a>
                    </li>
                    {
                        <li className="invisible absolute w-36 z-50 flex flex-col bg-gray-100 py-1 px-4 text-gray-800 shadow-xl group-hover:visible " aria-labelledby="dropdownLargeButton">
                            {
                                category2s.map((val, index) => {
                                    return (
                                        <li>
                                            <Link key={index} href={"/category2/" + val.id} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{val.attributes.name}</Link>
                                        </li>)
                                })
                            }
                        </li>
                    }
                </ul>

                <ul className="md:flex items-center justify-between text-lg text-gray-700 pt-4 md:pt-0">
                    <li><Link href="/posts" className="md:p-4 block duration-200 hover:text-yellow-400 font-medium" >About us</Link></li>

                </ul>

            </div>


            <div className="flex items-center">
                {
                    user && <Link href={"/shopping-cart"} className=" relative pl-20 pr-5">
                        <FontAwesomeIcon icon={faShoppingCart} className="scale-150 text-gray-700" />
                        <div className="flex bg-red-500 rounded-full text-center text-xs px-1 text-white absolute right-0 top-0">{shoppingCart.length}</div>
                    </Link>
                }

                {
                    !user ?
                        <div>
                            <Link href="/login" className="bg-white text-gray-800 hover:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xl px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log in</Link>

                            <Link href="/register" className="bg-white text-gray-800 hover:text-white  hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xl px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Register</Link>

                        </div>

                        :

                        <div className=" group static h-full w-full items-center cursor-pointer text-lg text-gray-700 py-2.5 px-4">
                            <div className="md:flex p-1 bg-white  items-center justify-between text-lg rounded-full text-gray-700 md:pt-0">
                                <svg className="z-50 size-10 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>

                            </div>

                            <li className="invisible absolute right-0 z-10 mt-2 mr-10 w-55 block overflow-hidden flex-col bg-gray-100 py-1 px-4 text-gray-800 shadow-xl group-hover:visible">

                                <a href="/my-orders" className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-yellow-400 md:mx-2">Đơn hàng của tôi</a>

                                {/* <Link href="/user-profile" className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-yellow-400 md:mx-2">Thông tin cá nhân</Link> */}

                                <a onClick={() => { logout() }} className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-yellow-400 md:mx-2">Đăng xuất</a>

                            </li>
                        </div>
                }


            </div>

        </header>
    )
}
export default Header;