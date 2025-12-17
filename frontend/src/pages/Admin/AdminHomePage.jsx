import React, { useState } from "react";
import CategoryManager from "./CategoryManager";
import GameManager from "./GameManager";
import axios from "axios";
import UserManager from "./UserManager";
const AdminHomePage = () => {
  const [activeTab, setActiveTab] = useState("game");
  

  return (
    <div className=" flex min-h-screen ">
      <div className="w-1/5 shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4 text-center">Trang quản trị</h2>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setActiveTab("game")}
              className={`w-full text-left p-2 rounded-md ${
                activeTab === "game"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              Quản trị game
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("category")}
              className={`w-full text-left p-2 rounded-md ${
                activeTab === "category"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              Quản trị thể loại
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("user")}
              className={`w-full text-left p-2 rounded-md ${
                activeTab === "user"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              Quản trị user
            </button>
            </li>
        </ul>
      </div>

      <div className="w-4/5 p-6">
        {activeTab === "game" && <GameManager />}
        {activeTab === "category" && <CategoryManager />}
        {activeTab === "user" && <UserManager />}
      </div>
    </div>
  );
};

export default AdminHomePage;
