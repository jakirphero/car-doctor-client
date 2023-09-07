import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg';
import { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvide';
import Swal from 'sweetalert2';

const Login = () => {

    const { signUp } = useContext(AuthContext);
    const [error, setError] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.form?.pathname || '/';

    const loginForm = event => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signUp(email, password)
            .then(result => {
                const user = result.user;
                const loggedUser = {
                    email: user.email
                }
                console.log(loggedUser);
                fetch('http://localhost:5000/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(loggedUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('jwt toke', data);

                        //note a secure store token
                        localStorage.setItem('car-access-token', data.token);

                        Swal.fire({
                            title: 'Successful!',
                            text: 'User Login Successfully',
                            icon: 'success',
                            confirmButtonText: 'Cool'
                        })

                        navigate(from, { replace: true })
                    })

                form.reset();
                
            })
            .catch(error => {

                console.log(error)
                setError(error.message)
                return;
            });

    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="w-1/2 mr-12">
                    <img src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-3xl text-center font-bold">Login</h1>
                        <form onSubmit={loginForm}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Login" />
                            </div>
                        </form>

                        <p className='text-center my-4'>New to Account? Please <Link className='text-orange-600 text-1xl font-bold' to='/signUp'>Sign Up</Link></p>
                        <p>{error}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;