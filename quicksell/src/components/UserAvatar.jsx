
import profile1 from "../Assets/profile1.png";
import profile4 from "../Assets/profile4.jpeg";
import profile5 from "../Assets/profile5.jpeg";
import profile6 from "../Assets/profile6.png";
import profile7 from "../Assets/profile7.png";

const UserAvatar = ({ userId, available, className }) => {
    const getProfileImage = (userId) => {
      const profileMap = {
        'usr-1': profile1,
        'usr-2': profile6,
        'usr-3': profile7,
        'usr-4': profile5,
        'usr-5': profile4
      };
      return profileMap[userId] || profile1;
    };
  
    return (
      <div className={`user-avatar-container ${className || ''}`}>
        <div className="user-avatar">
          <img src={getProfileImage(userId)} alt="user" />
          <div className={`availability-indicator ${available ? 'available' : 'unavailable'}`} />
        </div>
      </div>
    );
  };

  export default UserAvatar