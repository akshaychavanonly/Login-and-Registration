import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Profile</h1>
      <p>Full Name: {user.fullName}</p>
      <p>Email: {user.email}</p>
      <p>Mobile: {user.mobile}</p>
      {user.documents && (
        <div>
          <p>Documents:</p>
          <a
            href={`http://localhost:5000/${user.documents}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Document
          </a>
        </div>
      )}
    </div>
  );
};

export default Profile;
