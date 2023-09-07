import CloseIcon from "@mui/icons-material/Close.js";
import "./commentEdit.scss";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {editCommentData} from "../../db/comments/editCommentData.js";
import {deleteComment} from "../../db/comments/deleteComment.js";
const CommentEdit = ({comment, setIsOptionsBoxOpen, setIsCommentEditOpen}) => {
    const queryClient = useQueryClient();

    const editCommentMutation = useMutation({
        mutationFn: async (data) => await editCommentData(data, comment._id),
        onSuccess: () => {
            queryClient.invalidateQueries("comments");
        }
    });

    const onSubmit = async (values, actions) => {
        try {
            if (!values.description) return;
            const commentDataObject = {...values};
            await editCommentMutation.mutate(commentDataObject);
            setIsOptionsBoxOpen(false);
            setIsCommentEditOpen(false);
        } catch (error) {
            console.log(error)
        }
        actions.setSubmitting(false)
    }

    return (
        <div className="modal">
            <div className="modal__content">
                <Formik
                    initialValues={{
                        description: comment.description,
                    }}
                    onSubmit={onSubmit}
                >
                    {({values, setFieldValue }) => (
                        <Form className="commentEdit">
                            <Field
                                as="textarea"
                                name="description"
                                id="description"
                                className="form-textarea form-textarea--border"
                            />
                            <ErrorMessage name="description" component="div" className="error" />
                            <button type="submit" disabled={!values.description} className="btn btn--blue btn--width-auto">Edit</button>
                        </Form>
                    )}
                </Formik>
                <CloseIcon onClick={() => setIsCommentEditOpen(false)}/>
            </div>
        </div>
    );
}

export default CommentEdit;