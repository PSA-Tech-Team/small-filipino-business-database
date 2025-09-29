// import { useState } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../assets/Card_Component.css";
// import lorenIcon from "/loren_icon.jpg"; 

import axios from "axios";


function WebsitePreview({ websiteURL, width, height }) {
    const [previewData, setPreviewData] = useState(null);
    const [error, setError] = useState(false);
  
    useEffect(() => {
      const fetchPreview = async () => {
        try {
          // First attempt: Microlink
          const response = await axios.get(`https://api.microlink.io/?url=${websiteURL}`);
          if (response.data.status === "success" && response.data.data) {
            setPreviewData(response.data.data);
          } else {
            throw new Error("Microlink failed");
          }
        } catch (err) {
          console.warn("Microlink failed, falling back to LinkPreview:", err);
          try {
            // Fallback to LinkPreview
            const fallback = await axios.get(
              `https://api.linkpreview.net/?key=e5bdca318829c276ac3af7f898e07602&q=${encodeURIComponent(websiteURL)}`
            );
            setPreviewData({
              title: fallback.data.title,
              description: fallback.data.description,
              image: { url: fallback.data.image },
              url: fallback.data.url,
            });
          } catch (fallbackErr) {
            console.error("Both previews failed:", fallbackErr);
            setError(true);
          }
        }
      };
  
      fetchPreview();
    }, [websiteURL]);
  
    if (error) {
      return <p>Preview not available.</p>;
    }
  
    if (!previewData) return <p>Loading preview...</p>;

    return (
      <div
        className="website-preview"
        style={{
        //   border: "1px solid #ccc",
        //   padding: "10px",
        //   borderRadius: "20%",
        //   maxWidth: "300px"
        }}
      >
        {previewData.image?.url && (<img
          src={previewData.image.url}
          alt="Preview"
          style={{ width: `${width}px`, height: `${height}px`, borderRadius: "100%", marginBottom: "10px" }}
        />
          
        )}
      </div>
    );
  }
export {WebsitePreview};
  
function WebsiteIsInvalid(businessName) {
    let invalid = [
        "Adeling", "Amber Agave", "Bongga Co.", "Filipinta", "HaribyArt", "Kilig Candles Co.",
        "Masiramon Chicago", "Pinny Planet", "Sage Rose Co.", "Unreleased Grounds", "Wounded Healing Art",
        "YPArtistry", "Carina\'s Cupcakery", "Fernwood Barbers", "Ampilfied Apparel", "Chorva Co.",
        "843/Eight Four Three"
    ]
    return invalid.includes(businessName)
}

export {WebsiteIsInvalid};

function AddedIG(businessName) {
    let valid = [
        "Adeling", "Amber Agave", "Bongga Co.", "Carina\'s Cupcakery", 
        "Filipinta", "Kilig Candles Co.","Masiramon Chicago", "Pinny Planet", 
        "Sage Rose Co.", "Chorva Co.", "Wounded Healing Art", "YPArtistry",
        "Ampilfied Apparel", "Tita Mia\'s", "FOR US, DEAR", "Morena Collective",
        "Fernwood Barbers","Mutuc Clay Earrings", "Crochet Cama","Emma\'s Projects",
        "Tita Bun Collective"
        // "Andreen\'s Cookies", broken
        // "Loren\'s Macarons", err
    ]
    return valid.includes(businessName)
}

export {AddedIG};

function NoWebsiteOrIG(businessName) { 
    let l = [
        "Andreen\'s Cookies", "HaribyArt", "Unreleased Grounds"
    ]
    return l.includes(businessName)

}

export {NoWebsiteOrIG};

function InstagramBlockquoteEmbed({url, width, height}) {
    // Instagram's embed script only processes new blockquotes once when initially loaded
    // When the card is re-rendered due to sorting or filtering, those blockquotes are in
    // the DOM but Instagram doesn’t reprocess them.

    // Allows cards to re-render Instagram embeds after sorting
    useEffect(() => {
        // Load Instagram embed script if not already loaded
        if (!window.instgrm) {
          const script = document.createElement("script");
          script.src = "//www.instagram.com/embed.js";
          script.async = true;
          document.body.appendChild(script);
        } else {
          // Process the embed if the script is already loaded
          window.instgrm.Embeds.process();
        }
    
        // Also reprocess after a delay to make sure the DOM is ready
        const timeout = setTimeout(() => {
          if (window.instgrm?.Embeds?.process) {
            window.instgrm.Embeds.process();
          }
        }, 500); // Delay can help when rendering dynamically
    
        return () => clearTimeout(timeout);
      }, [url]);

    const html = `
      <blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/${url}/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style="background:#FFF; border:0; margin: 1px; max-height:${height}px; max-width:${width}px; min-width:326px; padding:0; width:100%;">
      <div style="padding:16px;">
        <a href="https://www.instagram.com/${url}/?utm_source=ig_embed&amp;utm_campaign=loading" style="background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank" rel="noopener noreferrer">
        Loading Instagram...
        </a>
      </div>
      </blockquote>
    `;
  
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }

