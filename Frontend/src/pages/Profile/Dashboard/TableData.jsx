import { Link } from "react-router-dom";



const TableData = (props) => {
    const { AssetID, District, Status, Upazila } = props.dt;
    console.log(Upazila, District)
    let result = AssetID.substring(1,10);
   



    return (
        <tr>
            <td>
                <div className="flex items-center gap-3">
                    {/* <div className="tooltip tooltip-right" data-tip={AssetID}>
                        <div className="font-bold">{AssetID}</div>
                    </div> */}
                    <div className="tooltip" data-tip={AssetID}>
                        <div className="font-bold">{result}</div>

                    </div>
                </div>
            </td>
            <td>
                {District}

            </td>
            <td>{Upazila}</td>
            <td>{Status}</td>
            <th>
                <Link to={`/profile/application/${AssetID}`}><button className="btn btn-ghost btn-sm">details</button></Link>
                
              </th>

        </tr>
    );
};

export default TableData;