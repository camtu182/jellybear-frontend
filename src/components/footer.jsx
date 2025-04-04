import Link from "next/link";
const Footer = () => {
    return (
        <footer className="w-full bg-stone-200 lg:px-16 px-4 py-1 flex flex-wrap justify-center items-center relative z-20"> {/* Added z-index and relative positioning */}
            <div className="bg-white w-[80vw]">
                <div className="px-4 sm:px-6 text-gray-800 sm:grid md:grid-cols-4 sm:grid-cols-2 mx-auto">
                    <Link href="/" className="flex-1 flex  items-center">
                        <img className="w-15 h-16 object-contain  m-1 " src="/logo_2.png " alt="image description"/>
                        <a className="text-4xl font-extrabold"></a>
                    </Link>
                    <div className="p-5">
                        <div className="text-sm uppercase text-black font-extrabold">Policies</div>
                        <a className="my-3 block" href="">Returning</a>
                        <a className="my-3 block" href="">Shipping</a>
                        <a className="my-3 block" href="">Privacy</a>
                    </div>
                    <div className="p-5">
                        <div className="text-sm uppercase text-black font-extrabold">Support</div>
                        <a className="my-3 block" href="">Help Center</a>
                        <a className="my-3 block" href="">FAQ</a>
                        <a className="my-3 block" href="">Conditions</a>
                    </div>
                    <div className="p-5">
                        <div className="text-sm uppercase text-black font-extrabold">Contact us</div>
                        <a className="my-3 block" href="">New York City, USA 10004</a>
                        <a className="my-3 block" href="">+1 100 1004 0001</a>
                        <a className="my-3 block" href="">brian@brandx.com</a>
                    </div>
                </div>
            </div>
        </footer>
    )
};

export default Footer;
