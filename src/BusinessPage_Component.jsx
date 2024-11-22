import "./BusinessPage_Component.css";

function ContactActionButtons() {
    return (
        <div>
            <a href="email address">Email</a>
            <h4>Call <button>+1 (234) 567-8900</button></h4>
            <a href="url">Visit Website</a>  
        </div>
    )
}

function SocialMediaLinks() {
    return (
        <div>

        </div>
    )
}

function ReviewComponent() {
    return (
        <div>
            
        </div>
    )
}

function Recommendations() {
    return (
        <div>

        </div>
    )
}

function BusinessPageComponent() {
    return (
        <div>
            <div className="top_section">
                <h2 className="business_name">Business Name</h2>
                <h4 className="business_hours">
                    Hours
                    <ul>
                        <li>Monday </li>
                        <li>Tuesday </li>
                        <li>Wednesday </li>
                        <li>Thursday </li>
                        <li>Friday </li>
                        <li>Saturday </li>
                        <li>Sunday </li>
                    </ul>
                </h4>
                <div className="contact_action_buttons"> 
                    <ContactActionButtons />
                </div>
                <div className="social_media_links">
                    <SocialMediaLinks />
                </div>
            </div>
            <div className="middle_section">
                <div className="business_description">
                    <h2>About</h2>
                    <p>Description goes here. Description goes here. Description goes here. Description goes here. Description goes here. Description goes here. Description goes here. Description goes here. Description goes here. Description goes here. Description goes here. Description goes here. </p>
                </div>
                <div className="image_gallery">
                
                </div>
            </div>
            <div className="reviews_section">
                <ReviewComponent />
            </div>
            <div className="similar_recommendations">
                <Recommendations />
            </div>
        </div>
    );
}

export default BusinessPageComponent;

{/*
Operating Hours
    Display the business’s hours of operation, ideally with a highlight on current open/closed status based on the current time.

Description
    Provide a description of the business

Image Gallery
    Show a gallery of images for the business, such as photos of the location, products, or services. Include a lightbox or zoom-in effect for better viewing.

Social Media Links
    Include links to the business’s social media pages so users can explore additional content or updates.

Contact and Action Buttons
    Add buttons for actions like calling, messaging, visiting the website, or sending an email. These should open the corresponding app or link directly.

Reviews Section
    Include a section for user reviews, allowing users to see overall ratings, read individual reviews, and 
    possibly leave a review themselves if authenticated.
    Each review should have: profile name, rating, title, date written, description

Similar Businesses or Recommendations
    Display related businesses or recommendations based on category or user preferences, helping users discover similar options.
*/}