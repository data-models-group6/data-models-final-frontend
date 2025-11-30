import classes from "./ChatListItem.module.css";

const ChatListItem = ({ name, avatar, message, time, unreadCount, onClick }) => {
  return (
    <div className={classes.itemContainer} onClick={onClick}>
      <img src={avatar} alt={name} className={classes.avatar} />
      
      <div className={classes.textInfo}>
        <span className={classes.name}>{name}</span>
        <span className={`${classes.messagePreview} ${unreadCount > 0 ? classes.unreadText : ''}`}>
          {message}
        </span>
      </div>

      <div className={classes.metaInfo}>
        <span className={classes.time}>{time}</span>
        {unreadCount > 0 && (
          <div className={classes.unreadBadge}>
            {unreadCount > 99 ? '99+' : unreadCount}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatListItem;