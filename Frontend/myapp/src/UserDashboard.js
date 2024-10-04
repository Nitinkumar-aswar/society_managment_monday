import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserDashboard.css'; // Include your CSS file

const UserDashboard = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/userdashboard', {
                withCredentials: true, // Ensures that cookies are sent with the request
            });
            setUserData(response.data.user); // Store the user data in state
        } catch (err) {
            setError(err.response ? err.response.data.message : err.message);
        }
    };

    fetchData();
}, []);
useEffect(() => {
  const fetchData = async () => {
      try {
          const response = await axios.get('http://127.0.0.1:5000/userdashboard', {
              withCredentials: true, // Ensures that cookies are sent with the request
          });
          setUserData(response.data.user); // Store the user data in state
      } catch (err) {
          setError(err.response ? err.response.data.message : err.message);
      }
  };

  fetchData();
}, []);


    // Handle redirection if not logged in
    useEffect(() => {
      const isLoggedIn = sessionStorage.getItem('loggedin');
      if (!isLoggedIn) {
          window.location.href = '/login'; // Redirect to login if not logged in
      }
  }, []);
  

    return (
        <div>
            <header>
                <div className="left_area">
                    <img className="logo-img"
                        src="/society-logo.jpg"
                        width="60px"
                        height="40px"
                    />
                </div>
                <div className="right_area">
                    <a href="/logout" className="logout_btn">Logout</a>
                </div>
            </header>

            <div className="sidebar">
                <center>
                    <img src="Images/download.png" className="profile_image" alt="" />
                    <h4>{userData ? userData.name : 'Loading...'}</h4>
                </center>
                <a href="/dashboard" className="active"><i className="fas fa-desktop"></i><span>Dashboard</span></a>
                <a href="/noticebrd"><i className="fas fa-bullhorn"></i><span>Notice Board</span></a>
                <a href="/complaint"><i className="fas fa-envelope-open-text"></i><span>Register Complaint</span></a>
                <a href="/payment"><i className="fas fa-file-invoice-dollar"></i><span>Payment</span></a>
                <a href="/userphoto"><i className="fas fa-camera-retro"></i><span>Gallery</span></a>
            </div>

            <div className="content">
                <h1>Welcome to Dashboard</h1>
                {error && <p>{error}</p>}
                {userData && (
                    <div className="user-info">
                        <div className="col-div-3">
                            <div className="box">
                                <p>{userData.name}<br /><span>Your Username</span></p>
                                <i className="far fa-user fa-2x"></i>
                            </div>
                        </div>
                        <div className="col-div-3">
                            <div className="box">
                                <p>{userData.flatno || 'N/A'}<br /><span>Your Flat No.</span></p>
                                <i className="fas fa-home fa-2x"></i>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDashboard;
