import { Outlet, Link } from 'react-router-dom';
import './layout.scss';

export const Layout = () => {
    return (
        <>
            <nav className="navbar">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/notes">Notes</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    );
};
