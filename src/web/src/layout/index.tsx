import { Outlet, Link } from 'react-router-dom';
import './layout.scss';
import { useEffect, useState } from 'react';

export const Layout = () => {
    const [themeIcon, setThemeIcon] = useState<string>();

    const swapTheme = () => {
        const body = document.querySelector('body');
        body?.classList.contains('dark')
            ? body.classList.remove('dark')
            : body?.classList.add('dark');
        themeIcon === '🌚' ? setThemeIcon('🌞') : setThemeIcon('🌚');
    };

    useEffect(() => {
        const body = document.querySelector('body');
        const isDarkModePreferred = window.matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches;
        if (isDarkModePreferred) {
            body?.classList.add('dark');
            setThemeIcon('🌚');
        } else {
            setThemeIcon('🌞');
        }
    }, []);

    return (
        <>
            <nav className='navbar'>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/notes'>Notes</Link>
                    </li>
                    <li>
                        <button id='login-btn'>
                            <Link to='/login'>Sign in</Link>
                        </button>
                    </li>
                    <li>
                        <button id='toggle-theme' onClick={swapTheme}>
                            {themeIcon}
                        </button>
                    </li>
                </ul>
            </nav>
            <main>
                <Outlet />
            </main>
        </>
    );
};
