import CloseIcon from "@mui/icons-material/Close.js";
import "./postEdit.scss";
import {ErrorMessage, Field, Form, Formik} from "formik";
const CommentEdit = ({onClose, onSubmit, data}) => {
    return (
        <div className="modal">
            <div className="modal__content">
                <Formik
                    initialValues={{
                        description: data.description,
                    }}
                    onSubmit={onSubmit}
                >
                    {({values, setFieldValue }) => (
                        <Form className="postEdit">
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
                <CloseIcon onClick={onClose}/>
            </div>
        </div>
    );
}

export default CommentEdit;