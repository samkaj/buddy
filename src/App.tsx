import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layout";
import { Notes } from "./notes";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="notes" element={<Notes />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
