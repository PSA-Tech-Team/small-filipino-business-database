import BusinessPageComponent from "./BusinessPage_Component";
import CardComponent from "./Card_Component"
import Filter_Bar from "./Filter_Bar";
import SearchBarComponent from "./SearchBar_Component";
import SortComponent from "./SortComponent";
import "./Main.css";
import React, { useState } from "react";

let testDatabase = [
        { buisnessName: "Bob's Burgers", rating: 4.5, description: "A burger joint that sells burgers with a unique twist." },
    { buisnessName: "Freddy Fazbear's Pizza", rating: 3.2, description: "A creepy pizza place with animatronic entertainment." },
    { buisnessName: "Chick-fil-a", rating: 4.8, description: "A fast food chain famous for their fried chicken sandwiches." },
    { buisnessName: "McDonald's", rating: 2.3, description: "An iconic fast food chain serving burgers, fries, and shakes." },
    { buisnessName: "Taco Bell", rating: 3.8, description: "Fast food with a variety of Mexican-inspired options like tacos and burritos." },
    { buisnessName: "Wendy's", rating: 3.7, description: "A fast food chain known for fresh, never frozen beef burgers." },
    { buisnessName: "Subway", rating: 4.1, description: "Build your own sandwiches with fresh ingredients and healthy options." },
    { buisnessName: "Pizza Hut", rating: 4.2, description: "Known for delicious pizza, pasta, and the iconic stuffed crust." },
    { buisnessName: "KFC", rating: 4.0, description: "Fried chicken chain with secret seasoning and classic sides." },
    { buisnessName: "Starbucks", rating: 4.5, description: "The go-to coffeehouse for specialty drinks and pastries." },
    { buisnessName: "Burger King", rating: 3.9, description: "Flame-grilled burgers and iconic Whoppers." },
    { buisnessName: "Dunkin' Donuts", rating: 4.3, description: "Famous for coffee and donuts, breakfast sandwiches, and more." },
    { buisnessName: "Chipotle", rating: 4.4, description: "Mexican cuisine with customizable burritos, tacos, and bowls." },
    { buisnessName: "Domino's Pizza", rating: 4.0, description: "Delivery chain offering a variety of pizzas, pasta, and more." },
    { buisnessName: "Five Guys", rating: 4.6, description: "Burgers, fries, and shakes made fresh to order in a fast-casual setting." },
    { buisnessName: "In-N-Out Burger", rating: 4.7, description: "Famous for fresh, high-quality burgers and secret menu items." },
    { buisnessName: "Panera Bread", rating: 4.2, description: "Casual dining chain with sandwiches, soups, and salads." },
    { buisnessName: "Shake Shack", rating: 4.5, description: "Modern burger joint with a focus on quality ingredients and milkshakes." },
    { buisnessName: "Raising Cane's", rating: 4.6, description: "Specializing in fried chicken tenders and delicious sides." },
    { buisnessName: "Jack in the Box", rating: 3.5, description: "Fast food with a quirky selection of burgers, tacos, and breakfast items." },

] 




function Main() {
    const [filteredData, setFilteredData] = useState(testDatabase);

    function printSearchQuery(query) {
        console.log("Query: ", query);

        let tempDatabase = testDatabase.slice();
        
        tempDatabase.sort((a, b) => compareBuisnessesFromQuery(query, a, b));
        console.log("Sorted Database: ", tempDatabase);
        setFilteredData(tempDatabase);
    }

    return (
        <div>
            <SearchBarComponent onSendSearchQuery={printSearchQuery}/>
            <div className="columnContainer">
                <div className="container">
                    <SortComponent /> 
                </div>
                
            </div>
            <div className="container">
                <Filter_Bar />
                <div className="cards">
                    {parseDatabase(filteredData)}
                </div>
            </div>
        </div>
    );
}

function parseDatabase(database) {
    let cards = [];
    for (let i = 0; i < database.length; i++) {
        cards.push(<CardComponent 
                buisnessName={database[i].buisnessName} 
                rating={database[i].rating} 
                description={database[i].description}
            />);
    }
    return cards;
}



function compareBuisnessesFromQuery(searchQuery, firstBuisness, secondBuisness) {
    let firstTitleFrequency = countFrequencyOfSubstring(searchQuery, firstBuisness.buisnessName);
    let secondTitleFrequency = countFrequencyOfSubstring(searchQuery, secondBuisness.buisnessName);

    if (firstTitleFrequency > secondTitleFrequency) {
        return -1;
    } else if (firstTitleFrequency < secondTitleFrequency) {
        return 1;
    }

    let firstDescFrequency = countFrequencyOfSubstring(searchQuery, firstBuisness.description);
    let secondDescFrequency = countFrequencyOfSubstring(searchQuery, secondBuisness.description);

    if (firstDescFrequency > secondDescFrequency) {
        return -1;
    } else if (firstDescFrequency < secondDescFrequency) {
        return 1;
    }

    let firstRating = firstBuisness.rating;
    let secondRating = secondBuisness.rating;

    if (firstRating > secondRating) {
        return -1;
    } else if (firstRating < secondRating) {
        return 1;
    }

    return 0;
}

function countFrequencyOfSubstring(inputSubstring, toCount) {
    inputSubstring = inputSubstring.trim().toLowerCase();
    toCount = toCount.trim().toLowerCase();
    let inputSubstringLen = inputSubstring.length;
    let toCountLen = toCount.length;
    let end = toCountLen - inputSubstringLen + 1;
    if (end < 0) return 0;
    let ret_val = 0

    for (let i = 0 ; i < end; i++) {
        let toCompare = toCount.substring(i, i + inputSubstringLen);
        if (toCompare === inputSubstring) ret_val++;
    }

    return ret_val;
}


export default Main;