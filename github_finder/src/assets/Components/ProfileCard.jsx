
import "./ProfileCard.css";

const ProfileCard = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div className="profile-card-container">
      <div className="profile-card">
        <img
          src={
            user.avatar_url ||
            "https://i.pinimg.com/736x/0a/f2/1e/0af21ef9ab8dfbcdf1db5ca532ac9f25.jpg"
          }
          alt="avatar"
          className="profile-avatar"
        />
        <h2 className="profile-name">
          {user.name || user.login}
        </h2>
        <p className="profile-username">@{user.login}</p>
        <p className="profile-bio">
          {user.bio || "No bio available"}
        </p>
        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-label">Repos</span>
            <span className="stat-value">{user.public_repos}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Followers</span>
            <span className="stat-value">{user.followers}</span>
          </div>
        </div>
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="profile-link-btn"
        >
          View Profile
        </a>
      </div>
    </div>
  );
};

export default ProfileCard;