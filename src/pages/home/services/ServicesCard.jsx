import { Link } from "react-router-dom";

const ServicesCard = ({service}) => {
    const {_id, title, img, price} = service;
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="p-5">
                <img src={img} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className="text-orange-500 text-xl">Price: ${price}</p>
                <div className="card-actions">
                    <Link to={`/checkOut/${_id}`}>
                        <button className="btn btn-primary">Book Now</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServicesCard;