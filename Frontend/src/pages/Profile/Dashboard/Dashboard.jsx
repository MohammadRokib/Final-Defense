import { useEffect, useState } from "react";
import { url } from "../../../Url";
import SmallCard from "./SmallCard";
import TableData from "./TableData";




const Dashboard = () => {

  const [data, setData] = useState([])
  const [stat, setStat] = useState({})
  const [role,setRole]=useState('')

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
        setRole(data.data.type)
    })


  useEffect(() => {
    fetch(`${url}/api/v1/user/dashboard?limit=${10}`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
        "ngrok-skip-browser-warning": "69420",
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (!data.empty) {
          setData(data.data)
          setStat(data.stat)
        } else {
          data.stat = {
            Pending: 0,
            Rejected: 0,
            Registered: 0,
            Approved: 0
          }
          setStat(data.stat)
        }

      })

  }, [])
  console.log(data,role)
  console.log(stat)

  return (

    <div className="overflow-x-auto w-5/6 mt-8">
      {
        role==='user'?<SmallCard stat={stat}></SmallCard> :''
      }

      
      <table className="table mt-12">
        {/* head */}
        <thead className="font-bold text-lg">
          <tr>
            <th>Application ID</th>
            <th>District</th>
            <th>Upazila</th>
            <th>Status</th>

          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
         {
            data.map(dt => <TableData dt={dt} key={dt.AssetID}></TableData> )
         }
  
        </tbody>
      </table>
    </div>

  );
};

export default Dashboard;