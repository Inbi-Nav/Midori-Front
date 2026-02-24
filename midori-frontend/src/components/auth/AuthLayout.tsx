import "../../styles/auth.css";
interface Props {
  left: React.ReactNode;
  right: React.ReactNode;
}

export const AuthLayout = ({ left, right }: Props) => {
  return (
    <div className="auth-container">
      <div className="auth-left">{left}</div>
      <div className="auth-right">{right}</div>
    </div>
  );
};