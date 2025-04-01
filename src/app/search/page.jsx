'use client';
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react';
import { callAPI } from "@/utils/api-caller";
import ProductComponent from "@/components/product-component";
import CollectionComponent from '@/components/collection-component';

const searchPage = () => {
    // const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA
    const [products, setProducts] = useState([])
    const [collections, setCollections] = useState([])

    const searchParams = useSearchParams();
    const searchText = searchParams.get('searchText');

    useEffect(() => {
        fetchProductData();
    }, [])

    const fetchProductData = async () => {
        try {
            const productRes = await callAPI("/products?populate=*&filters[name][$contains]=" + searchText, "GET")

            setProducts(productRes.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    

    return (
        <div className='block bg-blue-100 py-5'>
            {(products.length > 0) && <div>
                <div>products
                    <section id="Projects"
                        className="bg-static w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-5 gap-x-5 mt-10">
                        {
                            products.map((value, index) => {
                                return <ProductComponent
                                    key={index}
                                    productName={value.attributes.name}
                                    price={value.attributes.price}
                                    category={value.attributes.category.data.attributes.name}
                                    imageUrl={value.attributes.image.data[0].attributes.url} />
                            })
                        }
                    </section>
                </div>

                


            </div>

            }
            {products.length == 0 ?
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className=''>Khong tim thay san pham   </h2>
                    </div>

                </div>
                : null}
        </div>
    )
}


export default searchPage;