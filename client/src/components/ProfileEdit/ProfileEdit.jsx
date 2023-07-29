import {Form, Formik} from "formik";
import FormikInput from "../FormikInput/FormikInput.jsx";
import CloseIcon from "@mui/icons-material/Close.js";
import "./profileEdit.scss";

const ProfileEdit = ({data, onSubmit, onClick}) => {
    return (
        <div className="profile__edit">
            <div className="profile__form">
                <Formik
                    initialValues={{
                        name: data.name,
                        surname: data.surname,
                        profilePicture: data.profilePicture,
                        coverPicture: data.profilePicture,
                        description: data.description,
                        work: data.work,
                        school: data.school,
                        from: data.from,
                        livesIn: data.livesIn,
                    }}
                    validationSchema=""
                    onSubmit={onSubmit}
                >
                    {({isSubmitting}) => (
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
                            <FormikInput
                                label="Profile Picture"
                                name="profilePicture"
                                type="file"
                            />
                            <FormikInput
                                label="Cover Picture"
                                name="coverPicture"
                                type="file"
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