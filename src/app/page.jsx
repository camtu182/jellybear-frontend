"use client";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import PostComponent from "@/components/post-component"; // Giả sử bạn đã có PostComponent
import ProductComponent from "@/components/product-component";
import { callAPI } from "@/utils/api-caller";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation";
import { getUser, isLogined } from "@/utils/helper";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Policies from "@/components/policies";
const pageSize = process.env.NEXT_PUBLIC_PAGE_SIZE
const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA;

export default function Home() {
  const [products, setProducts] = useState([])
  const searchParams = useSearchParams()
  const [pageCount, setPageCount] = useState(1)
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]); // State for best sellers
  const [featuredProducts, setFeaturedProducts] = useState([]);  const page = searchParams.get('page') !== null ? +searchParams.get('page') : 1
  useEffect(() => {
      fetchData();
      if (!isLogined()) {
        router.replace("/")
    }
    if (getUser()?.role?.name === "ShopManager"){
        router.replace("/shop-manager")
    }
  }, [searchParams])
  
  const fetchData = async () => {
    try {
      const res = await callAPI(
        `/products?populate=*&pagination[pageSize]=${pageSize}&pagination[page]=${currentPage}`,
        "GET"
      );
      setProducts(res.data.data);
      setPageCount(res.data.meta.pagination.pageCount);

      // Fetch best sellers separately
      const productRes = await callAPI("/products?populate=*", "GET");
      const allProducts = productRes.data.data;

      const res2 = await callAPI(`/posts?populate=*&pagination[pageSize]=${pageSize}`, "GET");
        setPosts(res2.data.data); // Lưu dữ liệu bài viết
      // Filter best sellers
      const bestSellerProducts = allProducts
        .sort((a, b) => b.attributes.sold - a.attributes.sold)
        .slice(0, 10);
      setBestSellers(bestSellerProducts);

      // Filter featured products (if needed)
      const featured = allProducts.filter(
        (product) => product.attributes.isFeatured
      );
      setFeaturedProducts(featured);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchData(); // Fetch products for the new page
    router.push(`/?page=${page}`, undefined, { shallow: true });
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 883,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1155,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 583,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="w-[100vw] h-[100vh] bg-fixed size-full bg-[url('https://i.imgur.com/raBZqon.jpeg')] bg-cover bg-no-repeat bg-center block flex-col " >
      <Header />
      <div className="w-[90%] mx-auto h-full flex items-center justify-between py-10">
          <div className="">
          <div className="sm:text-6xl xs:text-5xl text-white font-serif font-extrabold uppercase" style={{textShadow: '1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black'}} >
            <h1>Make Your Comfort </h1>
            <h1>Is Our Happiness</h1>
          </div>
          <div className="block text-medium text-white font-bold" style={{textShadow: '1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black'}}>
            <h2>Looking for a cuddly companion? Our stuffed animals shop has a wide selection of</h2>
            <h2>adorable plushies to choose from. Come find your new snuggle buddy today!</h2>
          </div>
          <Link href="/products">
          <button className="bg-black hover:bg-red-500 text-white rounded-md px-3 py-2 hover ">Shop Now</button>
          </Link>
          
          </div>
      </div>
      <div className="block w-full h-auto bg-gray-100  font-semibold">
        <div className="block  h-auto justify-items-center">
          <div className="pb-5 pt-12 w-full text-center text-4xl font-extrabold">
            <span>SẢN PHẨM BÁN CHẠY</span>
          </div>
          <div className=" lg:w-[80vw] md:w-[90vw] mx-auto h-auto justify-center items-center gap-y-5 gap-x-5 mb-5">
          <Slider {...settings}>
              {bestSellers.map((value, index) => (
                <ProductComponent
                id={value.id}
                  key={index}
                  productName={value.attributes.name}
                  price={value.attributes.price}
                  category={
                    value.attributes.category.data.attributes.name
                  }
                  imageUrl={
                    value.attributes.image.data[0].attributes.url
                  }
                />
              ))}
            </Slider>
          </div>
        </div>
        <div className="block text-center w-full h-auto justify-items-center">
          <div className="pb-5 pt-12 w-full text-center text-4xl font-extrabold">
            <span>SẢN PHẨM CỦA SHOP</span>
          </div>
          <div className=" block w-full h-auto justify-center items-center">
          <section id="Projects"
                className=" w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-y-6 gap-x-6 mb-5">
                {products.map((value, index) => (
                <ProductComponent
                  key={index}
                  id={value.id}
                  productName={value.attributes.name}
                  price={value.attributes.price}
                  category={
                    value.attributes.category.data.attributes.name
                  }
                  imageUrl={
                    value.attributes.image.data[0].attributes.url
                  }
                />
              ))}
            </section>
            <div className="flex flex-col items-center">

                <div className="inline-flex mt-2 xs:mt-0 mb-5">
                <button
                  disabled={currentPage <= 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <svg
                    className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 5H1m0 0 4 4M1 5l4-4"
                    />
                  </svg>
                  Prev
                </button>
                <span className="ml-5 mr-5 font-bold">
                  {" "}
                  {currentPage}/{pageCount}
                </span>
                <button
                  disabled={currentPage >= pageCount}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                  <svg
                    className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>
                </div>
            </div>
          </div>
        </div>
        <div className="block text-center w-full h-auto justify-items-center ">
          <div className="text-4xl font-extrabold pt-10 ">
            <span>BLOG</span>
          </div>
          <section id="Projects"
                className="lg:w-[55vw] md:w-[80vw] mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 justify-items-between justify-between gap-y-6 gap-x-6 ">
                {posts.map((value, index) => (
                <PostComponent
                  ID={value.id}
                  key={value.id}
                  title={value.attributes.title}  // Tiêu đề bài viết
                  content={value.attributes.content}  // Nội dung bài viết
                  author={value.attributes.author}  // Tác giả
                  date={value.attributes.create_at}  // Ngày tạo
                  postImg={value.attributes.image.data[0].attributes.url} 
                  // Ảnh bài viết (nếu có)
                />
              ))}
            </section>
        </div>
      </div>
      <Policies/>
      <Footer />
    </div>
  );
}
