
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/slice/UserLoginSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    console.log(user);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center mt-5">Profile</h2>
                    {user ? (
                        <div className="text-center">
                            <h3>Welcome, {user.username}!</h3>
                            <button className="btn btn-primary mt-4" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <p className="text-center">Please log in to view your profile.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
