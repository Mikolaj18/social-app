import "./Login.scss";
import {Form, Formik} from "formik";
import FormikInput from "../../components/FormikInput/FormikInput.jsx";
import {loginSchema} from "../../schemas/loginSchema/loginSchema.js";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/authContext.jsx";
import {Link, useNavigate} from "react-router-dom";
import AuthForm from "../../components/AuthForm/AuthForm.jsx";

const Login = () => {
    const {login} = useContext(AuthContext);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const onSubmit = async (values, actions) => {
        try {
            await login(values);
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
        actions.setSubmitting(false)
    }

    return (
        <AuthForm>
            <Formik
                initialValues={{email: "", password: "",}}
                validationSchema={loginSchema}
                onSubmit={onSubmit}
            >
                {({isSubmitting}) => (
                    <Form>
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
                        {error && <div className="error">{error}</div>}
                        <button className="btn btn--blue login-button" disabled={isSubmitting} type="submit">
                            Log in
                        </button>
                        <Link className="btn--mt-20" to="/register">
                            <button className="btn btn--green">Create new account</button>
                        </Link>
                    </Form>
                )}
            </Formik>
        </AuthForm>
    );
}

export default Login;