import {ErrorMessage, Field, Form, Formik} from "formik";
import {useContext} from "react";
import {AuthContext} from "../../context/authContext.jsx";
import SendIcon from '@mui/icons-material/Send';
import "./commentForm.scss";

const CommentForm = () => {
    const {currentUser} = useContext(AuthContext);

    const handleSubmit = () => {
        console.log("test")
    }

    return (
        <Formik
            initialValues={{
                description: "",
            }}
            onSubmit={handleSubmit}
        >
            {({ values}) => (
                <Form className="commentForm">
                    <div className="commentForm__img">
                        <img src={currentUser.profilePicture ? currentUser.profilePicture : "../src/images/default.jpg"} alt="Profile picture"/>
                    </div>
                    <div className="commentForm__input">
                        <Field
                            as="textarea"
                            name="description"
                            placeholder="Write your comment"
                        />
                        <ErrorMessage name="description" component="div" className="error" />
                    </div>
                    <button type="submit" disabled={!values.description}>
                        <SendIcon />
                    </button>
                </Form>
            )}
        </Formik>
    );
}

export default CommentForm;