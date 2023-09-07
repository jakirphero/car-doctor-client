import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvide";
import BookingTable from "./BookingTable";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const Bookings = () => {

    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    console.log(user.email);

    const url = `http://localhost:5000/bookings?email=${user?.email}`
    console.log(url)

    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('car-access-token')}`
            }
        })
            .then(res => res.json())
            .then(data => 
                {
                    if(!data.error){
                        setBookings(data)
                    }
                    else{
                        //logout and then navigate
                        navigate('/')
                    }
                }
            ) 
    }, [url, navigate])


    const handelDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't to Delete this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((proceed) => {
            if (proceed.isConfirmed) {
                fetch(`http://localhost:5000/bookings/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your booking has been deleted.',
                                'successfully!'
                            )

                            const remaining = bookings.filter(book => book._id !== id);
                            setBookings(remaining);

                        }
                    })
            }
        })
    }

    const handelBookingConfirm = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't to Confirm this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Confirm'
        }).then((proceed) => {
            if (proceed.isConfirmed) {
                fetch(`http://localhost:5000/bookings/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({status: 'Confirm'})
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.modifiedCount > 0) {
                            Swal.fire(
                                'Confirm!',
                                'Your Booking has been Confirm.',
                                'successfully!'
                            )
                            
                            const remaining = bookings.filter(book => book._id !== id);
                            const update = bookings.find(booking => booking._id === id);
                            update.status= 'Confirm'
                            const newBooking = [update, ...remaining];
                            setBookings(newBooking);
                        }
                    })
            }
        })
    }

    return (
        <div>
            <h2 className="text-6xl">{bookings.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="text-2xl font-bold">
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Images</th>
                            <th>Services</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking => <BookingTable
                                key={booking._id}
                                booking={booking}
                                handelDelete={handelDelete}
                                handelBookingConfirm={handelBookingConfirm}
                            ></BookingTable>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Bookings;