import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Header(){
    // di dalam komponen Header:
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("login")
    };
    // pasang di tombol Logout:
    <button onClick={handleLogout} className="btn btn-danger">Logout</button>
    return (
        <nav className="navbar navbar-dark bg-dark px-3">
            <Link to="/" className="nevbar-brand"> GlowList</Link>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        </nav>
    );
}