import {Form, Formik, ErrorMessage} from "formik";
import FormikInput from "../FormikInput/FormikInput.jsx";
import CloseIcon from "@mui/icons-material/Close.js";
import "./profileEdit.scss";
import {profileSchema} from "../../schemas/profileSchema/profileSchema.js";

const ProfileEdit = ({data, onSubmit, onClick}) => {
    return (
        <div className="profile__edit">
            <div className="profile__form">
                <Formik
                    initialValues={{
                        name: data.name,
                        surname: data.surname,
                        profilePicture: "",
                        coverPicture: "",
                        description: data.description,
                        work: data.work,
                        school: data.school,
                        from: data.from,
                        livesIn: data.livesIn,
                    }}
                    validationSchema={profileSchema}
                    onSubmit={onSubmit}
                >
                    {({isSubmitting, setFieldValue }) => (
                        <Form>
                            <FormikInput
                                label="Name"
                                name="name"
                                type="text"
                            />
                            <FormikInput
                                label="Surname"
                                name="surname"
                                type="text"
                            />
                            <label htmlFor="profilePicture">Profile picture</label>
                            <input id="profilePicture" name="profilePicture" type="file" onChange={(event) => {
                                setFieldValue("profilePicture", event.currentTarget.files[0]);
                            }} />
                            <ErrorMessage name="profilePicture" component="div" className="error" />
                            <label htmlFor="coverPicture">Cover picture</label>
                            <input id="coverPicture" name="coverPicture" type="file" onChange={(event) => {
                                setFieldValue("coverPicture", event.currentTarget.files[0]);
                            }} />
                            <ErrorMessage name="coverPicture" component="div" className="error" />
                            <FormikInput
                                label="Description"
                                name="description"
                                type="text"
                                placeholder="Something about you..."
                            />
                            <FormikInput
                                label="Work"
                                name="work"
                                type="text"
                                placeholder="Teacher"
                            />
                            <FormikInput
                                label="School"
                                name="school"
                                type="text"
                                placeholder="University of Cambridge"
                            />
                            <FormikInput
                                label="From"
                                name="from"
                                type="text"
                                placeholder="London"
                            />
                            <FormikInput
                                label="Lives in"
                                name="livesIn"
                                type="text"
                                placeholder="Warsaw"
                            />
                            <button type="submit" disabled={isSubmitting} className="btn btn--green btn--width-auto">Edit</button>
                            <CloseIcon onClick={onClick}/>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
export default ProfileEdit;