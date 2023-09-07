import { Link } from 'react-router-dom';
import img from '../../assets/images/login/login.svg';
import { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvide';
import Swal from 'sweetalert2';

const SignUp = () => {

    const [error, setError] = useState('');

    const { createUser } = useContext(AuthContext)

    const handelSignUp = event => {
        event.preventDefault();

        setError('')

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: 'Successful!',
                    text: 'User Created Successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
                form.reset();
            })
            .catch(error => {
                console.log(error);
                setError(error.message)
                return;
            })

    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="w-1/2 mr-12">
                    <img src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-3xl text-center font-bold">Sign Up</h1>
                        <form onSubmit={handelSignUp}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" placeholder="name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <p className='text-center my-4'>Already Have an Account? <Link className='text-orange-600 text-1xl font-bold' to='/login'>Login</Link></p>
                        <p>{error}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;