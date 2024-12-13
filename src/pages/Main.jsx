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

    // Handle Sorting
    const handleSortChange = (criteria) => {
        let sortedData = [...filteredData];
        switch (criteria) {
            case "Name A-Z":
                sortedData.sort((a, b) => a.business_name.localeCompare(b.business_name));
                break;
            case "Name Z-A":
                sortedData.sort((a, b) => b.business_name.localeCompare(a.business_name));
                break;
            case "High to Low Ratings":
                sortedData.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            case "Low to High Ratings":
                sortedData.sort((a, b) => (a.rating || 0) - (b.rating || 0));
                break;
            case "Date Added":
                sortedData.sort((a, b) => new Date(b.date_added) - new Date(a.date_added)); // Assuming `date_added` is part of the data
                break;
            // case "Location":
            //     sortedData.sort((a, b) => a.location.localeCompare(b.location)); // Assuming `location` is part of the data
            //     break;
            default:
                sortedData = [...allBusinesses]; // Reset to default if no valid criteria
        }
        setFilteredData(sortedData);
    };

    // Handle Search Query
    function printSearchQuery(query) {
        let tempDatabase = allBusinesses.slice();
        tempDatabase.sort((a, b) => compareBuisnessesFromQuery(query, a, b));
        setFilteredData(tempDatabase);
    }


    const applyFilters = (filters) => {
        let updatedData = [...allBusinesses];

        // Filter by type
        if (filters.type.length > 0) {
            updatedData = updatedData.filter((business) =>
                filters.type.includes(business.type)
            );
        }

        // Filter by rating
        if (filters.rating.length > 0) {
            updatedData = updatedData.filter((business) =>
                filters.rating.includes(Math.floor(business.rating))
            );
        }

        setFilteredData(updatedData);
    };

    return (
        <div>
            <SearchBarComponent onSendSearchQuery={printSearchQuery} />
            <div className="columnContainer">
                <div className="container">
                    <SortComponent onSortChange={handleSortChange}/>
                </div>
            </div>
            <div className="container">
                <Filter_Bar onFilterChange={applyFilters}/>
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