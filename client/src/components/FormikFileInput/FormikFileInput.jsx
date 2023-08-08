import {ErrorMessage,} from "formik";

const FormikFileInput = ({ label, name, setFieldValue, ...props }) => {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input {...props} type="file" onChange={(event) => {
                setFieldValue(name, event.currentTarget.files[0]);
            }} />
            <ErrorMessage name={name} component="div" className="error" />
        </>
    );
};

export default FormikFileInput;