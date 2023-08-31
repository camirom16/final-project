import React, { useContext } from "react";
import { UserContext } from "./UserContext"; // Adjust the path

const Profile = () => {
    const { currentUser } = useContext(UserContext);

    if (!currentUser) {
        return <p>Please log in to view your profile.</p>;
    }

    

    return (
        <div>
            <h2>Welcome, {currentUser.name}!</h2>
            {/* Profile content */}
        </div>
    );
};

export default Profile;