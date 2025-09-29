import "../assets/BusinessPage_Component.css";
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
// Instead of fetching from the backend, import your local JSON file:
import businessesData from "../data/businesses.json";
import { WebsitePreview, AddedIG, WebsiteIsInvalid, InstagramBlockquoteEmbed, NoWebsiteOrIG} from "../components/Card_Component.jsx";

function BusinessPageComponent() {
  const { businessName } = useParams(); // Extract business name from the URL
  const [businessData, setBusinessData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [hours, setHours] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);  // For user authentication (if needed)

  // On mount, look up the business data from the JSON
  useEffect(() => {
    const business = businessesData.find(
      (b) => b.business_name === businessName
    );
    if (business) {
      setBusinessData(business);
      fetchReviews(business.business_id);
      fetchOperatingHours(business.business_id);
    } else {
      console.warn("Business not found:", businessName);
    }
  }, [businessName]);

  // Simulated fetchReviews (replace with real API call if available)
  const fetchReviews = (businessId) => {
    setReviews([
      { profile: 'Profile Name 1', rating: 4, title: 'Review Title', date: '2024-11-20', description: 'Review Description' },
      { profile: 'Profile Name 2', rating: 4, title: 'Review Title', date: '2024-11-20', description: 'Review Description' },
    ]);
  };

  // Simulated fetchOperatingHours
  const fetchOperatingHours = (businessId) => {
    const operatingHours = [
      { day: 'Mon', open: '8:00 AM', close: '6:00 PM' },
      { day: 'Tue', open: '8:00 AM', close: '6:00 PM' },
      { day: 'Wed', open: '8:00 AM', close: '6:00 PM' },
      { day: 'Thu', open: '8:00 AM', close: '6:00 PM' },
      { day: 'Fri', open: '8:00 AM', close: '7:00 PM' },
      { day: 'Sat', open: '9:00 AM', close: '5:00 PM' },
      { day: 'Sun', open: 'Closed', close: 'Closed' },
    ];
    setHours(operatingHours);
  };

  const handleImageClick = (index) => {
    if (businessData && businessData.images) {
      setCurrentImage(businessData.images[index]);
      setIsOpen(true);
    }
  };

  const isOpenNow = () => {
    if (!hours || hours.length === 0) return false;
    const currentHour = new Date().getHours();
    const currentDay = new Date().getDay();
    const todayHours = hours[currentDay];
    // Simplified example: assumes open/close times are in "HH:MM AM/PM" format and not "Closed"
    if (!todayHours.open.includes("Closed")) {
      const [openHourStr] = todayHours.open.split(":");
      const [closeHourStr] = todayHours.close.split(":");
      const openHour = parseInt(openHourStr, 10);
      const closeHour = parseInt(closeHourStr, 10);
      return currentHour >= openHour && currentHour <= closeHour;
    }
    return false;
  };

  if (!businessData) {
    return <div>Loading business data...</div>;
  }

  // Clean up the instagram username (remove leading '@', lowercase, and trim)
  const cleanedInstagram = businessData.instagram?.toLowerCase().replace(/^@/, "").trim();

  return (
    <div className="business-page">
      <table>
        <tr>
          <th>
      <div style={{width: "40vw"}}>
      <h1>{businessData.business_name}</h1>
      <br></br>
      <p>{businessData.description}</p>
      </div>
      {/* Image Gallery */}
      <div className="image-gallery">
        {businessData.images && businessData.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>

      {/* Contact Buttons */}
      <div className="contact-buttons">
        {/* Email Button */}
        {businessData.email && (
            <button onClick={() => window.location.href = `mailto:${businessData.email}`}>
                Email
            </button>
        )}
        
        {/* Website Button */}
        {businessData.website && (
            <button onClick={() => window.open(businessData.website, '_blank')}>
                Website
            </button>
        )}
        
        {/* Instagram Button */}
        {businessData.instagram && (
            <button onClick={() => {
                const username = businessData.instagram.startsWith('@') 
                    ? businessData.instagram.slice(1) // Remove '@' if present
                    : businessData.instagram;
                window.open(`https://instagram.com/${username}`, '_blank'); // Open in a new tab
            }}>
                Instagram
            </button>
        )}
      </div>
      </th>
      <th>
      {/* Optionally render an Instagram preview if applicable */}
      {businessData.instagram && AddedIG(businessData.business_name) && (
        <div style={{ transform: 'scale(1.5) translateY(-40px) translateX(0px)', transformOrigin: 'top left', marginRight: '20em', padding: '2em' }}>
          <InstagramBlockquoteEmbed 
            url={`${businessData.instagram.toLowerCase().replace(/^@/, "").trim()}`} 
            width={800}
            height={800}
          />
          </div>
      )}

      {(NoWebsiteOrIG(businessData.business_name) || businessData.business_name == "843/Eight Four Three") && (
            <div className="rotating">
                {(!businessData.website || WebsiteIsInvalid(businessData.business_name)) && (
                <div className="center-preview" style={{padding: "6em", width: "50vw"}}>
                    <WebsitePreview websiteURL={businessData.website} width={500} height={500}/>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <br/><br/><br/><br/><br/><br/>
                </div>
                )}
            </div>
        )}
      {businessData.business_name == "Loren\'s Macarons" && (
            <div className="center-preview" style={{marginTop:"-18px", zIndex: "-1", transform:"translateX(30px)"}}>
            <iframe src="https://drive.google.com/file/d/1Vi6WkMtNEcdqBeLFygy9zeoN5wTKZ0bm/preview" width="392" height="500"></iframe>
            </div>
        )}

      </th>
      </tr>
      </table>
      <br></br><br></br><br></br><br></br><br></br>
    </div>
  );
}

export default BusinessPageComponent;


// import "../assets/BusinessPage_Component.css";

// import React, { useState, useEffect } from 'react';
// import { useParams } from "react-router-dom";
// import { fetchBusinesses } from "../lib/business";
// import { AddedIG, WebsiteIsInvalid, InstagramBlockquoteEmbed} from "../components/Card_Component.jsx"

// function BusinessPageComponent () {

//   // const [filteredData, setFilteredData] = useState([]); // Dynamic data
//   // const [allBusinesses, setAllBusinesses] = useState([]); // All fetched data
//   const { businessName } = useParams(); // Extract business name from URL
//   const [filteredData, setFilteredData] = useState([]); // Dynamic data
//   const [allBusinesses, setAllBusinesses] = useState([]); // All fetched data
//   // const [businessData, setBusinessData] = useState(null); // Current business data
//   // const [reviews, setReviews] = useState([]);
//   // const [hours, setHours] = useState([]);
//   // const [authenticated, setAuthenticated] = useState(false); // To check if user is authenticated

//   // Fetch businesses on mount
//   useEffect(() => {
//       fetchBusinesses()
//           .then(data => {
//               setAllBusinesses(data);
//               setFilteredData(data); // Initially show all businesses
//           })
//           .catch(error => console.error("API error:", error));
//   }, []);

//   useEffect(() => {
//     if (filteredData.length > 0) {
//       const currentBusiness = filteredData.find(
//         (business) => business.business_name === businessName
//       );
//       if (currentBusiness) {
//         setBusinessData(currentBusiness);
//         fetchReviews(currentBusiness.business_id); // Fetch reviews for this business
//         fetchOperatingHours(currentBusiness.business_id); // Fetch operating hours
//       } else {
//         console.warn("Business not found:", businessName);
//       }
//     }
//   }, [filteredData, businessName]);

//   const [reviews, setReviews] = useState([]);
//   const [currentImage, setCurrentImage] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [hours, setHours] = useState([]);
//   const [businessData, setBusinessData] = useState({});
//   const [authenticated, setAuthenticated] = useState(false);  // To check if user is authenticated

//   // Simulate fetching data
//   useEffect(() => {
//     fetchBusinessData();
//     fetchReviews();
//     fetchOperatingHours();
//   }, []);

//   const fetchBusinessData = () => {
//     // Placeholder for business data fetch (e.g., from an API)
//     setBusinessData({
//       name: "Business Name",
//       description: "[DESCRIPTION] A small Filipino business.",
//       socialLinks: {
//         facebook: "https://facebook.com",
//         instagram: "https://instagram.com",
//       },
//       contact: {
//         phone: "+123456789",
//         email: "contact@smallfilipinobusiness.com",
//         website: "https://smallfilipinobusiness.com",
//       },
//       images: [
//         '/images/smallfilipinobusiness1.jpg',
//         '/images/smallfilipinobusiness2.jpg',
//         '/images/smallfilipinobusiness3.jpg'
//       ],
//     });
//   };

//   const fetchReviews = () => {
//     // Simulated reviews fetch
//     setReviews([
//       { profile: 'Profile Name 1', rating: 4, title: 'Review Title', date: '2024-11-20', description: 'Review Description' },
//       { profile: 'Profile Name 2', rating: 4, title: 'Review Title', date: '2024-11-20', description: 'Review Description' },
//     ]);
//   };

//   const fetchOperatingHours = () => {
//     // Simulate business operating hours data
//     const currentDay = new Date().getDay();
//     const hours = [
//       { day: 'Mon', open: '8:00 AM', close: '6:00 PM' },
//       { day: 'Tue', open: '8:00 AM', close: '6:00 PM' },
//       { day: 'Wed', open: '8:00 AM', close: '6:00 PM' },
//       { day: 'Thu', open: '8:00 AM', close: '6:00 PM' },
//       { day: 'Fri', open: '8:00 AM', close: '7:00 PM' },
//       { day: 'Sat', open: '9:00 AM', close: '5:00 PM' },
//       { day: 'Sun', open: 'Closed', close: 'Closed' },
//     ];
//     setHours(hours);
//   };

//   const handleImageClick = (index) => {
//     setCurrentImage(businessData.images[index]);
//     setIsOpen(true);
//   };

//   const isOpenNow = () => {
//     const currentHour = new Date().getHours();
//     const currentDay = new Date().getDay();
//     const todayHours = hours[currentDay];
//     const [openHour] = todayHours.open.split(':').map(Number);
//     const [closeHour] = todayHours.close.split(':').map(Number);
//     return currentHour >= openHour && currentHour <= closeHour;
//   };
//   // const cleanedInstagram = businessData.instagram?.toLowerCase().replace(/^@/, "").trim();
//   return (
//     <table>
//       <tr>
//       <th>
//     <div className="business-page">
//       <br></br><br></br>
//       <h1>{businessData.business_name}</h1>
//       <br></br>
//       <p>{businessData.description}</p>

//       {/* Image Gallery with Lightbox */}
//       <div className="image-gallery">
//         {businessData.images?.map((image, index) => (
//           <img
//             key={index}
//             src={image}
//             alt={`Image ${index + 1}`}
//             onClick={() => handleImageClick(index)}
//           />
//         ))}
        
//       </div>

//       {/* Contact and Action Buttons */}
//       <div className="contact-buttons">
//         {/* Email Button */}
//         {businessData.email && (
//             <button onClick={() => window.location.href = `mailto:${businessData.email}`}>
//                 Email
//             </button>
//         )}
        
//         {/* Website Button */}
//         {businessData.website && (
//             <button onClick={() => window.open(businessData.website, '_blank')}>
//                 Website
//             </button>
//         )}
        
//         {/* Instagram Button */}
//         {businessData.instagram && (
//             <button onClick={() => {
//                 const username = businessData.instagram.startsWith('@') 
//                     ? businessData.instagram.slice(1) // Remove '@' if present
//                     : businessData.instagram;
//                 window.open(`https://instagram.com/${username}`, '_blank'); // Open in a new tab
//             }}>
//                 Instagram
//             </button>
//         )}
//     </div>

//       {/* Social Media Links */}
//       <div className="social-media-links">
//         {/* <a href={businessData.socialLinks.facebook} target="_blank" rel="noopener noreferrer">Facebook</a> */}
//         {/* <a href={businessData.instagram} target="_blank" rel="noopener noreferrer">Instagram</a> */}
//       </div>
      
//       {/* Similar Businesses */}
//       {/* <div className="similar-businesses"> */}
//         {/* <h3 className="similar-businesses-title">Similar Businesses</h3> */}
//         {/* Placeholder for similar business data */}
//         {/* <div>Business 1</div>
//         <div>Business 2</div>
//         <div>Business 3</div> */}
//       {/* </div> */}
//     </div>
//     </th>
//     <th>
//     {businessData.instagram && AddedIG(businessName) && (
//       <div style={{ transform: 'scale(1.5) translateY(40px)', transformOrigin: 'top left', marginRight: '15em' }}>
//         <InstagramBlockquoteEmbed 
//           url={`${businessData.instagram.toLowerCase().replace(/^@/, "").trim()}`} 
//           width={800}
//           height={800}
//         />
//       </div>
//     )}


//         {businessData.website && !WebsiteIsInvalid(businessName) && businessName != "Tita Bun Collective" && (
//             <div className="halfPreview" style={{ transform: 'translateY(20px)'}}>
//             <iframe 
//             src={businessData.website}
//             title={`${businessData.business_name} Preview`}
//             width="101%"
//             height="300px"
//             zIndex="0"
//             // transform="scale(0.1)"
//             ></iframe>
//             </div>
//         )}
//     </th>
//     </tr>
//     <br></br>
//     </table>
    
//   );
// };


// export default BusinessPageComponent;

// {/*
// Operating Hours
//     Display the business’s hours of operation, ideally with a highlight on current open/closed status based on the current time.

// Description
//     Provide a description of the business

// Image Gallery
//     Show a gallery of images for the business, such as photos of the location, products, or services. Include a lightbox or zoom-in effect for better viewing.

// Social Media Links
//     Include links to the business’s social media pages so users can explore additional content or updates.

// Contact and Action Buttons
//     Add buttons for actions like calling, messaging, visiting the website, or sending an email. These should open the corresponding app or link directly.

// Reviews Section
//     Include a section for user reviews, allowing users to see overall ratings, read individual reviews, and 
//     possibly leave a review themselves if authenticated.
//     Each review should have: profile name, rating, title, date written, description

// Similar Businesses or Recommendations
//     Display related businesses or recommendations based on category or user preferences, helping users discover similar options.
// */}
