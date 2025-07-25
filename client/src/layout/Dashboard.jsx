import React from "react";
import UserMenu from "../components/UserMenu";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state)=>state.user)
  console.log("user DashBoard", user);
  
  return (
    <section className="min-h-screen bg-white">
      <div className='flex flex-col lg:flex-row container mx-auto p-3 min-h-screen'>
        {/** left for menu */}
        <div className="hidden lg:block lg:w-[250px]  sticky top-24 h-[calc(100vh-96px)] overflow-y-auto p-2 border-r">
            <UserMenu />
        </div>
        {/** right for menu */}
        <div className="flex-1 bg-white-500 p-4 min-h-[75vh]">
            <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
