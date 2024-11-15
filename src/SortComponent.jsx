import './SortComponent.css'

function SortComponent(){

    return(
        <div class="sorting">
            <label for="sort_component">Sort By:</label>
            <select name="sorting_criteria" class="sorting_criteria">    
                <option value="blank"> </option> 
                <option value="Name A-Z">Name (A-Z)</option>
                <option value="Name Z-A">Name (Z-A)</option>
                <option value="High to Low Ratings">High to Low Ratings</option>
                <option value="Low to High Ratings">Low to High Ratings</option>
                <option value="Location">Location</option>
                <option value="Date Added">Date Added</option>
            </select>
        </div>
    );
}

export default SortComponent;