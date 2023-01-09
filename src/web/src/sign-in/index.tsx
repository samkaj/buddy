import '../sass/colors.scss';
import './signin.scss';

export const SignIn = () => {
    return (
        <>
            <article id='form'>
                <h1>{'Welcome, buddy'}</h1>
                <p>{'Sign in to continue.'}</p>
                <button>{'Continue with Google'}</button>
                <p className='or-line'>or</p>
                <button>{'Continue with GitHub'}</button>
            </article>
        </>
    );
};
