import classes from "./HintCard.module.css";

function HintCard({ title, icon, description, buttonText, onClick }) {
  return (
    <div className={classes.card}>
      <div className={classes.header}>
        <span className={classes.title}>{title}</span>
        <span style={{ fontSize: "18px" }}>{icon}</span>
      </div>
      <p className={classes.description}>
        {description}
      </p>
      <div className={classes.buttonWrapper}>
        <button className={classes.actionBtn} onClick={onClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default HintCard;