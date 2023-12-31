import "./postForm.scss";
import ImageIcon from "@mui/icons-material/Image.js";
import {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../../context/authContext.jsx";
import {upload} from "../../db/upload/upload.js";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addPost} from "../../db/posts/addPost.js";
import {Field, Form, Formik, ErrorMessage} from "formik";
import {postSchema} from "../../schemas/postSchema.js";

const PostForm = () => {
    const {currentUser} = useContext(AuthContext);
    const [isFileLoaded, setIsFileLoaded] = useState(false);
    const [fileURL, setFileURL] = useState(null);
    const [uploadedFileName, setUploadedFileName] = useState("");
    const queryClient = useQueryClient();
    const fileRef = useRef();

    const handleFileUpload = async (event) => {
        const files = event.target.files[0];
        if (files) {
            setIsFileLoaded(true);
            setFileURL(URL.createObjectURL(files));
            setUploadedFileName(files.name);
        }
    };

    useEffect(() => {
        if (fileURL) {
            return () => {
                URL.revokeObjectURL(fileURL);
            };
        }
    }, [fileURL]);

    const mutation = useMutation({
        mutationFn: async (data) => addPost(data),
        onSuccess: () => {
            queryClient.invalidateQueries("post");
        }
    });

    const handleSubmit = async (values, actions) => {
        if (!values.description && !values.file) return;

        const file = values.file ? await upload(values.file) : "";

        const postObject = {
            description: values.description,
            file: file.url,
        }
        mutation.mutate(postObject);
        actions.resetForm();
        actions.setSubmitting(false)
        setFileURL(null);
        setUploadedFileName("");
    }

    return (
        <Formik
            initialValues={{
                description: "",
                file: "",
            }}
            validationSchema={postSchema}
            onSubmit={handleSubmit}
        >
            {({ values, setFieldValue}) => (
                <Form className="postForm">
                    <div className="postForm__wrapper">
                        <div className="postForm__content">
                            <div className="postForm__img user-profile-rounded user-profile-rounded--big">
                                <img src={currentUser.profilePicture ? currentUser.profilePicture : "../src/images/default.jpg"} alt="Profile picture"/>
                            </div>
                            <div className="postForm__input">
                                <Field
                                    as="textarea"
                                    name="description"
                                    placeholder={`What's on your mind ${currentUser.name}?`}
                                    className="form-textarea"
                                />
                                <ErrorMessage name="description" component="div" className="error" />
                            </div>
                        </div>
                        <div className="postForm__actions">
                            <div className="postForm__image">
                                <input
                                    type="file"
                                    id="file"
                                    style={{ display: "none" }}
                                    name="file"
                                    onChange={(event) => {handleFileUpload(event);setFieldValue("file", event.currentTarget.files[0]);}}
                                    ref={fileRef}
                                />
                                <label htmlFor="file">
                                    <ImageIcon />
                                    <span>Photo/video</span>
                                    {isFileLoaded && fileRef.current.files.length !== 0 && (
                                        <div>
                                            <img className="file" alt="" src={fileURL} />
                                            <p style={{color: "#1877f2", fontWeight: "700"}}>{uploadedFileName}</p>
                                        </div>
                                    )}
                                </label>
                                <ErrorMessage name="file" component="div" className="error" />
                            </div>
                            <button
                                className="btn btn--blue btn--no-min-width"
                                type="submit"
                                disabled={!values.description && !values.file}
                            >
                                Share
                            </button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default PostForm;