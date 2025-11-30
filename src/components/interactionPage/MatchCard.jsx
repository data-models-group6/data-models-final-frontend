import classes from "./MatchCard.module.css";

function MatchCard({ image, onClick }) {
    return (
        <div className={classes.card} onClick={onClick}>
            <img src={image} alt="User" className={classes.image} />
        </div>
    );
}

export default MatchCard;
