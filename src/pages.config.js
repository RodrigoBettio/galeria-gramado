import Gallery from './pages/Gallery';
import Admin from './pages/Admin';
import Home from './pages/Home';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Gallery": Gallery,
    "Admin": Admin,
    "Home": Home,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};