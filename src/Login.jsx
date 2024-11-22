import './Login.css'
function Login() {
  return (
    <div className='square'>
      <h1 className='login-text'>
        Login
        <br />
        <img className='Login_logo' src="https://www.psauiuc.org/wp-content/uploads/2024/09/Logo-no-words-no-circle-300x300.png"></img>
      </h1>
      <h2 className='username'>
        Username
        <br />
        <input type="text" id="Username"
      name="Username"></input>
      </h2>
      <h2 className='password'>
        Password
        <br />
        <input type="text" id="Password"
      name="Password"></input>
      </h2>
    </div>
  );
}

export default Login;

