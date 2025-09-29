import { useState } from "react";
import "./SearchBar_Component.css";

function SearchBarComponent({ onSendSearchQuery }) {
  const [query, setQuery] = useState("");

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
    
      onSendSearchQuery(e.target.value.trim().replace(/ +(?= )/g,''));
    }
  };

  return (
    <div className="searchbar">
      <span className="search-icon material-symbols-outlined"></span>
      <input
        className="search-input"
        type="search"
        placeholder="🔍 Find a small business to support!"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default SearchBarComponent;

// import { useEffect, useState } from "react";
// import "./SearchBar_Component.css";

// function SearchBarComponent({ onSendSearchQuery }) {
    
//     useEffect(() => {
//         const searchInput = document.querySelector(".search-input");

//         searchInput.addEventListener("keydown", (e) => {
//             const enterKey = 13
//             if (e.keyCode != enterKey) return;

//             let value = (e.target.value).trim().replace(/ +(?= )/g,'');
//             // console.log("Value: ", value);
//             onSendSearchQuery(value);
//         });
//     });

//     return(
//         <div className="searchbar">
//             <span class="search-icon material-symbols-outlined"></span>
//             <input class="search-input" type="search" placeholder="🔍 Find a small business to support!"/>
//         </div>
//     );   
// }

// export default SearchBarComponent;



// // I "borrowed" this guy's code: https://www.youtube.com/watch?v=f6ocDCkCmhM
