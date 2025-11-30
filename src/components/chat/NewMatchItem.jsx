import classes from "./NewMatchItem.module.css";

const NewMatchItem = ({ name, avatar, isOnline, onClick }) => {
  return (
    <div className={classes.container} onClick={onClick}>
      <div className={classes.avatarContainer}>
        <img src={avatar} alt={name} className={classes.avatar} />
        {isOnline && <div className={classes.onlineBadge}></div>}
      </div>
      <span className={classes.name}>{name}</span>
    </div>
  );
};

export default NewMatchItem;