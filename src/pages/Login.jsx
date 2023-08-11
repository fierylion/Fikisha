import React, { useState, useEffect } from 'react'
import MessageAlerts from '../components/MessageAlerts'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import {FiMail} from 'react-icons/fi'
import {AiFillEyeInvisible} from 'react-icons/ai'
import {AiFillEye} from 'react-icons/ai'
import useFetch from '../hooks'
const schema = yup
  .object({
    //email
    email: yup
      .string('Please enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    //password
    password: yup
      .string('Please enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  })
  .required()
   
const Login = () => {
  const navigate = useNavigate()
  const [category, setCategory] = useState('donor')
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })
  const email = watch('email')
  const password = watch('password')
  //Submitting data
  const { data, isLoading, error, obtainData } = useFetch()
  const onSubmit = (details) => {
    obtainData(
      category === 'ngo' ? '/ngo/login' : '/donor/login',
      'post',
      {email, password}
    )
  }
  useEffect(() => {
    if (data) {
      localStorage.setItem((category==='donor')?'aidreach_donor':'aidreach_ngo', JSON.stringify({token:data.token,type:category, data:(category==='donor')?data.donor:data.ngo}))
      navigate((category==='donor')?'/donor':'/ngo')
    }
    if (error) {
      console.log(error)
    }
  }, [data, error])
  return (
    <section>
      <div className='container size_input h-75 mx-auto'>
        <div>
          <div>
            <h2>Log in to Aid Reach</h2>
            <small>
              Welcome back! login with your entered during registration
            </small>
            <div className='my-3'>
              Login as {category === 'ngo' ? 'an organization' : 'a donor'}
            </div>
            <div className='d-flex flex-column '>
              <button
                className={`btn ${
                  category === 'donor' ? 'bg-success' : 'btn-outline-dark'
                } my-3`}
                onClick={() => setCategory('donor')}
              >
                Donor
              </button>
              <button
                className={`btn ${
                  category === 'ngo' ? 'bg-success' : 'btn-outline-dark'
                } my-3`}
                onClick={() => setCategory('ngo')}
              >
                Ngo
              </button>
            </div>
          </div>
          <div>
            {error && (
              <MessageAlerts
                msg={error.response?.data?.msg || error.response?.data?.err}
                color={'danger'}
              />
            )}
            {isLoading && (
              <MessageAlerts
                msg={'Submitting details, Please wait!'}
                color={'warning'}
              />
            )}
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='row form-row'>
              <div className='col-12'>
                <div className='d-flex'>
                  <span className='text-muted rounded p-2'>
                    <FiMail />
                  </span>

                  <input
                    type='email'
                    className={`d-inline-block rounded border w-100 ${
                      (errors.email && 'is-invalid') || ''
                    }}`}
                    placeholder={
                      category === 'ngo' ? 'Organization Email' : 'Your Email'
                    }
                    {...register('email')}
                    value={email}
                  />
                </div>
                {errors.email ? (
                  <div className='invalid-feedback'>
                    {errors.email?.message}
                  </div>
                ) : (
                  <div className='text-success'></div>
                )}
              </div>
              <div className='col-12 mt-5 mb-4'>
                <div className='d-flex'>
                  <span
                    className='text-muted p-2 link rounded'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`d-inline-block rounded border w-100 ${
                      (errors.password && 'is-invalid') || ''
                    }}`}
                    placeholder={
                      category === 'ngo'
                        ? 'Organization Password'
                        : 'Your Password'
                    }
                    {...register('password')}
                    value={password}
                  />
                </div>
                {errors.password ? (
                  <div className='text-danger'>{errors.password?.message}</div>
                ) : (
                  <div className='text-success'></div>
                )}
              </div>
            </div>
            <div>
              <button className='btn btn-success w-100' type='submit'>
                Log in
              </button>
            </div>
          </form>
          <div className='text-center mt-4'>
            Don't have an account? <a href='/register'>Sign up</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login