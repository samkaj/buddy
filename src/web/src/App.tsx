import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './layout';
import { Notes } from './notes';
import { SignIn } from './sign-in';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path='notes' element={<Notes />} />
                    <Route path='sign-in' element={<SignIn />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
