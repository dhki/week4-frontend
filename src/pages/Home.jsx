import React from "react";
import Header from "../components/Header/Header";
import Showcase from "../components/Home/Showcase";
import Sidebar from "../components/Home/Sidebar/Sidebar";

function Home() {
    return (
        <>
            <Header />
            <div className="flex h-full md:w-4/5 lg:w-4/6 mt-14 mx-auto">
                <Sidebar />
                <Showcase />
            </div>
        </>
    )
}

export default Home;