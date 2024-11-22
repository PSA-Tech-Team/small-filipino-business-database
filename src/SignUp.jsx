import './SignUp.css';

function SignUp() {
    return (
        <div>
            {/* dude wtf is going on */}
            <h2 className="head"> Sign Up </h2>

            <div className="field_label">
                <label>
                    Username:
                    <input className="text_input" type="username" placeholder="Username"/>
                </label>
            </div>
            <div className="field_label">
                <label>
                    Password:
                    <input className="text_input" type="password" placeholder="Password"/>
                </label>
            </div>
            <div className="field_label">
                <label>
                    Confirm Password:
                    <input className="text_input" type="confirmation" placeholder="Confirm Password"/>
                </label>
            </div>
            <div className="field_label">
                <label>
                    Email:
                    <input className="text_input" type="email" placeholder="Email"/>
                </label>
            </div>
            <button className="create_button">Create Account</button>


        </div>
    );
}

export default SignUp;