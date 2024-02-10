

const SmallCard = (props) => {
  const { Pending, Approved, Registered, Rejected } = props.stat;


  return (
    <div className="">
      <div className="card w-full bg-white shadow-xl border-b-2 border-t-2">
        <div className="card-body grid grid-cols-5">
          <div className="card-title text-center justify-center flex flex-col">
            <h2>All</h2>
            <h2>{Pending + Approved + Registered + Rejected}</h2>
          </div>


          <div className="card-title text-center justify-center flex flex-col">
            <h2>Pending</h2>
            <h2>{Pending}</h2>
          </div>

          <div className="card-title text-center justify-center flex flex-col">
            <h2>Rejected</h2>
            <h2>{Rejected}</h2>
          </div>

          <div className="card-title text-center justify-center flex flex-col">
            <h2>Approved</h2>
            <h2>{Approved}</h2>
          </div>

          <div className="card-title text-center justify-center flex flex-col">
            <h2>Registered</h2>
            <h2>{Registered}</h2>
          </div>
        </div>
      </div>


    </div>
  );
};

export default SmallCard;