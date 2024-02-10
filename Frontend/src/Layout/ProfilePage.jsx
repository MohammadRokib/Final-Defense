import { Link, Outlet, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";
import { GrDocumentUser } from "react-icons/gr";
import { BsBuildingUp } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { url } from "../Url";




const ProfilePage = () => {
  const [data, setData] = useState([])
  const { logOut } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleLogOut = () => {

    logOut()
      .then(() => {
        navigate('/login')
      })

  }


  useEffect(() => {
    fetch(`${url}/api/v1/user/profile`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
        "ngrok-skip-browser-warning": "69420",
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.data)
        setData(data.data)
      })

  }, [])



  return (
    <div>
      <div className="w-full navbar bg-white border-b-2">
        <h1 className="text-3xl font-bold px-10">PropertyBlock</h1>
        <div className="flex-1 px-2 mx-2"></div>

        <div className="flex-none hidden lg:block">
          <ul className="menu menu-horizontal mr-20">
            {/* Navbar menu content here */}

            <button className="btn btn-primary-content mr-2">{data.name}</button>
            <button className="btn btn-primary-content" onClick={handleLogOut}>LogOut</button>

          </ul>
        </div>
      </div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center">
          {/* Navbar content here */}

          {/* Page content here */}
          <Outlet></Outlet>
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>


        </div>
        {/* sidenavbar content here */}
        <div className="drawer-side  bg-white border-e-[3px]">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full 
          ">
            {/* Sidebar content here */}
            <li><Link to='/profile/dashboard' className="text-[#7994a1] mt-10 px-8 font-semibold text-base hover:bg-[#E8E9EB] hover:text-[#4F5762]"><RxDashboard className="text-xl" />Dashboard</Link></li>

            <li><Link to='/profile/register' className="text-[#7994a1] mt-2  px-8 font-semibold text-base hover:bg-[#E8E9EB] hover:text-[#4F5762]"><IoMdAdd className="text-xl" /> Register</Link></li>
            <li><Link to='/profile/allaplication' className="text-[#7994a1] mt-2 px-8 font-semibold text-base hover:bg-[#E8E9EB] hover:text-[#4F5762]"><GrDocumentUser className="text-xl" /> All Application</Link></li>
            <li><Link to='/profile/registered-land' className="text-[#7994a1] mt-2 px-8 font-semibold text-base hover:bg-[#E8E9EB] hover:text-[#4F5762]"><BsBuildingUp className="text-xl" />Registered Land</Link></li>
            <li><Link to='/profile/user' className="text-[#7994a1] mt-2 px-8 font-semibold text-base hover:bg-[#E8E9EB] hover:text-[#4F5762]"><CgProfile className="text-xl" /> Profile</Link></li>



          </ul>

        </div>
      </div>
    </div>





  );
};

export default ProfilePage;