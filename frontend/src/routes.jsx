import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications  } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import Services from "./pages/dashboard/services";
import AboutUs from "./pages/dashboard/aboutus";
import Category from "./pages/dashboard/category";
import Footer from "./pages/dashboard/footer";
import SignOut from "./pages/dashboard/sign-out";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },

      {
        icon: <RectangleStackIcon className="h-5 w-5" />, // Example icon for services
        name: "Services",
        path: "/services",
        element: <Services/> // Ensure this matches the route in your router config
      },

      {
        icon: <RectangleStackIcon className="h-5 w-5" />, // Example icon for services
        name: "About us",
        path: "/aboutus",
        element: <AboutUs/> 
      },

      {
        icon: <RectangleStackIcon className="h-5 w-5" />, // Example icon for services
        name: "Category",
        path: "/catagory",
        element: <Category/> 
      },

      {
        icon: <RectangleStackIcon className="h-5 w-5" />, // Example icon for services
        name: "footer",
        path: "/footer",
        element: <Footer/> 
      },
     

    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
  
  
      // {
      //   icon: <RectangleStackIcon className="h-5 w-5" />, // Example icon for services
      //   name: "signOut",
      //   path: "/signout",
      //   element: <SignOut/> 
      // },
    ],
  },
];

export default routes;
