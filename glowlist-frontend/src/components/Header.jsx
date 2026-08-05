import { Link } from "react-router-dom";

export default function Header(){
    return (
        <nav className="navbar navbar-drak bg-dark px-3">
            <Link to="/" className="nevbar-brand"> GlowList</Link>
            <button className="btn btn-danger">Logout</button>
        </nav>
    );
}