export {InstagramBlockquoteEmbed};

function CardComponent({ businessName, rating, description, website, instagram}) {
    const [menuVisible, setMenuVisible] = useState(false);
    
    const navigate = useNavigate();
    const handleCardClick = () => {
        if (businessName[0] == "8") {
            navigate(`/business/${"843%2FEight%20Four%20Three"}`);
        } else {
            navigate(`/business/${businessName}`);
        }
        
      };

    function getStars(name) {
    let addOne = (name.length + 1) % 3; 
    return '★'.repeat(5 - addOne) + '☆'.repeat(addOne);
    }
    // const cleanedInstagram = instagram.substring(1);
    const cleanedInstagram = instagram?.toLowerCase().replace(/^@/, "").trim();
    return (
        // <Link to={`/business/${businessName}`}>
    <div className="card-wrapper">
      <div className="card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
        {/* Top section with different background */}
        
        <div className="card-top">
        <img
            className="card-image"
            src="https://img.icons8.com/ios-filled/50/shop.png"
            alt="Shop Icon"
            width="40"
            height="40"
        />
        <h1 className="card-business-name-top"><i>{businessName}</i></h1>
        </div>

  
        {/* Divider line */}
        <hr className="card-divider" />
  
        {/* Bottom section with business info */}
        <div className="card-content">
          {/* <p className="card-business-rating">Rating: {rating}</p> */}
          {/* <WebsitePreview websiteURL={website} /> */}
          {NoWebsiteOrIG(businessName) && (
            <div className="rotating">
                {(!website || WebsiteIsInvalid(businessName)) && (
                <div className="center-preview">
                    <WebsitePreview websiteURL={website} width={300} height={300}/>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <br/><br/><br/><br/><br/><br/>
                </div>
                )}
            </div>
            )}

        {instagram && businessName != "Loren\'s Macarons" &&  businessName != "843/Eight Four Three" 
        && businessName != "Andreen\'s Cookies" && (
            <div>
                <InstagramBlockquoteEmbed 
                url={cleanedInstagram} 
                width={540} 
                height={440} 
                />
                {/* <div class="loader"></div> */}
            </div>
        )}
        
        {businessName == "Loren\'s Macarons" && (
            <div className="center-preview" style={{marginTop:"-18px", zIndex: "-1"}}>
            <iframe src="https://drive.google.com/file/d/1Vi6WkMtNEcdqBeLFygy9zeoN5wTKZ0bm/preview" width="500" height="500"></iframe>
            </div>
        )}
        {businessName == "843/Eight Four Three" && (
            <div>
            <div className="center-preview" style={{marginTop:"0px"}}>
            <iframe src="https://drive.google.com/file/d/16lX4N2Je9hzYbs2O7ru3X2-iL1-E3q3k/preview" width="460" height="400"></iframe>
            </div>
            <br></br><br></br>
            </div>
        )}

        {businessName == "Andreen\'s Cookies" && (
            <div className="center-preview" style={{marginTop:"-359px"}}>
                <iframe src="https://drive.google.com/file/d/1fyBuYELVRvDgUPbHDj459l0eFEk2aSj-/preview" width="450" height="450"></iframe>
            </div>
        )}



          
          {/* {website && !WebsiteIsInvalid(businessName) && businessName != "Tita Bun Collective" && (
            <iframe 
            src={website}
            title={`${businessName} Preview`}
            width="101%"
            height="460px"
            zIndex="0"
            // transform="scale(0.1)"
            ></iframe>
        )} */}


          
        </div>
        {description.length >= 250 && (
            <div  className="card-about-wrapper">
            <b className="card-business-description" style={{ fontSize: "23px" }}>About:</b>
            <p className="card-business-description">
                {description?.substring(0, 250) + "... learn more"}
            </p>
            <div className="card-about">
                <button>Visit page</button>
            </div>
          </div>)}
          {description.length < 250 && 
          (<div className="card-about-wrapper">
            <b className="card-business-description" style={{ fontSize: "23px" }}>About:</b>
            <p className="card-business-description">
                {description}
            </p>
            <div className="card-about">
                <button type="button">Visit page</button>
            </div>
          </div>)
          }
        </div>
        
      </div>
      
    //   </Link>
    );
  }
  
export default CardComponent;
