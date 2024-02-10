import { useEffect, useState } from "react";
import { url } from "../../Url";
import Sell from "./Sell";



const MarketPlace = () => {
  const [data, setData] = useState([])

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
         
        } 
      })

  }, [])
  console.log(data)

    return (
        <div className="overflow-x-auto w-5/6 mt-8">

     
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
          {
            data.map(dt => <Sell dt={dt} key={dt.AssetID}></Sell> )
            // data.filter(dt =><Sell dt={dt} key={dt.AssetID}></Sell>)
         }
           
          </tbody>
        </table>
      </div>
    );
};

export default MarketPlace;