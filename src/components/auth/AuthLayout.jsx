import { Outlet } from "react-router-dom";
import classes from "./AuthLayout.module.css";

function AuthLayout() {
  return (
    <div className={classes.layoutContainer}>
      <main className={classes.contentArea}>
        <Outlet /> 
      </main>
    </div>
  );
};

export default AuthLayout;