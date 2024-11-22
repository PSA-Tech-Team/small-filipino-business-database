import { Link } from "react-router-dom";
import "./Card_Component.css";

function CardComponent( {buisnessName, rating, description} ) {
    return (
        <Link to="/business">
        <button className="card" type="button" onclick="document.getElementById('card-settings-menu').style.display='block'">
            <div>
                <img className='card-image' src="https://www.psauiuc.org/wp-content/uploads/2024/09/Logo-no-words-no-circle-300x300.png" alt="Philippine Student Association Logo" style={{width: '100%'}}/>
                <button id="card-settings-button" class="card-settings-button" aria-label="Settings" type="button" onclick="document.getElementById('card-settings-menu').style.display='block'">
                    <span class="card-settings-button-dot"></span>
                    <span class="card-settings-button-dot"></span>
                    <span class="card-settings-button-dot"></span>
                </button>
                <div id="card-settings-menu" class="card-settings-menu">
                    <h3>Settings</h3>
                    <button id="close-button">Close</button>
                </div>
                <script>
                    {/* const card-settings-button = document.getElementById('card-settings-button');
                    const settingsmenu = document.getElementById('settings-menu');
                    const close-button = document.getElementById('close-button');

                    settings-button.addEventListener('click', () => {
                        settingsmenu.style.display = settings-menu.style.display === 'block' ? 'none' : 'block'
                    });

                    close-button.addEventListener('click', () => {
                        settingsmenu.style.display = 'none'
                    }); */}
                </script>
                <div>
                    <h1 className="card-business-name">
                        {buisnessName}
                    </h1>
                </div>
                <div>
                    <p className="card-business-rating">
                        Rating: {rating}
                    </p>
                </div>
                <div>
                    <p className="card-business-description">
                        {description}
                    </p>
                </div>
            </div>
        </button>
        </Link>
    );
}

export default CardComponent;