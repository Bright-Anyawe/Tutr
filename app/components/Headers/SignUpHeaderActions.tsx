import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/AuthStyles.css";
import Menu from "../Menu/Menu";

interface SignUpHeaderActionsProps {
  userName?: string;
  onLogout?: () => void;
}

const SignUpHeaderActions: React.FC<SignUpHeaderActionsProps> = ({
  userName = "User",
  onLogout,
}) => {
  // const { userName } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const { logout } = useAuth();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      logout();
      localStorage.removeItem("userLoginType");
      setShowDropdown(false);
      navigate("/");
    }
  };

  return (
    <section className="authenticated-actions">
      <div className="premium-profile-container">
        <span className="premium-label">Premium</span>
        <div className="user-avatar-container" onClick={toggleMenu}>
          <img
            src="/Images/profile-avatar.png"
            alt="User profile"
            className="profile-image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent) {
                const placeholder = document.createElement("div");
                placeholder.className = "profile-image-placeholder";
                placeholder.innerText =
                  userName?.charAt(0).toUpperCase() || "U";
                parent.appendChild(placeholder);
              }
            }}
          />
          {showMenu ? (
            <img src="/Images/arrow-up.png" alt="" />
          ) : (
            <img src="/Images/arrow-down.png" alt="" />
          )}{" "}
        </div>

        {showDropdown && (
          <Menu isOpen={showDropdown} onClose={() => setShowDropdown(false)} />
        )}
      </div>
    </section>
  );
};

export default SignUpHeaderActions;
