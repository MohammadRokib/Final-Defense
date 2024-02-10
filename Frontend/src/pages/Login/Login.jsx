import { Link, useNavigate } from "react-router-dom";
import { url } from "../../Url";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";





// const url=import.meta.env.BASE_URL;
const Login = () => {
  const { signIn } = useContext(AuthContext)
 
  const navigate = useNavigate()
 


  const handleLogin = e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const user = { email, password }


    signIn(email, password)
      .then(result => {
        const user = result.user;
        console.log(user)
      })



    console.log(user)

      fetch(`${url}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(res => res.json())
        .then(data => {
          const token = data.token;
          localStorage.setItem('token', token)
          console.log('inside post response', data)
        
          navigate('/profile/dashboard')
    
        })


       
 

  }
 

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content  ">
        <div className="text-center md:w-1/2 lg:text-left">
          <h1 className="text-4xl font-bold">PropertyBlock</h1>
          <p className="py-6 text-xl">Land registration system using permissioned Blockchain</p>
        </div>
        <div className="card md:w-1/2 w-full max-w-sm shadow-2xl bg-base-100">
        <h2 className="text-2xl text-center font-bold mt-3">Please Login</h2>

          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" name="email" placeholder="email" className="input input-bordered input-primary w-full max-w-xs" required />

            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" name="password" placeholder="password" className="input input-bordered input-primary w-full max-w-xs" required />

              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div className="form-control mt-6">

              <input className="btn btn-primary" type="submit" value="Login" />
            </div>
            <p>Dont have an Account? <Link to='/signup' className='text-primary'>Create New Account</Link> </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;