import { useEffect, useState } from "react";
import { getMe } from "../../api/user.service";
import { EditProfileForm } from "../../components/profile/EditProfileFrom";
import { ChangePasswordForm } from "../../components/profile/ChangePasswordFrom";
import { ShopLayout } from "../../components/shop/ShopLayout";
import { SidebarIcons } from "../../components/shop/SidebarIcons";
import { FiUser, FiLock } from "react-icons/fi";
import "../../styles/profile.css";

export const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] =
    useState<"profile" | "password">("profile");

  useEffect(() => {
    getMe()
      .then((res) => setUser(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ShopLayout
      sidebar={<SidebarIcons onProviderRequest={() => {}} />}
      topbar={null}
    >
      {loading ? (
        <div className="profile-loading">
          <div className="loading-spinner"></div>
          <p>Loading Profile...</p>
        </div>
      ) : (
        <div className="profile-page">
          <div className="profile-header">
            <div className="profile-avatar">
              <FiUser size={40} />
            </div>
            <div className="profile-title">
              <h1>My Profile</h1>
              <p>{user?.email}</p>
            </div>
          </div>

          <div className="profile-tabs">
            <button
              className={`tab-btn ${
                activeTab === "profile" ? "active" : ""
              }`}
              onClick={() => setActiveTab("profile")}
            >
              <FiUser size={18} />
              <span>Personal Information</span>
            </button>

            <button
              className={`tab-btn ${
                activeTab === "password" ? "active" : ""
              }`}
              onClick={() => setActiveTab("password")}
            >
              <FiLock size={18} />
              <span>Change Password</span>
            </button>
          </div>

          <div className="profile-content">
            {activeTab === "profile" && (
              <EditProfileForm user={user} onUpdate={setUser} />
            )}
            {activeTab === "password" && <ChangePasswordForm />}
          </div>
        </div>
      )}
    </ShopLayout>
  );
};