"use client";

import ProductComponent from "@/components/product-component";
import { callAPI } from "@/utils/api-caller";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProductByCategory = ()=>{
    const params = useParams()
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState(null)
    useEffect(()=>{
        fetchData();
    },[])
    const fetchData = async()=>{
        try {
            const categoryId = params.id;
            const res = await callAPI("/products?populate=*&filters[category][id][$eq]=" + categoryId, "GET")
            setProducts(res.data.data)
            const res2 = await callAPI("/categories/" + categoryId, "GET")
            setCategory(res2.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="bg-blue-100 py-5">
        Sản phẩm thuộc danh mục {category !== null && category.attributes.name}
        <section id="Projects"
            className="static w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-5 gap-x-5 mt-10 mb-5">
            {
                   products.map((value, index) => {
                    return <ProductComponent
                                id={value.id}
                                productName={value.attributes.name} 
                                price={value.attributes.price} 
                                category={value.attributes.category.data.attributes.name} 
                                imageUrl={value.attributes.image.data[0].attributes.url} />
                })
                }
            {
                products.length === 0 && <div>Rỗng</div>
            }
        </section>

    </div>
    )
}
export default ProductByCategory;