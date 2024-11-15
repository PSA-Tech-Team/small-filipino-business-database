import { useState } from 'react'
import './Filter_Bar.css'
function Filter_Bar() {    
      return (
        <div className='filter'>
          <h1>Filter Categories</h1>
          <h3>Type of Business</h3>
            <input type="checkbox"></input>
            <label> Food/Drink </label>
            <br></br>

            <input type="checkbox"></input>
            <label> Clothing/Accessories </label>
            <br></br>

            <input type="checkbox"></input>
            <label> Arts/Crafts/Decor </label>
            <br></br>

            <input type="checkbox"></input>
            <label> ETC </label>
            <br></br>

          <h3>Rating</h3>
            <input type="checkbox"></input>
            <label> 5 Stars </label>
            <br></br>

            <input type="checkbox"></input>
            <label> 4 Stars </label>
            <br></br>

            <input type="checkbox"></input>
            <label> 3 Stars </label>
            <br></br>

            <input type="checkbox"></input>
            <label> 2 Stars </label>
            <br></br>

            <input type="checkbox"></input>
            <label> 1 Stars </label>
            <br></br>

            <input type="checkbox"></input>
            <label> 0 Stars </label>
            <br></br>

            {/* Do this for more types */}
            {/* Clean up the filter bar */}
            {/* Add functionality with JavaScript */}
        </div>
      );
}

export default Filter_Bar;