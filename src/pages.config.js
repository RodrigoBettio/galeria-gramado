import Admin from './pages/Admin';
import Gallery from './pages/Gallery';
import Home from './pages/Home';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Admin": Admin,
    "Gallery": Gallery,
    "Home": Home,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};