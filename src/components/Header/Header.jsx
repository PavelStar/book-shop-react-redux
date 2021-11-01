import React from "react";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import Cart from "../cart/Cart";
import History from "../History/History"

import "./Header.scss"

const Header = () => {

    

    

    
    
    

    return (
        
        <header className="main-header" >
            <div className="main-header__inner">
                
                <Logo />
                <Search />
                <History/>
                <Cart/>
            </div>
        </header>    
        
        
    )
}

export default Header;