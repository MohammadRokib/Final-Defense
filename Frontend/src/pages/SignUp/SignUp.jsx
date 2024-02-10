import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { url } from "../../Url";


const SignUp = () => {
    const { createuser } = useContext(AuthContext)
 
    const navigate = useNavigate()

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const addr = form.addr.value;
        const name = form.name.value;
        const phone = form.phone.value;
        const nid = form.nid.value;
        const email = form.email.value;
        const password = form.password.value;
        const user = {name,addr,phone,nid, email, password }
    
        createuser(email, password)
          .then(result => {
            const user = result.user;
            console.log(user)
          })
    
    
    
        console.log(user)
    
          fetch(`${url}/api/v1/auth/register`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(user)
          })
            .then(res => res.json())
            .then(data => {
            
              console.log('inside post response', data)
            
              navigate('/login')
        
            })
    
    
           
     
    
      }
    return (
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content w-full">
          <div className="text-center md:w-1/3 lg:text-left">
            <h1 className="text-4xl font-bold">PropertyBlock</h1>
            <p className="py-6 text-xl">Land registration system using permissioned Blockchain</p>
          </div>
          <div className="card md:w-1/2 shadow-2xl bg-base-100">
          <h2 className="text-2xl text-center font-bold mt-3">Create an Account</h2>
  
            <form onSubmit={handleLogin}  className="card-body w-4/5 ">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" name="name" placeholder="name" className="input input-bordered input-primary w-full " required />
  
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">NID</span>
                </label>
                <input type="text" name="nid" placeholder="nid" className="input input-bordered input-primary w-full " required />
  
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone</span>
                </label>
                <input type="text" name="phone" placeholder="phone" className="input input-bordered input-primary w-full " required />
  
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input type="text" name="addr" placeholder="address" className="input input-bordered input-primary w-full" required />
  
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" placeholder="email" className="input input-bordered input-primary w-full " required />
  
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" placeholder="password" className="input input-bordered input-primary w-full " required />
  
                
              </div>
              <div className="form-control mt-6">
  
                <input className="btn btn-primary" type="submit" value="Create an Account" />
              </div>
              <p className="text-center">Already have an Account? <Link to='/login' className='text-primary'>Please Login</Link> </p>
            </form>
            
          </div>
        </div>
      </div>
    );
};

export default SignUp;