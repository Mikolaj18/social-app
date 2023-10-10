import "./messageForm.scss";
import {ErrorMessage, Field, Form, Formik} from "formik";
import SendIcon from "@mui/icons-material/Send.js";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {sendMessage} from "../../db/messages/sendMessage.js";
import {useConversation} from "../../context/conversationsContext.jsx";
const MessageForm = () => {
    const queryClient = useQueryClient();
    const {selectedConversation} = useConversation();

    const mutation = useMutation({
        mutationFn: async (data) => await sendMessage(data),
        onSuccess: () => {
            queryClient.invalidateQueries("messages", selectedConversation.userId);
        }
    });

    const handleSubmit = async (values, actions) => {
        if (!values.message) return;
        const messageObject = {
            message: values.message,
            recipientId: selectedConversation.userId,
        }
        mutation.mutate(messageObject);
        actions.resetForm();
        actions.setSubmitting(false);
    }
    const handleKeyPress = (e, submitForm) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submitForm();
        }
    };


    return (
        <Formik
            initialValues={{message: ""}}
            onSubmit={handleSubmit}
        >
            {({ values, submitForm}) => (
                <Form className="messageForm">
                    <div className="messageForm__input">
                        <Field
                            as="textarea"
                            name="message"
                            placeholder="Aa"
                            onKeyPress={(e) => handleKeyPress(e, submitForm)}
                        />
                        <ErrorMessage name="message" component="div" className="error" />
                    </div>
                    <button type="button" onClick={submitForm} disabled={!values.message}>
                        <SendIcon />
                    </button>
                </Form>
            )}
        </Formik>
    );
}

export default MessageForm;