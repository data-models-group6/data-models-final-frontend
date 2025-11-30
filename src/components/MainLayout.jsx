import { Outlet, NavLink, useLocation } from "react-router-dom";
import { TbCards } from "react-icons/tb";
import { BsGridFill } from "react-icons/bs";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

import classes from "./MainLayout.module.css";

function MainLayout() {
    const location = useLocation();
    const isHomeActive = location.pathname.startsWith("/app/home");
    const isInteractionActive = location.pathname.startsWith("/app/interaction");

    return (
        <div className={classes.container}>
            <div className={classes.contentArea}>
                <Outlet />
            </div>
            <nav className={classes.bottomNav}>
                <NavLink
                    to="/app/home/swipeCard"
                    className={
                        isHomeActive
                            ? `${classes.navItem} ${classes.active}`
                            : classes.navItem
                    }
                >
                    <TbCards />
                </NavLink>
                <NavLink
                    to="/app/interaction/likes"
                    className={
                        isInteractionActive
                            ? `${classes.navItem} ${classes.active}`
                            : classes.navItem
                    }
                >
                    <BsGridFill />
                </NavLink>
                <NavLink
                    to="/app/chat"
                    className={({ isActive }) =>
                        isActive
                            ? `${classes.navItem} ${classes.active}`
                            : classes.navItem
                    }
                >
                    <IoChatbubbleEllipses />
                </NavLink>
                <NavLink
                    to="/app/profile"
                    className={({ isActive }) =>
                        isActive
                            ? `${classes.navItem} ${classes.active}`
                            : classes.navItem
                    }
                >
                    <FaUser />
                </NavLink>
            </nav>
        </div>
    );
}

export default MainLayout;
