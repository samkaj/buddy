import { Outlet, Link } from "react-router-dom";

export const Layout = () => {
    return (
        <>
            <nav>
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
