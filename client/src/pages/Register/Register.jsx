import {Form, Formik} from "formik";
import "./Register.scss";
import FormikInput from "../../components/FormikInput/FormikInput.jsx";
import {Link, useNavigate} from "react-router-dom";
import AuthForm from "../../components/AuthForm/AuthForm.jsx";
import {registerSchema} from "../../schemas/registerSchema/registerSchema.js";
import {userRegister} from "../../db/auth/userRegister.js";
import {useState} from "react";

const Register = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (values, actions) => {
        try {
            await userRegister(values);
            navigate("/login");
        } catch (error) {
            setError(error.message)
        }
        actions.setSubmitting(false)
    }
    return (
        <AuthForm>
            <Formik
                initialValues={{name: "", surname: "", email: "", password: "", confirmPassword: ""}}
                validationSchema={registerSchema}
                onSubmit={onSubmit}
            >
                {({isSubmitting}) => (
                    <Form noValidate>
                        <FormikInput
                            label="Name"
                            name="name"
                            type="text"
                            placeholder="John"
                        />
                        <FormikInput
                            label="Surname"
                            name="surname"
                            type="text"
                            placeholder="Doe"
                        />
                        <FormikInput
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="johndoe@mail.com"
                        />
                        <FormikInput
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                        />
                        <FormikInput
                            label="Confirm password"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                        />
                        {error && <div className="error">{error}</div>}
                        <button className="btn btn--green register-button" disabled={isSubmitting} type="submit">
                                Sign in
                            </button>
                        <Link className="btn--mt-20" to="/login">
                            <button className="btn btn--blue">Log in</button>
                        </Link>
                    </Form>
                )}
            </Formik>
        </AuthForm>
    );
}

export default Register;