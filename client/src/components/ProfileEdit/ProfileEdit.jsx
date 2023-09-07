import {Form, Formik} from "formik";
import FormikInput from "../FormikInput/FormikInput.jsx";
import CloseIcon from "@mui/icons-material/Close.js";
import "./profileEdit.scss";
import {profileSchema} from "../../schemas/profileSchema/profileSchema.js";
import FormikFileInput from "../FormikFileInput/FormikFileInput.jsx";
import {upload} from "../../db/upload/upload.js";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {editUserProfile} from "../../db/user/editUserProfile.js";
import {useContext} from "react";
import {AuthContext} from "../../context/authContext.jsx";

const ProfileEdit = ({data, setIsOpen}) => {
    const queryClient = useQueryClient();
    const {currentUser, setCurrentUser} = useContext(AuthContext);

    const editProfileMutation = useMutation({
        mutationFn: async (data) => editUserProfile(data, currentUser._id),
        onSuccess: () => {
            queryClient.invalidateQueries("profile");
        }
    });
    const onSubmit = async (values, actions) => {
        try {
            const profileUpload = values.profilePicture ? await upload(values.profilePicture) : null;
            const coverUpload = values.coverPicture ? await upload(values.coverPicture) : null;

            const profileImg = profileUpload?.url || data.profilePicture;
            const coverImg = coverUpload?.url || data.coverPicture;

            const userDataObject = {
                ...values,
                profilePicture: profileImg,
                coverPicture: coverImg,
            }

            await editProfileMutation.mutateAsync(userDataObject);
            setCurrentUser((prevUser) => ({
                ...prevUser,
                ...userDataObject,
            }));

            setIsOpen(false);
        } catch (error) {
            console.log(error);
        }
        actions.setSubmitting(false)
    }

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
                            <CloseIcon onClick={() => setIsOpen(false)}/>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
export default ProfileEdit;