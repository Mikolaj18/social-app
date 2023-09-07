import CloseIcon from "@mui/icons-material/Close.js";
import "./postEdit.scss";
import {ErrorMessage, Field, Form, Formik} from "formik";
import FormikFileInput from "../FormikFileInput/FormikFileInput.jsx";
import {postSchema} from "../../schemas/postSchema.js";
import {upload} from "../../db/upload/upload.js";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {editPostData} from "../../db/posts/editPostData.js";

const PostEdit = ({post, setIsPostEditOpen, setIsPostOptionsOpen}) => {
    const queryClient = useQueryClient();

    const editPostMutation = useMutation({
        mutationFn: async (data) => await editPostData(data, post._id),
        onSuccess: () => {
            queryClient.invalidateQueries("posts");
        }
    });
    const onSubmit = async (values, actions) => {
        try {
            if (!values.description && !values.file) return;
            const fileUpload = values.file ? await upload(values.file) : null;
            const fileImg = fileUpload?.url || post.file;

            const postDataObject = {
                ...values,
                file: fileImg,
            }
            await editPostMutation.mutate(postDataObject);
            setIsPostEditOpen(false);
            setIsPostOptionsOpen(false);
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
                        description: post.description,
                        file: "",
                    }}
                    validationSchema={postSchema}
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
                            <FormikFileInput
                                setFieldValue={setFieldValue}
                                name="file"
                                id="file"
                            />
                            <button type="submit"  disabled={!values.description && !values.file} className="btn btn--blue btn--width-auto">Edit</button>
                        </Form>
                    )}
                </Formik>
                <CloseIcon onClick={() => setIsPostEditOpen(false)}/>
            </div>
        </div>
    );
}

export default PostEdit;