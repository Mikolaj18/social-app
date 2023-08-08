import {Form, Formik, ErrorMessage} from "formik";
import FormikInput from "../FormikInput/FormikInput.jsx";
import CloseIcon from "@mui/icons-material/Close.js";
import "./profileEdit.scss";
import {profileSchema} from "../../schemas/profileSchema/profileSchema.js";
import FormikFileInput from "../FormikFileInput/FormikFileInput.jsx";

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
                            <FormikFileInput
                                label="Profile Picture"
                                setFieldValue={setFieldValue}
                                name="profilePicture"
                                id="profilePicture"
                            />
                            <FormikFileInput
                                label="Cover Picture"
                                setFieldValue={setFieldValue}
                                name="coverPicture"
                                id="coverPicture"
                            />
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