import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvide";
import Swal from "sweetalert2";


const CheckOut = () => {
    const services = useLoaderData();
    // console.log(services);

    const { title, _id, price, img } = services;
    const { user } = useContext(AuthContext);

    const handelBookService = event => {
        event.preventDefault();


        const form = event.target;

        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;
        const description = form.description.value;
        const booking = {
            customerName: name,
            email,
            date,
            img,
            services_id: _id,
            services_title: title,
            price: price,
            description: description
        }
        console.log(booking);

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'You are Successfully Booking',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
            })
    }

    return (
        <div>
            <h2>Book Services: {title}</h2>
            <form onSubmit={handelBookService}>
                <div className="card-body bg-base-200 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="name" defaultValue={user?.displayName} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Date</span>
                            </label>
                            <input type="date" placeholder="" name="date" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" defaultValue={user?.email} placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">price</span>
                            </label>
                            <input type="text" defaultValue={'$' + price} className="input input-bordered" />
                        </div>
                    </div>
                    <textarea placeholder="Product Description" name="description" className="textarea textarea-bordered w-full mt-6" >
                    </textarea>
                    <div className="form-control mt-6">
                        <input className="btn btn-block bg-red-400" type="submit" value="Submit" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CheckOut;