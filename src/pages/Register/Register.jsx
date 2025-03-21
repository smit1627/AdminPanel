import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import '../Register/Register.css'
const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required')
  });

  const handleSubmit = (values) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.find(u => u.email === values.email);

    if (userExists) {
      setError('User already exists. Please login.');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    const newUser = {
      id: Date.now(),
      username: values.username,
      email: values.email,
      password: values.password
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    navigate('/login');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Create Account</h2>
            <p>Register to access the admin panel</p>
          </div>
          <Formik
            initialValues={{
              username: 'admin',
              email: 'admin@gmail.com',
              password: '123456',
              confirmPassword: '123456'
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="auth-form">
                <div className="form-group mb-3">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    <Field
                      name="username"
                      className="form-control"
                      placeholder="Username"
                    />
                  </div>
                  {errors.username && touched.username && (
                    <div className="error-message">{errors.username}</div>
                  )}
                </div>

                <div className="form-group mb-3">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <Field
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="Email"
                    />
                  </div>
                  {errors.email && touched.email && (
                    <div className="error-message">{errors.email}</div>
                  )}
                </div>

                <div className="form-group mb-3">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                    <Field
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="Password"
                    />
                  </div>
                  {errors.password && touched.password && (
                    <div className="error-message">{errors.password}</div>
                  )}
                </div>

                <div className="form-group mb-3">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                    <Field
                      name="confirmPassword"
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                    />
                  </div>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="error-message">{errors.confirmPassword}</div>
                  )}
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <button type="submit" className="btn btn-primary w-100">
                  Register
                </button>

                <div className="auth-footer mt-3 text-center">
                  Already have an account? <Link to="/login">Login here</Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;