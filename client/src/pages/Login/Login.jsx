import "./Login.scss";
import {Form, Formik} from "formik";
import FormikInput from "../../components/FormikInput.jsx";
import {loginSchema} from "../../schemas/loginSchema.js";
import {useContext, useRef} from "react";
import {AuthContext} from "../../context/authContext.jsx";

const Login = () => {

    const {login, currentUser} = useContext(AuthContext);

    const onSubmit = async (values, actions) => {
        try {
            await login(values);
            // navigate("/");
        } catch (error) {
            console.log(error);
        }
        actions.setSubmitting(false)
    }

    return (
        <section className="login">
            <div className="login__wrapper">
                <div className="login__content">
                    <div className="login__about">
                        <h1>Social app</h1>
                        <p>Invite people to be friends, share your moments and chat with them</p>
                    </div>
                    <div className="login__form">
                        <Formik
                            initialValues={{email: "", password: "", }}
                            validationSchema={loginSchema}
                            onSubmit={onSubmit}
                        >
                            {({isSubmitting}) => (
                                <Form>
                                    <FormikInput
                                        label="Email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                    />
                                    <FormikInput
                                        label="Password"
                                        name="password"
                                        type="password"
                                        placeholder="Enter your password"
                                    />
                                    <button className="login__button" disabled={isSubmitting} type="submit">
                                        Log in
                                    </button>

                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;