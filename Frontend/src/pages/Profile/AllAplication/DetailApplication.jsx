import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { url } from "../../../Url";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";



const DetailApplication = () => {

    const data = useLoaderData()
    const navigate = useNavigate()
    console.log(data)

    // useEffect(() => {
    //     if (data.empty) {
    //         navigate('/profile/notfound')

    //     }
    // }, [])

    let AssetID, OwnerName, OwnerNID, PayTx, Status, NEC, DagNo, District, Division, Upazila, KhatianNo, DeedID, Mouza, MOL, LRO, Comment;
    if (data.empty) {
        navigate('/profile/notfound')
    } else {
        AssetID = data.data.AssetID;
        OwnerName = data.data.OwnerName;
        OwnerNID = data.data.OwnerNID;
        PayTx = data.data.PayTx;
        Status = data.data.Status;
        NEC = data.data.NEC;
        DagNo = data.data.DagNo;
        District = data.data.District;
        Division = data.data.Division;
        Upazila = data.data.Upazila;
        KhatianNo = data.data.KhatianNo;
        DeedID = data.data.DeedID;
        Mouza = data.data.Mouza;
        MOL = data.data.Authenticators[0];
        LRO = data.data.Authenticators[1];
        Comment = data.data.Comment;
    }


    const [comment, setComment] = useState('')

    const [pdfBlob, setPdfBlob] = useState(null);
    let fileName, link;

    const [role, setRole] = useState('')

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

    const downloadDeed = async (e) => {
        e.preventDefault();

        link = `${url}/api/v1/user/application/download/${AssetID}`

        fetch(link, {
            method: "GET",
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
                "ngrok-skip-browser-warning": "69420",
            },
        })
            .then((response) => response.blob())
            .then((blob) => {
                setPdfBlob(blob);
                
            })
            .catch((error)=>{
                console.log(error.message)
            })
            ;
            
    }

    const handleDownloadNec = async (e) => {
        e.preventDefault();

        link = `${url}/api/v1/user/application/download/nec/${AssetID}`

        fetch(link, {
            method: "GET",
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
                "ngrok-skip-browser-warning": "69420",
            },
        })
            .then((response) => response.blob())
            .then((blob) => {
                setPdfBlob(blob);
            });
    };

    useEffect(() => {
        if (pdfBlob) {
            const url = window.URL.createObjectURL(new Blob([pdfBlob]));
            const link = document.createElement("a");
            link.href = url;
            console.log(fileName)
            link.setAttribute("download", `${OwnerNID}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        }
    }, [pdfBlob]);

    const handleInput = e => {

        setComment(e.target.comment.value)
        console.log(comment)
    }

    const handleApprove = event => {
        event.preventDefault();
        fetch(`${url}/api/v1/user/application/verify/${AssetID}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `${localStorage.getItem('token')}`,
                "ngrok-skip-browser-warning": "69420",
            },
            body: JSON.stringify({ comment: "", response: true })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success('Successfully toasted!')
                navigate('/profile/allaplication')

            })
    }
    const handleReject = async event => {
        event.preventDefault();


        fetch(`${url}/api/v1/user/application/verify/${AssetID}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `${localStorage.getItem('token')}`,
                "ngrok-skip-browser-warning": "69420",
            },
            body: JSON.stringify({ comment: comment, response: false })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success('Successfully toasted!')
                navigate('/profile/allaplication')
            })
    }


    return (<>
        <form className="w-4/5">
            <div className="bg-white w-full mt-8 shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-2xl leading-6 font-medium text-gray-900">
                        Application Info
                    </h3>

                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-700">
                                Application ID
                            </dt>
                            <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                                {AssetID}
                            </dd>

                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-700">
                                Owner Name
                            </dt>
                            <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                                {OwnerName}
                            </dd>

                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-700">
                                Owner ID
                            </dt>
                            <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                                {OwnerNID}
                            </dd>

                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-700">
                                Payment Transaction ID
                            </dt>
                            <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                                {PayTx}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-700">
                                Status
                            </dt>
                            <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                                {Status}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-700">
                                NEC
                            </dt>
                            <dd className="mt-1 text-lg text-gray-900 sm:mt-0 ">
                                {NEC}
                            </dd>
                            <dd className="mt-1 text-lg text-gray-900 sm:mt-0 flex justify-end">
                                <input className="btn btn-neutral px-12" type="submit" value="Download NEC" onClick={handleDownloadNec} />
                            </dd>


                        </div>
                    </dl>



                </div>




            </div>

        </form>
        <form className="w-4/5 mt-10">
            <div className="bg-white w-full mt-8 shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-2xl leading-6 font-medium text-gray-900">
                        Land Info
                    </h3>

                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-700">
                                Division
                            </dt>
                            <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                                {Division}
                            </dd>

                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-700">
                                District
                            </dt>
                            <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                                {District}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-700">
                                Upazila
                            </dt>
                            <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                                {Upazila}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-700">
                                Mouza
                            </dt>
                            <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                                {Mouza}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-700">
                                Khatian Number
                            </dt>
                            <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                                {KhatianNo}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-700">
                                Dag/Plot Number
                            </dt>
                            <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                                {DagNo}
                            </dd>
                        </div>
                    </dl>



                </div>




            </div>

        </form>
        <form className="w-4/5 my-10">
            <div className="bg-white w-full mt-8 shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-2xl leading-6 font-medium text-gray-900">
                        Deed Info
                    </h3>

                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-700">
                                Deed ID
                            </dt>
                            <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                                {DeedID}
                            </dd>

                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-700">
                                Authenticators
                            </dt>
                            <dd className="mt-1 text-lg text-gray-900 sm:mt-0">
                                <u>Ministry of Land</u>
                            </dd>
                            <dd className="mt-1 text-lg text-gray-900 sm:mt-0">
                                <u>Land Revenue Office</u>
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-700">
                                <p>&nbsp;&nbsp;&nbsp;</p>
                            </dt>
                            <dd className="mt-1 text-lg text-gray-900 sm:mt-0">
                                {MOL}
                            </dd>
                            <dd className="mt-1 text-lg text-gray-900 sm:mt-0">
                                {LRO}
                            </dd>
                        </div>

                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-700">
                                Official Statement
                            </dt>
                            <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                                {Comment}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-700">

                            </dt>
                            <dd className="mt-1 text-lg text-gray-900 sm:mt-0">

                            </dd>
                            <dd className="mt-1 text-lg text-gray-900 sm:mt-0 flex justify-end">
                                <input className="btn btn-neutral px-12" type="submit" value="Download Deed" onClick={downloadDeed} />
                            </dd>
                        </div>

                    </dl>
                </div>
            </div>

        </form>
        {
            role !== 'user' ? <div className="my-10 w-4/5">
                <label className="form-control ">

                    <textarea className="textarea textarea-bordered h-24" placeholder="Add Comment" name="comment" onChange={handleInput}></textarea>
                </label>
                <div className="flex justify-end mt-5">
                    <input className="btn btn-error px-12 mr-4" type="submit" value="Reject" onClick={handleReject} />
                    {
                        role === 'mol' ? <input className="btn btn-neutral px-12" type="submit" value="Approve" onClick={handleApprove} /> : <input className="btn btn-neutral px-12" type="submit" value="Register" onClick={handleApprove} />
                    }

                    <Toaster
                        position="top-center"
                        reverseOrder={true}
                    />

                </div>
            </div> :    <div className="my-4 w-4/5 flex justify-end">{Status === 'rejected' ? <Link to={`/profile/resubmit/${AssetID}`}><input className="btn btn-neutral px-12" type="submit" value="Resubmit" /></Link>  :""}</div>
           
    
        }

    

    </>

    );
};

export default DetailApplication;