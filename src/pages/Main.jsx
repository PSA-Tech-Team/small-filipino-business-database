import React, { useState, useEffect } from "react";
import SearchBarComponent from "../features/searching/SearchBar_Component.jsx";
import Filter_Bar from "../features/filtering/Filter_Bar.jsx";
import SortComponent from "../features/sorting/SortComponent";
import CardComponent from "../components/Card_Component";
import { fetchBusinesses } from "../lib/business";
import "../assets/Main.css";
import KMPSearch from "../util/KMPSearch"

function Main() {
    const [filteredData, setFilteredData] = useState([]); // Dynamic data
    const [allBusinesses, setAllBusinesses] = useState([]); // All fetched data

    // Fetch businesses on mount
    useEffect(() => {
        fetchBusinesses()
            .then(data => {
                setAllBusinesses(data);
                setFilteredData(data); // Initially show all businesses
            })
            .catch(error => console.error("API error:", error));
    }, []);

    // Handle Search Query
    function printSearchQuery(query) {
        let tempDatabase = allBusinesses.slice();
        tempDatabase.sort((a, b) => compareBuisnessesFromQuery(query, a, b));
        setFilteredData(tempDatabase);
    }

    return (
        <div>
            <SearchBarComponent onSendSearchQuery={printSearchQuery} />
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

// Generate Cards from Fetched Data
function parseDatabase(database) {
    return database.map(business => (
        <CardComponent
            key={business.business_id}
            buisnessName={business.business_name}
            rating={business.rating || "N/A"} // Assuming rating exists or provide fallback
            description={business.description}
        />
    ));
}

function compareBuisnessesFromQuery(searchQuery, firstBusiness, secondBusiness) {

    
    let firstTitleFrequency = KMPSearch.kmpSearch(searchQuery, firstBusiness.business_name.toLowerCase());
    let secondTitleFrequency = KMPSearch.kmpSearch(searchQuery, secondBusiness.business_name.toLowerCase());


    if (firstTitleFrequency > secondTitleFrequency) {
        return -1;
    } else if (firstTitleFrequency < secondTitleFrequency) {
        return 1;
    }


    let firstDescFrequency = KMPSearch.kmpSearch(searchQuery, firstBusiness.description.toLowerCase());
    let secondDescFrequency = KMPSearch.kmpSearch(searchQuery, secondBusiness.description.toLowerCase());


    if (firstDescFrequency !== 0) {
        console.log("First Desc Frequency: ", firstDescFrequency, secondDescFrequency, firstDescFrequency - secondDescFrequency);
    }
    return secondDescFrequency - firstDescFrequency;
}

export default Main;