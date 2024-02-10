import toast, { Toaster } from "react-hot-toast";
import { url } from "../../Url";
import { useParams } from "react-router-dom";


const TransferOwner = () => {
    const params=useParams()
    console.log(params.AssetID)
    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const newOName = form.name.value;
        const newONID = form.nid.value;
        

        const info={newOName,newONID}

        
        fetch(`${url}/api/v1/user/application/transfer/${params.AssetID}`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              authorization: `${localStorage.getItem('token')}`,
              "ngrok-skip-browser-warning": "69420",
            },
            body: JSON.stringify(info)
          })
            .then(res => res.json())
            .then(data => {
                if(data.success){
                    toast.success('Successfully Transfer Land Ownership')
                }else{
                    toast.error('Failed to Transfer Land Ownership')
                }
              console.log('jomi response', data)
          
        
            })
    }
    return (
        <form onSubmit={handleSubmit} className=" w-4/5">
            <div className="bg-white w-full mt-8 shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-2xl leading-6 font-medium text-gray-900">
                        Transfer Ownership
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Give buyers information
                    </p>
                </div>
                <div className="border-t border-gray-200 ">
                    <dl>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-700">
                                Name
                            </dt>
                            <label className="form-control w-11/12 col-span-2">
                                <input type="text" name="name" placeholder="name"
                                    className="input input-bordered w-full " />
                            </label>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-700">
                                NID
                            </dt>
                            <label className="form-control w-11/12 col-span-2">
                                <input type="text" name="nid" placeholder="NID"
                                    className="input input-bordered w-full " />
                            </label>
                        </div>

                    </dl>



                </div>


            </div>
            <div className="flex justify-end">
                <input className="btn btn-neutral px-12   mb-2 mt-4" type="submit" value="Transfer OwnerShip" />
                <Toaster
                    position="top-center"
                    reverseOrder={true}
                />
            </div>
        </form>
    );
};

export default TransferOwner;