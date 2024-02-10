import { Link } from "react-router-dom";


const Sell = (props) => {
  const { AssetID, District, Status, Upazila } = props.dt;
  console.log(props)
  return (

    <>
      {
        Status === 'registered' ? <tr><td>
          <div className="flex items-center gap-3">
            <div>
              <div className="font-bold">{AssetID}</div>

            </div>
          </div>
        </td>
          <td>
            {District}

          </td>
          <td>{Upazila}</td>
          <td>{Status}</td>
          <th>
                <Link to={`/profile/transfer-ownership/${AssetID}`}><button className="btn btn-ghost btn-sm">Sell Land</button></Link>
                
              </th>
          </tr> : ""
      }


    </>


  );
};

export default Sell;