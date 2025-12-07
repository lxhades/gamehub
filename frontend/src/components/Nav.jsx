import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Nav = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (keyword.trim() === "") return;
        navigate(`/search?query=${keyword}`);
    };
    return (
        <div className="flex min-h-10 justify-center bg-gray-800 opacity-90 items-center">
            <ul className="flex text-white">
                <li className="p-1 pl-5 relative group hover:text-blue-400 cursor-pointer">Duyệt tìm
                    <ul className="absolute hidden group-hover:block top-full left-0 bg-gray-800  ">
                        <li className="p-2 hover:bg-gray-700 cursor-pointer"><a href="">Bán chạy nhất</a></li>
                        <li className="p-2 hover:bg-gray-700 cursor-pointer"><a href="">Giảm giá & sự kiện</a></li>
                        <li className="p-2 hover:bg-gray-700 cursor-pointer"><a href="">Phát hành mới</a></li>
                    </ul>

                </li>

                <li className="p-1 pl-5  hover:text-blue-400 cursor-pointer">Khuyến nghị</li>
                <li className="p-1 pl-5 hover:text-blue-400 cursor-pointer">
                    <a href="">Danh mục</a>
                </li>
                <li className='p-1 pl-5  hover:text-blue-400 cursor-pointer'><a href="">Cách chơi</a></li>
                <li className='p-1 pl-5  hover:text-blue-400 cursor-pointer'><a href="">Mục đặc biệt</a></li>
            </ul>
            <form onSubmit={handleSearch} className="flex items-center">
                <input
                    type="text"
                    placeholder="Tìm game..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="px-3 py-1 rounded-full m-2 border-1 border-white text-white focus:outline-none "
                />
                <button
                    type="submit"
                    className="text-white  hover:font-bold "
                >
                    Tìm
                </button>
            </form>
        </div>
    )
}

export default Nav
