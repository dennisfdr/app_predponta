import { useState } from 'react';
import { useFormik } from 'formik';
import type { NextPage } from 'next';
import * as yup from 'yup';

import 'bootstrap/dist/css/bootstrap.min.css';


const Usuario: NextPage = () => {
  const [message, setMessage] = useState(''); // This will be used to show a message if the submission is successful
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
        empNome: '',
        empPeriodicidadeIt:'',
        empPeriodicidadeMca: '',
      },
    onSubmit: () => {
      setMessage('Form submitted');
      setSubmitted(true);
      console.log(formik.values);
    },
    validationSchema: yup.object({
        empNome: yup.string().trim().required('Name is required'),
        empPeriodicidadeIt: yup
          .string()
          .required('Email is required'),
        empPeriodicidadeMca: yup.string().trim().required('Message is required'),
      }),
  });

  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
      <div hidden={!submitted} className="alert alert-primary" role="alert">
        {message}
        
      </div>

      <form className="w-50" onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="empNome" className="form-label">
            Nome
          </label>
          <input
            type="text"
            name="empNome"
            className="form-control"
            placeholder="John Doe"
            value={formik.values.empNome}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.empNome && (
            <div className="text-danger">{formik.errors.empNome}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="empPeriodicidadeIt" className="form-label">
            PeriodicidadeIt
          </label>
          <input
            type="empPeriodicidadeIt"
            name="empPeriodicidadeIt"
            className="form-control"
            placeholder="john@example.com"
            value={formik.values.empPeriodicidadeIt}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.empPeriodicidadeIt && (
            <div className="text-danger">{formik.errors.empPeriodicidadeIt}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="empPeriodicidadeMca" className="form-label">
          PeriodicidadeMca
          </label>
          <textarea
            name="empPeriodicidadeMca"
            className="form-control"
            placeholder="Your message ..."
            value={formik.values.empPeriodicidadeMca}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.empPeriodicidadeMca && (
            <div className="text-danger">{formik.errors.empPeriodicidadeMca}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form>
    </div>
  );
};

export default Usuario;