"use client"
import ProductComponent from "@/components/product-component";
import { callAPI } from "@/utils/api-caller";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation";
import SideBar from "@/components/side-bar";
import { getUser, isLogined } from "@/utils/helper";
const pageSize = process.env.NEXT_PUBLIC_PAGE_SIZE
const ProductsPage = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const searchParams = useSearchParams()
    const [pageCount, setPageCount] = useState(1)
    const router = useRouter();
    const page = searchParams.get('page') !== null ? +searchParams.get('page') : 1
    useEffect(() => {
        fetchData();
      if (!isLogined()) {
        router.replace("/login")
    }
    if (getUser()?.role?.name === "ShopManager"){
        router.replace("/shop-manager")
    }
  }, [searchParams])
    const fetchData = async () => {
        try {
            const res = await callAPI(`/products?populate=*&pagination[pageSize]=${pageSize}&pagination[page]=${page}`, "GET")
            setProducts(res.data.data)
            setPageCount(res.data.meta.pagination.pageCount)
            const productsRes = await callAPI("/products?populate=*", "GET")
            setProducts(productsRes.data.data)
            setFilteredProducts(productsRes.data.data);
        } catch (error) {
            console.log(error)
        }
    }
    const prev = ()=>{
        router.push("/products?page=" + ((+page) - 1))
    }
    const next = ()=>{
        router.push("/products?page=" + ((+page) + 1))
    }
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const handleFilter = (filters) => {
        let filtered = products;
        if (filters.category) {
            filtered = filtered.filter(
                (product) =>
                    product.attributes.category.data.attributes.name === filters.category
            );
        }
        if (filters.priceRange) {
            const [minPrice, maxPrice] = filters.priceRange;
            filtered = filtered.filter(
                (product) =>
                    product.attributes.price >= minPrice &&
                    product.attributes.price <= maxPrice
            );
        }
        if (filters.sortOrder) {
            filtered = filtered.sort((a, b) => {
                const priceA = a.attributes.price;
                const priceB = b.attributes.price;
                if (filters.sortOrder === "ascending") {
                    return priceA - priceB;
                } else {
                    return priceB - priceA;
                }
            });
        }
        setFilteredProducts(filtered);
    };
    return (
        <div className="bg-blue-100 pb-10 lg:pt-20 md:pt-40 content-center">
            <button
                onClick={toggleSidebar}
                className="fixed lg:top-20 lg:right-4 md:top-40 md:right-14 z-10 bg-black hover:bg-red-500 text-white p-2 rounded-md hover"    
                style={{ zIndex: 20 }} // Ensure the button is above other elements
            >
                {isSidebarOpen ? "Close Filters" : "Open Filters"}
            </button>
            {isSidebarOpen && <SideBar onFilter={handleFilter} />}
            <div className={`transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}> {/* Adjust content margin when sidebar is open */}
            <section id="Projects"
                className=" w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-7 gap-x-5 mt-10">
                {
                   filteredProducts.map((value, index) => {
                    return <ProductComponent
                                id={value.id}
                                productName={value.attributes.name} 
                                price={value.attributes.price} 
                                category={value.attributes.category.data.attributes.name} 
                                imageUrl={value.attributes.image.data[0].attributes.url} />
                })
                }
            </section>
                
            </div>
            <div className="flex flex-col items-center">

                {/* <div className="inline-flex my-5 xs:mt-0">
                    <button disabled={+page <= 1} onClick={()=>prev()}  className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                        </svg>
                        Prev
                    </button>
                    <span className="ml-5 mr-5 font-bold"> {page}/ {pageCount}</span>
                    <button disabled={+page >= +pageCount} onClick={()=>next()} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        Next
                        <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button>
                </div> */}
            </div>
            
        </div>
    )
}
export default ProductsPage;