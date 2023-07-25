import "./friend.scss";

const Friend = ({item}) => {
    return (
            <div className="friends__friend">
                <div className="friends__friend-img">
                    <img src={item.sender.profilePicture} alt="Cover picture"/>
                </div>
                <h2>{item.sender.name} {item.sender.surname}</h2>
                <div className="friends__friend-buttons">
                    <button className="btn btn--no-min-width btn--blue">
                        Accept
                    </button>
                    <button className="btn btn--no-min-width btn--gray">
                        Deny
                    </button>
                </div>
            </div>
    );
}

export default Friend;