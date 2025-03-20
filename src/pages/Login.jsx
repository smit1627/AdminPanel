
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const handleSubmit = (values) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    console.log(users);

    const user = users.find(u =>
      u.email === values.email && u.password === values.password
    );

    if (!user) {
      const userExists = users.find(u => u.email === values.email);
      if (!userExists) {
        setError('User not found. Please register.');
        setTimeout(() => navigate('/register'), 2000);
      } else {
        setError('Invalid credentials');
      }
      return;
    }

    login(user);
    navigate('/');
  };

  return (
    <>
      <div className="auth-wrapper">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <h2>Welcome Back</h2>
              <p>Please login to your account</p>
            </div>
            <Formik
              initialValues={{ email: 'admin@gmail.com', password: '123456' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="auth-form">
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

                  {error && <div className="alert alert-danger">{error}</div>}

                  <button type="submit" className="btn btn-primary w-100">
                    Login
                  </button>

                  <div className="auth-footer mt-3">
                    Don't have an account? <Link to="/register">Register here</Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;