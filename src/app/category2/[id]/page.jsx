"use client";

import CollectionComponent from '@/components/collection-component';
import { callAPI } from "@/utils/api-caller";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const CollectionByCategory = () => {
    const params = useParams()
    const [collections, setCollections] = useState([])
    const [category2, setCategory] = useState(null)
    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {
        try {
            const category2Id = params.id;
            const res = await callAPI("/collections?populate=*&filters[category2][id][$eq]=" + category2Id, "GET")
            setCollections(res.data.data)
            const res2 = await callAPI("/category2s/" + category2Id, "GET")
            setCategory(res2.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            Sản phẩm thuộc danh mục {category2 !== null && category2.attributes.name}
            <section id="Projects"
                className="static w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-5 gap-x-5 mt-10 mb-5">
                {
                    collections.map((value, index) => {
                        return <CollectionComponent
                            key={index}
                            collectionName={value.attributes.name}
                            price={value.attributes.price}
                            category2={value.attributes.category2.data.attributes.name}
                            imageUrl={value.attributes.image.data[0].attributes.url} />
                    })
                }
                {
                    collections.length === 0 && <div>Rỗng</div>
                }
            </section>

        </div>
    )
}
export default CollectionByCategory;