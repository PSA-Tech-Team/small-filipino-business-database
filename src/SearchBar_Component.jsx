<<<<<<< HEAD
import "./SearchBar_Component.css";

function SearchBarComponent() {
    return(
        <div className="searchbar">
            <span class="search-icon material-symbols-outlined"></span>
            <input class="search-input" type="search" placeholder="Search Business"/>
        </div>
    );   
}

export default SearchBarComponent;



=======
import { useEffect, useState } from "react";
import "./SearchBar_Component.css";

function SearchBarComponent({ onSendSearchQuery }) {
    
    useEffect(() => {
        const searchInput = document.querySelector(".search-input");

        searchInput.addEventListener("keydown", (e) => {
            const enterKey = 13
            if (e.keyCode != enterKey) return;

            let value = (e.target.value).trim().replace(/ +(?= )/g,'');
            // console.log("Value: ", value);
            onSendSearchQuery(value);
        });
    });

    return(
        <div className="searchbar">
            <span class="search-icon material-symbols-outlined"></span>
            <input class="search-input" type="search" placeholder="Search Business"/>
        </div>
    );   
}

export default SearchBarComponent;



>>>>>>> b81d6c17a139db0f5ce04c4b1ea768e0d1b3a9a5
// I "borrowed" this guy's code: https://www.youtube.com/watch?v=f6ocDCkCmhM