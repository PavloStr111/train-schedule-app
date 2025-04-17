import React from 'react';
import { useForm } from 'react-hook-form';
import { loginUser } from '../../services/authService';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<{ email: string; password: string }>();
  const nav = useNavigate();

  const onSubmit = async (data: any) => {
        try {
            const res = await loginUser(data);
            console.log(res.data.data)
            localStorage.setItem('token', res.data.data);

            nav('/trains');
            } 
        catch (e: any) {
            setError('password', { message: e.response?.data?.message || 'Email or password does not match' });
        }
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400 }} className="mx-auto mt-5">
      <h2 className="mb-4">Log in</h2>

      <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              {...register('email', { required: 'Email is required' })} 
          />

        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}

      </div>


      <div className="mb-3">
          <label className="form-label">Password</label>
            <input type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              {...register('password', { required: 'The password is required', minLength: { 
    
                value: 6, message: 'Password should include more than 6 symbols' 
                } })} />
          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
      </div>

      
      <div className="d-flex justify-content-center">
        <Link className='mb-3 center-block' to='/register'>Register</Link>
      </div>
      <button  disabled={isSubmitting} className="btn btn-primary w-100 mt-3">
        {isSubmitting ? '...' : 'Log in'}
      </button>
      
    </form>
  );
}