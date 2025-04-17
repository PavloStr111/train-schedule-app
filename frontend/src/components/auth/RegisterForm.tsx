import React from 'react';
import { useForm } from 'react-hook-form';
import { registerUser } from '../../services/authService';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<{ firstName: string, lastName: string, email: string; password: string }>();
  const nav = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      await registerUser(data);
      nav('/login');
    } catch (e: any) {
      alert(e.response?.data?.message || 'Помилка реєстрації');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400 }} className="mx-auto mt-3">
      <h2 className='mb-4'>Welcome to train scheduler!</h2>
      <h4 className="mb-3">Registration</h4>

      <div className="mb-3">
          <label className="form-label">First Name</label>
          <input type="text"
              className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
              {...register('firstName', { required: 'FirstName is required' })} 
          />

        {errors.firstName && <div className="invalid-feedback">{errors.firstName.message}</div>}

      </div>

      <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input type="text"
              className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
              {...register('lastName', { required: 'FirstName is required' })} 
          />

        {errors.lastName && <div className="invalid-feedback">{errors.lastName.message}</div>}

      </div>

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
        <Link className='mb-3 center-block' to='/login'>Log in</Link>
      </div>

      <button disabled={isSubmitting} className="btn btn-primary w-100 mb-3">
        {isSubmitting ? '...' : 'Register'}
      </button>

    </form>
  );
}