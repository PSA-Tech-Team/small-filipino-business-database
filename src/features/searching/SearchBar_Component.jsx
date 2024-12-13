import { useEffect, useState } from "react";
import "./SearchBar_Component.css";

function SearchBarComponent({ onSendSearchQuery }) {

    const [inputValue, setInputValue] = useState("");

    const handleEnterSend = (e) => { 
        if (e.key !== "Enter") {
           return;
        }
        onSendSearchQuery(inputValue);
        setInputValue("");
    }
    

    return(
        <div className="searchbar">
            <span class="search-icon material-symbols-outlined"></span>
            <input type="text" className="search-input" placeholder="Search for a business..."
                onChange={(e) => setInputValue(e.target.value.toLowerCase())} 
                onKeyDown={handleEnterSend}
            />
        </div>
    );   
}

export default SearchBarComponent;



// I "borrowed" this guy's code: https://www.youtube.com/watch?v=f6ocDCkCmhM