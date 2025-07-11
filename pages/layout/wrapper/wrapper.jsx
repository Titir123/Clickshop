import React from "react";
import Header from "../header";
import Footer from "../footer";
import ChatWidget from "@/pages/ChatWidget";

const Wrapper = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
             <Header /> 
            <main className="flex-grow">{children}</main>
            {/* <ChatWidget/> */}
            <Footer />
        </div>
    );
};

export default Wrapper;