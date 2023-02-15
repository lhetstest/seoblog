import React from "react";
import Header from "./Header";


const Layout = ({children}) => {
    return (
        <React.Fragment>
            <Header />
            { children }
            <p className="p-3">footer</p>
        </React.Fragment>
    )
}

export default Layout;