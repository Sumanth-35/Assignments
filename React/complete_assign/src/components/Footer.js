import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();

  return (
    <div className="footer">
      <p>© {new Date().getFullYear()} Shoppy App</p>
      <p>Current Page: {location.pathname}</p>
      <p>Built using React & FakeStore API</p>
    </div>
  );
}
export default Footer;