import { useEffect, useState } from "react";
import { url } from "../../../Url";



const User = () => {
    const [data, setData] = useState([])
    const [action, setAction] = useState(false)
    const [reload, setReload] = useState(true)
  
    

  
  


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

    // console.log('user profile')
    // console.log(data)

    const handleSubmit = event => {
        event.preventDefault();
        setAction(true)
        console.log(action)


    }

    const handleClick = e => {
        e.preventDefault();
        setAction(false)
    }
    const handleSubmitting = event => {
        event.preventDefault();
        const form = event.target;
        const phone = form.phone.value;
        const addr = form.addr.value;
        const info = { phone, addr }
        console.log(phone, addr)

        fetch(`${url}/api/v1/user/profile/update`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `${localStorage.getItem('token')}`
            },
            body: JSON.stringify(info)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.data)
                setData(data.data)
                setAction(false)
            })
        setAction(true)
        setReload(!reload)


    }


    return (

        <form onSubmit={handleSubmitting} className="w-4/5">
            <div className="bg-white w-full mt-8 shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-2xl leading-6 font-medium text-gray-900">
                        User Profile
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Details and informations about user.
                    </p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-700">
                                Name
                            </dt>
                            <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                                {data.name}
                            </dd>

                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-700">
                                Nid
                            </dt>
                            <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                                {data.nid}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-700">
                                Email
                            </dt>
                            <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                                {data.email}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-700">
                                Phone
                            </dt>
                            {
                                !action ? <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                                    {data.phone}
                                </dd> : <label className="form-control w-4/5 col-span-2">
                                    <input type="text" name="phone" placeholder="Enter Your Phone Number"
                                      defaultValue={data.phone}  className="input input-bordered w-full " />
                                </label>

                            }
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-700">
                                Address
                            </dt>
                            {
                                !action ? <dd className="mt-1 text-lg text-gray-900  sm:mt-0 sm:col-span-2">
                                    {data.addr}
                                </dd> : <label className="form-control w-4/5 col-span-2">
                                    <input type="text" name="addr" placeholder="Enter Your Address"
                                      defaultValue={data.addr}  className="input input-bordered w-full " />
                                </label>


                            }
                        </div>
                    </dl>



                </div>




            </div>

            <div className="mt-4">
                {
                    !action ? <div className="flex justify-end"><input className="btn btn-neutral px-14  mb-2 " type="submit" value="Edit" onClick={handleSubmit} /> </div> : <div className="flex justify-end">
                        <input className="btn btn-neutral px-12 mr-4" type="submit" value="Cancel" onClick={handleClick} />
                        <input className="btn btn-neutral px-12" type="submit" value="Update" />
                    </div>

                }
            </div>

        </form>









    );
};

export default User;