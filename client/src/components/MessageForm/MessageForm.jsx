import "./messageForm.scss";
import {ErrorMessage, Field, Form, Formik} from "formik";
import SendIcon from "@mui/icons-material/Send.js";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {sendMessage} from "../../db/messages/sendMessage.js";
import {useConversations} from "../../context/conversationsContext.jsx";
const MessageForm = () => {
    const queryClient = useQueryClient();
    const {setConversations, selectedConversation} = useConversations();

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
        setConversations(prevConv => {
        });
        actions.resetForm();
        actions.setSubmitting(false);
    }

    return (
        <Formik
            initialValues={{message: ""}}
            onSubmit={handleSubmit}
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