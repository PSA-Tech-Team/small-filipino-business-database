import React, { useState, useEffect } from "react";
import SearchBarComponent from "../features/searching/SearchBar_Component.jsx";
import Filter_Bar from "../features/filtering/Filter_Bar.jsx";
import SortComponent from "../features/sorting/SortComponent";
import CardComponent from "../components/Card_Component";
import Header from "../layouts/Header"; 
import KMPSearch from "../util/KMPSearch";
import "../assets/Main.css";
// Import the JSON data directly:
import businessesData from "../data/businesses.json";

function Main() {
    const [filteredData, setFilteredData] = useState([]); // Dynamic data
    const [allBusinesses, setAllBusinesses] = useState([]); // All fetched data

    // "Fetch" businesses on mount by loading the local JSON
    useEffect(() => {
        // Here we're directly using the imported JSON data.
        console.log("Loaded businesses from JSON:", businessesData);
        setAllBusinesses(businessesData);
        setFilteredData(businessesData); // Initially show all businesses
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
                sortedData.sort((a, b) => (b.ratings || 0) - (a.ratings || 0));
                break;
            case "Low to High Ratings":
                sortedData.sort((a, b) => (a.ratings || 0) - (b.ratings || 0));
                break;
            case "Date Added":
                sortedData.sort((a, b) => new Date(b.date_added) - new Date(a.date_added));
                break;
            default:
                sortedData = [...allBusinesses]; // Reset to default if no valid criteria
        }
        setFilteredData(sortedData);
    };

    // Handle Search Query
    function printSearchQuery(query) {
        console.log("Query: ", query);
        if (query.trim() === "") {
            setFilteredData([...allBusinesses]);
            return;
        }
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
                filters.rating.includes(Math.floor(business.ratings))
            );
        }

        setFilteredData(updatedData);
    };

    return (
        <div>
            <Header onSendSearchQuery={printSearchQuery} />
            <br />
            <div className="container">
                <Filter_Bar onFilterChange={applyFilters} />
                <div className="cards">
                    {parseDatabase(filteredData)}
                </div>
            </div>
        </div>
    );
}

// Generate Cards from the JSON data
function parseDatabase(database) {
    console.log("Filtered data:", database);
    return database.map(business => (
        <CardComponent
            key={business.business_id}
            businessName={business.business_name}
            rating={business.ratings || "N/A"}
            description={business.description}
            website={business.website}
            instagram={business.instagram}
        />
    ));
}

function compareBuisnessesFromQuery(searchQuery, firstBusiness, secondBusiness) {
    let n1 = firstBusiness.business_name;
    let n2 = secondBusiness.business_name;
    let firstTitleFrequency = KMPSearch.kmpSearch(searchQuery, n1.toLowerCase());
    let secondTitleFrequency = KMPSearch.kmpSearch(searchQuery, n2.toLowerCase());

    if (firstTitleFrequency > secondTitleFrequency) {
        return -1;
    } else if (firstTitleFrequency < secondTitleFrequency) {
        return 1;
    }

    let firstDescFrequency = KMPSearch.kmpSearch(searchQuery, firstBusiness.description);
    let secondDescFrequency = KMPSearch.kmpSearch(searchQuery, secondBusiness.description);

    return secondDescFrequency - firstDescFrequency;
}

export default Main;


// import React, { useState, useEffect } from "react";
// import SearchBarComponent from "../features/searching/SearchBar_Component.jsx";
// import Filter_Bar from "../features/filtering/Filter_Bar.jsx";
// import SortComponent from "../features/sorting/SortComponent";
// import CardComponent from "../components/Card_Component";
// import { fetchBusinesses } from "../lib/business";
// import "../assets/Main.css";
// import Header from "../layouts/Header"; 
// import KMPSearch from "../util/KMPSearch"

// function Main() {
//     const [filteredData, setFilteredData] = useState([]); // Dynamic data
//     const [allBusinesses, setAllBusinesses] = useState([]); // All fetched data

//     // Fetch businesses on mount
//     useEffect(() => {
//         fetchBusinesses()
//             .then(data => {
//                 console.log("Fetched businesses:", data);
//                 setAllBusinesses(data);
//                 setFilteredData(data); // Initially show all businesses
//             })
//             .catch(error => console.error("API error:", error));
//     }, []);

