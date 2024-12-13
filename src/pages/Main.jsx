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
    const [filterCriteria, setFilterCriteria] = useState(""); // Filter criteria
    const [searchQuery, setSearchQuery] = useState(""); // Search query
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
        setFilterCriteria(criteria);
        printSearchQuery(searchQuery);
    };

    // Handle Search Query
    function printSearchQuery(query) {
        setSearchQuery(query);
        let tempDatabase = allBusinesses.slice();
        tempDatabase.sort((a, b) => {
            let queryComparison = compareBuisnessesFromQuery(query, a, b)

            if (queryComparison !== 0) {
                return queryComparison;
            } else {
                switch (filterCriteria) {
                    
                    case "Name Z-A":
                        return b.business_name.localeCompare(a.business_name);
                    case "High to Low Ratings":
                        return (b.rating || 0) - (a.rating || 0);
                    case "Low to High Ratings":
                        return (a.rating || 0) - (b.rating || 0);
                    case "Date Added":
                        return new Date(b.date_added) - new Date(a.date_added); // Assuming `date_added` is part of the data
                    case "Name A-Z":
                    default:
                        return a.business_name.localeCompare(b.business_name);
                }
            }

        });
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
        printSearchQuery(searchQuery);
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

    return secondDescFrequency - firstDescFrequency;
}

export default Main;