"use client"
import { callAPI } from "@/utils/api-caller";
import { getUser, isLogined } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ShopManager = () => {
    const router = useRouter();
    const [revenue, setRevenue] = useState(0);

    useEffect(() => {
        if (!isLogined()) {
            router.replace("/login");
        }
        if (getUser().role.name !== "ShopManager") {
            router.replace("/");
        }
        getRevenue();
    }, []);

    const getRevenue = async () => {
        try {
            const res = await callAPI("/get-revenue", "GET");
            console.log(res.data);
            setRevenue(res.data.revenue);
        } catch (error) {
            console.error("Error fetching revenue:", error);
        }
    };

    return (
        <div className="bg-gray-100 h-screen flex justify-center items-center">
            <div className="bg-white border-4 border-black rounded-lg p-8 text-center">
                <div className="text-6xl font-bold mb-4 text-black">
                    Revenue: ${revenue.toFixed(2)}
                </div>
            </div>
        </div>
    );
};

export default ShopManager;
