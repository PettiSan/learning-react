import React from 'react'
import { Formik, Form, useField, useFormik } from 'formik';

// Synchronous validation
const validate = (values, props /* only available when using withFormik */) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'Required';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Min length is 6';
  }

  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Required';
  } else if (values.passwordConfirm.length < 6) {
    errors.passwordConfirm = 'Min length is 6';
  }

  return errors;
};

const FormikInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  console.log('aeae ', field);
  console.log('aeae ', meta);
  return (
    <React.Fragment>
      <label lassName="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={props.id || props.name}>{label}</label>

      <input {...field} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" {...field} {...props} />
      {meta.touched && meta.error ? (
        <p className="text-red-500 text-xs italic">{meta.error}</p>
      ) : null}
    </React.Fragment>
  );
};

const FormikSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <React.Fragment>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={props.id || props.name}>{label}</label>

      <div className="relative">
        <select {...field} {...props} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
      </div>
    </React.Fragment>
  );
};

export default function FormFormik() {
  return (
    <div className="flex justify-center mt-5 p-5 bg-white">
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          passwordConfirm: '',
          state: '',
          city: '',
        }}
        validate={validate}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className="flex flex-col items-center justify-center divide-y divide-gray-400 max-w-xl" noValidate>
          <div className="flex flex-col space-x-0 py-2 w-full md:flex-row md:space-x-5">
            <div className="flex-1">
              <FormikInput
                label="First Name *"
                name="firstName"
                type="text"
                placeholder="Filipe"
              />
            </div>
            <div className="flex-1">
              <FormikInput
                label="Last Name *"
                name="lastName"
                type="text"
                placeholder="Petitemberte"
              />
            </div>
          </div>

          <div className="flex flex-col space-x-0 py-2 w-full md:flex-row md:space-x-5">
            <div className="flex-1">
              <FormikInput
                label="E-mail *"
                name="email"
                type="email"
                placeholder="email@gmail.com"
              />
            </div>
          </div>

          <div className="flex flex-col space-x-0 py-2 w-full md:flex-row md:space-x-5">
            <div className="flex-1">
              <FormikInput
                label="Passowrd *"
                name="password"
                type="password"
                placeholder="******************"
              />
            </div>

            <div className="flex-1">
              <FormikInput
                label="Confirm Passowrd *"
                name="passwordConfirm"
                type="passwordConfirm"
                placeholder="******************"
              />
            </div>
          </div>

          <div className="flex flex-col space-x-0 py-2 w-full md:flex-row md:space-x-5">
            <div className="flex-1">
              <FormikSelect label="State" name="state">
                <option value="">Selecet a state</option>
                <option value="designer">Designer</option>
                <option value="development">Developer</option>
                <option value="product">Product Manager</option>
                <option value="other">Other</option>
              </FormikSelect>
            </div>

            <div className="flex-1">
              <FormikSelect label="Cities" name="city">
                <option value="">Select a city</option>
                <option value="designer">Designer</option>
                <option value="development">Developer</option>
                <option value="product">Product Manager</option>
                <option value="other">Other</option>
              </FormikSelect>
            </div>

          </div>

          <button type="submit" className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-5">
            Button
        </button>
        </Form>
      </Formik>
    </div >
  );
}
