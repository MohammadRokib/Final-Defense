import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import { url } from "../../../Url";


const ResubmitApplication = () => {
    const data = useLoaderData();
    const [action, setAction] = useState(false)
    const { AssetID, PayTx, NEC, DagNo, District, Division, Upazila, KhatianNo, Mouza } = data.data;

    console.log('tik tak', data)
    const [formData, setFormData] = useState({
        dagNo: '',
        dist: '',
        div: '',
        khatianNo: '',
        mouza: '',
        payTx: '',
        upazila: '',
        nec: null,
    });

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'nec' ? files[0] : value,
        }));
    };

    const handleNewClick = event => {
        event.preventDefault();
        setAction(true)
        console.log(action)


    }
    const handleClick = e => {
        e.preventDefault();
        setAction(false)
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const apiUrl = `${url}/api/v1/user/application/resubmit/${AssetID}`; // Replace with your server's API endpoint

            const formDataObject = new FormData();
            formDataObject.append('dagNo', formData.dagNo);
            formDataObject.append('dist', formData.dist);
            formDataObject.append('div', formData.div);
            formDataObject.append('khatianNo', formData.khatianNo);
            formDataObject.append('mouza', formData.mouza);
            formDataObject.append('payTx', formData.payTx);
            formDataObject.append('upazila', formData.upazila);
            formDataObject.append('nec', formData.nec);

            console.log(formData)

            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formDataObject,
                headers: {

                    authorization: `${localStorage.getItem('token')}`,
                    "ngrok-skip-browser-warning": "69420",

                },
            });

            if (response.ok) {
                console.log('File uploaded successfully');
                toast.success('Application Submission Successfull!')
            } else {
                console.error('Failed to upload file');
                toast.error("Failed to Submit Application")
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
    return (

        <form onSubmit={handleSubmit} className="w-4/5 my-10">
            <div className="bg-white w-full mt-8 shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-2xl leading-6 font-medium text-gray-900">
                        Resubmit Application
                    </h3>

                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-700">
                                Dag/Plot Number
                            </dt>

                            {
                                !action ? <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                                    {DagNo}
                                </dd> : <label className="form-control w-11/12 col-span-2">
                                    <input type="text" name="dagNo" placeholder="dagPlot Number"  value={formData.dagNo}
                                       defaultValue={DagNo}  onChange={handleInputChange} className="input input-bordered w-full " />
                                </label>
                            }

                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-700">
                                District
                            </dt>

                            {
                                !action ? <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                                    {District}
                                </dd> : <label className="form-control w-11/12 col-span-2">
                                    <input type="text" name="dist" placeholder="district" value={formData.dist}
                                        onChange={handleInputChange} className="input input-bordered w-full " />
                                </label>
                            }

                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-700">
                                Division
                            </dt>

                            {
                                !action ? <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                                    {Division}
                                </dd> : <label className="form-control w-11/12 col-span-2">
                                    <input type="text" name="div" placeholder="division" value={formData.div}
                                        onChange={handleInputChange} className="input input-bordered w-full " />
                                </label>
                            }

                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-700">
                                Khatian Number
                            </dt>

                            {
                                !action ? <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                                    {KhatianNo}
                                </dd> : <label className="form-control w-11/12 col-span-2">
                                    <input type="text" name="khatianNo" placeholder="khatian Number" value={formData.khatianNo}
                                        onChange={handleInputChange} className="input input-bordered w-full " />
                                </label>
                            }

                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-700">
                                Mouza
                            </dt>

                            {
                                !action ? <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                                    {Mouza}
                                </dd> : <label className="form-control w-11/12 col-span-2">
                                    <input type="text" name="mouza" placeholder="Mouza" value={formData.mouza}
                                        onChange={handleInputChange} className="input input-bordered w-full " />
                                </label>
                            }

                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-700">
                                Payment Transaction
                            </dt>

                            {
                                !action ? <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                                    {PayTx}
                                </dd> : <label className="form-control w-11/12 col-span-2">
                                    <input type="text" name="payTx" placeholder="payment Transaction" value={formData.payTx}
                                        onChange={handleInputChange} className="input input-bordered w-full " />
                                </label>
                            }

                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-700">
                                Upazila
                            </dt>

                            {
                                !action ? <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                                    {Upazila}
                                </dd> : <label className="form-control w-11/12 col-span-2" >
                                    <input type="text" name="upazila" placeholder="upazila" value={formData.upazila}
                                        onChange={handleInputChange} className="input input-bordered w-full " />
                                </label>
                            }

                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-700">
                                NEC
                            </dt>

                            {
                                !action ? <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                                    {NEC}
                                </dd> : <label className="form-control w-full ">
                                    <input type="file" name="nec" placeholder="nec"
                                        onChange={handleInputChange} className="file-input file-input-bordered w-full " />
                                </label>
                            }

                        </div>




                    </dl>
                </div>
            </div>
            <div className="flex justify-end">
                {
                    !action ? <input className="btn btn-neutral px-12   my-6" type="submit" value="Edit" onClick={handleNewClick} /> : <div className="flex justify-end my-6">
                        <input className="btn btn-neutral px-12 mr-4" type="submit" value="Cancel" onClick={handleClick} />
                        <input className="btn btn-neutral px-12" type="submit" value="Update" />
                    </div>

                }

                <Toaster
                    position="top-center"
                    reverseOrder={true}
                />
            </div>

        </form>
    );
};

export default ResubmitApplication;


