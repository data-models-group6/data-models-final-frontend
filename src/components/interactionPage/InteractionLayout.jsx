import { NavLink, Outlet } from "react-router-dom";
import classes from "./InteractionLayout.module.css";

function InteractionLayout() {
    return (
        <div className={classes.container}>
            <div className={classes.contentWrapper}>
                <nav className={classes.navContainer}>
                    <NavLink
                        to="likes"
                        className={({ isActive }) =>
                            isActive
                                ? `${classes.navItem} ${classes.active}`
                                : classes.navItem
                        }
                    >
                        喜歡我的人
                    </NavLink>
                    <NavLink
                        to="mine"
                        className={({ isActive }) =>
                            isActive
                                ? `${classes.navItem} ${classes.active}`
                                : classes.navItem
                        }
                    >
                        我的心動對象
                    </NavLink>
                </nav>
                <div className={classes.content}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default InteractionLayout;
