import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../constants/api';
import FormError from '../common/formError/FormError';

const url = `${BASE_URL}/auth/local`;

const schema = yup.object().shape({
  identifier: yup.string().required('Please enter your username'),
  password: yup.string().required('Please enter your password'),
});

const LoginForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [, setAuth] = useContext(AuthContext);

  const history = useHistory();

  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    setSubmitting(true);
    setLoginError(null);
    const options = {
      identifier: 'admin@admin.com',
      password: 'Pass1234',
    };

    try {
      const response = await axios.post(url, options);
      setAuth(response.data);
      history.push('/dashboard');
    } catch (error) {
      setLoginError(error.toString());
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {loginError && <FormError>{loginError}</FormError>}
      <fieldset disabled={submitting}>
        <div>
          <input name='identifier' placeholder='Username' ref={register} />
          {errors.identifier && (
            <FormError>{errors.identifier.message}</FormError>
          )}
        </div>

        <div>
          <input
            name='password'
            placeholder='Password'
            ref={register}
            type='password'
          />
          {errors.password && <FormError>{errors.password.message}</FormError>}
        </div>
        <button>{submitting ? 'Logging in...' : 'Login'}</button>
      </fieldset>
    </form>
  );
};

export default LoginForm;
