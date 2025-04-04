"use client";
import { callAPI } from "@/utils/api-caller";
import { useEffect, useState } from "react";
import PostComponent from "@/components/post-component"; // Giả sử bạn đã có PostComponent

const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA;

const pageSize = process.env.NEXT_PUBLIC_PAGE_SIZE; // Lấy số lượng trang từ environment variable

const AboutUs = () => {
  const [posts, setPosts] = useState([]);  // Dữ liệu bài viết

  useEffect(() => {
    fetchData();
  }, []); // Fetch dữ liệu khi component mount lần đầu

  // Hàm gọi API để lấy dữ liệu bài viết
  const fetchData = async () => {
    try {
      const res = await callAPI(`/posts?populate=*&pagination[pageSize]=${pageSize}`, "GET");
      setPosts(res.data.data); // Lưu dữ liệu bài viết
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-blue-100  h-[100vh] content-center">
      {/* Chữ About Us ở đầu trang, in đậm */}
      <div className="text-center text-4xl font-extrabold lg:mb-10  text-black">
        ABOUT US
      </div>

      <section
        id="Posts"
        className="lg:w-[55vw] md:w-[90vw] mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 justify-items-center justify-center lg:gap-y-6 lg:gap-x-6 mb-5 pt-5 md:gap-y-3 md:gap-x-3"
      >
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

        {posts.length === 0 && <div>No posts found</div>} {/* Nếu không có bài viết */}
      </section>
    </div>
  );
};

export default AboutUs;
