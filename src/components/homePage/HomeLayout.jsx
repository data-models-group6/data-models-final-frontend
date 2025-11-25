import { NavLink, Outlet } from "react-router-dom";
import classes from "./HomeLayout.module.css";

function HomeLayout() {
    return (
        <div className={classes.container}>
            <nav className={classes.topNav}>
                <NavLink
                    to="/app/home/swipeCard"
                    end
                    className={({ isActive }) =>
                        isActive
                            ? `${classes.navLink} ${classes.active}`
                            : classes.navLink
                    }
                >
                    滑卡
                </NavLink>
                <NavLink
                    to="/app/home/nearby"
                    className={({ isActive }) =>
                        isActive
                            ? `${classes.navLink} ${classes.active}`
                            : classes.navLink
                    }
                >
                    附近
                </NavLink>
                <NavLink
                    to="/app/home/explore"
                    className={({ isActive }) =>
                        isActive
                            ? `${classes.navLink} ${classes.active}`
                            : classes.navLink
                    }
                >
                    探索
                </NavLink>
                <NavLink
                    to="/app/home/rank"
                    className={({ isActive }) =>
                        isActive
                            ? `${classes.navLink} ${classes.active}`
                            : classes.navLink
                    }
                >
                    地區排行
                </NavLink>
            </nav>
            <div className={classes.content}>
                <Outlet />
            </div>
        </div>
    );
}

export default HomeLayout;