//     // Handle Sorting
//     const handleSortChange = (criteria) => {
//         let sortedData = [...filteredData];
//         switch (criteria) {
//             case "Name A-Z":
//                 sortedData.sort((a, b) => a.business_name.localeCompare(b.business_name));
//                 break;
//             case "Name Z-A":
//                 sortedData.sort((a, b) => b.business_name.localeCompare(a.business_name));
//                 break;
//             case "High to Low Ratings":
//                 sortedData.sort((a, b) => (b.rating || 0) - (a.rating || 0));
//                 break;
//             case "Low to High Ratings":
//                 sortedData.sort((a, b) => (a.rating || 0) - (b.rating || 0));
//                 break;
//             case "Date Added":
//                 sortedData.sort((a, b) => new Date(b.date_added) - new Date(a.date_added)); // Assuming `date_added` is part of the data
//                 break;
//             // case "Location":
//             //     sortedData.sort((a, b) => a.location.localeCompare(b.location)); // Assuming `location` is part of the data
//             //     break;
//             default:
//                 sortedData = [...allBusinesses]; // Reset to default if no valid criteria
//         }
//         setFilteredData(sortedData);
//     };

//     // Handle Search Query
//     function printSearchQuery(query) {
//         console.log("Query: ", query);
//         if (query.trim() === "") {
//             setFilteredData([...allBusinesses]);
//             return;
//         }
//         let tempDatabase = allBusinesses.slice();
//         tempDatabase.sort((a, b) => compareBuisnessesFromQuery(query, a, b));
//         setFilteredData(tempDatabase);
//     }


//     const applyFilters = (filters) => {
//         let updatedData = [...allBusinesses];

//         // Filter by type
//         if (filters.type.length > 0) {
//             updatedData = updatedData.filter((business) =>
//                 filters.type.includes(business.type)
//             );
//         }

//         // Filter by rating
//         if (filters.rating.length > 0) {
//             updatedData = updatedData.filter((business) =>
//                 filters.rating.includes(Math.floor(business.rating))
//             );
//         }

//         setFilteredData(updatedData);
//     };

//     return (
//         <div>
//             {/* <SearchBarComponent onSendSearchQuery={printSearchQuery} /> */}
//             {/* <div className="columnContainer">
//                 <div className="container">
//                     <SortComponent onSortChange={handleSortChange}/>
//                 </div>
//             </div> */}
//             <Header onSendSearchQuery={printSearchQuery} />
//             <br></br>
//             <div className="container">
//                 <Filter_Bar onFilterChange={applyFilters}/>
//                 <div className="cards">
//                     {parseDatabase(filteredData)}
//                 </div>
//             </div>
//         </div>
//     );
// }

// // Generate Cards from Fetched Data
// function parseDatabase(database) {
//     console.log("Filtered data:", database);
//     return database.map(business => (
//         <CardComponent
//             key={business.business_id}
//             businessName={business.business_name}
//             rating={business.rating || "N/A"} // Assuming rating exists or provide fallback
//             description={business.description}
//             website={business.website}
//             instagram={business.instagram}
//         />
//     ));
// }

// function compareBuisnessesFromQuery(searchQuery, firstBuisness, secondBuisness) {
//     let n1 = firstBuisness.business_name
//     let n2 = secondBuisness.business_name
//     let firstTitleFrequency = KMPSearch.kmpSearch(searchQuery, n1.toLowerCase());
//     let secondTitleFrequency = KMPSearch.kmpSearch(searchQuery, n2.toLowerCase());

//     if (firstTitleFrequency > secondTitleFrequency) {
//         return -1;
//     } else if (firstTitleFrequency < secondTitleFrequency) {
//         return 1;
//     }

//     let firstDescFrequency = KMPSearch.kmpSearch(searchQuery, firstBuisness.description);
//     let secondDescFrequency = KMPSearch.kmpSearch(searchQuery, secondBuisness.description);

//     return secondDescFrequency - firstDescFrequency;
// }

// export default Main;
