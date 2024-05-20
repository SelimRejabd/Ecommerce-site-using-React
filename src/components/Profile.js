import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserDetails, updateUserDetails } from '../features/slice/UserDetailsSlice';
import { loginUser, logout } from '../features/slice/UserLoginSlice';


const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading, error } = useSelector((state) => state.userDetails);
    const { user: loggedInUser } = useSelector((state) => state.user);
    console.log(user);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    useEffect(() => {
        if (!loggedInUser) {
            navigate('/login');
        } else {
            dispatch(fetchUserDetails());
        }
    }, [loggedInUser, dispatch, navigate]);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                password: '',
                confirmPassword: '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
        } else {
            dispatch(updateUserDetails({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            }));
        }
    };

    useEffect(() => {
        if (user) {
          dispatch(
            loginUser({ username: formData.email, password: formData.password })
          );
        }
      }, [user,formData, dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const renderErrorMessage = (error) => {
        if (typeof error === 'string') {
            return error;
        } else if (typeof error === 'object' && error !== null) {
            return error.detail || JSON.stringify(error);
        }
        return 'An unexpected error occurred';
    };


    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className="text-center">Profile</h2>
                    <p className="text-center">Update your profile</p>
                    <form onSubmit={handleSubmit} className="mt-4">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                className="form-control"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mt-4 w-100" disabled={loading}>
                            {loading ? 'Updating...' : 'Update Profile'}
                        </button>
                        {error && <div className="alert alert-danger mt-3">{renderErrorMessage(error)}</div>}
                        <button type="button" className="btn btn-secondary mt-3 w-100" onClick={handleLogout}>
                            Logout
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
