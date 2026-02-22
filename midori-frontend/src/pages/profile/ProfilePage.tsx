import { useEffect, useState } from "react";
import { getMe } from "../../api/user.service";
import { EditProfileForm } from "../../components/profile/EditProfileFrom";
import { ChangePasswordForm } from "../../components/profile/ChangePasswordFrom";
import "../../styles/profile.css";

export const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then(res => setUser(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando perfil...</p>;

  return (
    <div className="profile-container">
      <h1>Perfil</h1>

      <EditProfileForm user={user} onUpdate={setUser} />

      <div className="divider" />

      <ChangePasswordForm />
    </div>
  );
};