import React from 'react';
import './Header.css';
import logout from "./logout.png"

export const Header = props => (
    <div id="headerTitle" className={props.className && props.className}>
        <img src="https://www.bharatbijlee.com/assets/images/bharatbijlee-logo.png" alt="BBL" id="logo"></img>
        
        {
                !props.hideLogout && <img src={logout} alt="Logout" className="logoutImage" onClick={() => {
                    window.location.href = "/"
                }}/>
            }
            
           
        

    </div>
);

