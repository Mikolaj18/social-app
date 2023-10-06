import "./messageForm.scss";
import {ErrorMessage, Field, Form, Formik} from "formik";
import SendIcon from "@mui/icons-material/Send.js";
const MessageForm = () => {
    return (
        <Formik
            initialValues={{message: ""}}
            onSubmit=""
        >
            {({ values}) => (
                <Form className="messageForm">
                    <div className="messageForm__input">
                        <Field
                            as="textarea"
                            name="message"
                            placeholder="Aa"
                        />
                        <ErrorMessage name="message" component="div" className="error" />
                    </div>
                    <button type="submit">
                        <SendIcon />
                    </button>
                </Form>
            )}
        </Formik>
    );
}

export default MessageForm;