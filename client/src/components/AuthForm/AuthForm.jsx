import "../../../styles/partials/auth.scss";

const AuthForm = ({children}) => {
    return (
        <section className="auth">
            <div className="auth__wrapper">
                <div className="auth__content">
                    <div className="auth__about">
                        <h1>Social app</h1>
                        <p>Invite people to be friends, share your moments and chat with them</p>
                    </div>
                    <div className="auth__form">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AuthForm;