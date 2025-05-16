import React from "react";
import Header from "../header";
import Footer from "../footer";

const Wrapper = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
             <Header /> 
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
};

export default Wrapper;