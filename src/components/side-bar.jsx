import { useState } from "react";

const SideBar = ({ onFilter }) => {
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [sortOrder, setSortOrder] = useState("ascending");

    const handlePriceRangeChange = (e) => {
        const value = e.target.value;
        if (value === "all") {
            setPriceRange([0, Infinity]);
        } else {
            const range = value.split("-").map(Number);
            setPriceRange(range);
        }
    };

    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value);
    };

    const applyFilters = () => {
        onFilter({ priceRange, sortOrder });
    };

    return (
        <div className="md:pt-20 fixed lg:top-16 lg:left-0 md:top-16 md:left-0 w-64 h-full bg-gray-100 p-4 shadow-lg z-10 overflow-y-auto"> {/* Lowered the z-index */}
            <h2 className="text-2xl font-bold mb-4 text-center">Filters</h2>
            <div className="mb-4">
                <label className="block font-bold mb-2">Price Range</label>
                <select value={priceRange === [0, Infinity] ? "all" : priceRange.join("-")} onChange={handlePriceRangeChange} className="w-full p-2 border rounded">
                    <option value="all">All</option>
                    <option value="15-30">15 - 30</option>
                    <option value="30-45">30 - 45</option>
                    <option value="45-60">45 - 60</option>
                    <option value="60-75">60 - 75</option>
                    <option value="75-90">75 - 90</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block mb-2 font-bold">Price Order</label>
                <select value={sortOrder} onChange={handleSortOrderChange} className="w-full p-2 border rounded">
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </select>
            </div>
            <button onClick={applyFilters} className="bg-black hover:bg-red-500 text-white rounded-md px-3 py-2">Apply Filters</button>
        </div>
    );
};

export default SideBar;
