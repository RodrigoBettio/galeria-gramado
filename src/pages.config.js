import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Admin from './pages/Admin';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Gallery": Gallery,
    "Admin": Admin,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};