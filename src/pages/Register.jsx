import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { FiMail } from 'react-icons/fi'
import { AiFillEyeInvisible } from 'react-icons/ai'
import { AiFillEye } from 'react-icons/ai'
import { BsChatQuote } from 'react-icons/bs'
import {CountryDropdown, RegionDropdown} from 'react-country-region-selector'
import PhoneInput from 'react-phone-number-input/input'
import 'react-phone-number-input/style.css'
import useFetch from '../hooks'
import MessageAlerts from '../components/MessageAlerts'
const Register = () => {
  const navigate = useNavigate()
  const [category, setCategory] = useState('donor')
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
      name: yup
        .string()
        .required('Name is required')
        .min(3, 'Should atleast be three characters'),
      reg_no: yup
        .string()
        .test(
          'reg-no-required',
          'Organization Registration number is required for ngos, Should be greater than 3 characters',
          function (value) {
            if(category !=='ngo'){
              return true
            }
            const valueLength = value.length;
            if(category==='ngo'){
              return valueLength>=3
            }
         
          }
        ),
      cat: yup.string(),
      country: yup.string().required('Please select a country'),
      region: yup.string().required('Please select a region'),
      phone: yup.string().required('Please enter your phone number!'),
      verifyPass: yup
        .string()
        .required('Please verify your password!')
        .test(
          'password-match',
          'Password doesnt match, Please try again',
          function (value) {
            return value === this.resolve(yup.ref('password'))
          }
        ),
    })
    .required()

  const [showPassword, setShowPassword] = useState(false)
  const [showVerifyPassword, setShowVerifyPassword]= useState(false)
  const {
    control,
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
  const name = watch('name')
  const reg_no = watch('reg_no')
  const country = watch('country')
  const phone = watch('phone')
  const region = watch('region')
  const cat = watch('cat')
  const verifyPass = watch('verifyPass')

  //Submitting data
  const { data, isLoading, error, obtainData } = useFetch()
  const onSubmit = (details) => {
    const {name,email,password, phone:phoneNumber, region, country, cat, reg_no  } = details
    const donor_data = {name,email,password, phoneNumber, region, country, cat}
    const ngo_data = {name,email,password, phoneNumber, region, country, reg_no}
    obtainData((category==='ngo')?'/ngo/register':'/donor/register', 'post', (category==='ngo')?ngo_data:donor_data )
    
  }
  useEffect(
    ()=>{
      if(data){
        navigate('/login')
      }
      if(error){
      console.log(error)
      }
    }, [data, error]
  )
  return (
    <section className='m-5 d-flex justify-content-center'>
      <div className='container size_input h-75 '>
        <div>
          <div className='mx-auto'>
            <h2>Register</h2>
            <small>Be part of our movement to help the needy</small>
            <div className='my-3'>
              Register as {category === 'ngo' ? 'an organization' : 'a donor'}
            </div>
            <div className='d-flex flex-column '>
              <button
                className={`btn ${
                  category === 'donor' ? 'bg-success' : 'btn-outline-success'
                } my-3`}
                onClick={() => setCategory('donor')}
              >
                Donor
              </button>
              <button
                className={`btn ${
                  category === 'ngo' ? 'bg-success' : 'btn-outline-success'
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
              <div className='p-3 col-6'>
                <label htmlFor='name' className='d-block mb-2'>
                  {category === 'ngo' ? 'Organization Name' : 'Full Name'}
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  placeholder={
                    category === 'ngo' ? 'Organization Name' : 'Your Name'
                  }
                  value={name}
                  {...register('name')}
                  className={`d-inline-block rounded border w-100 form-control ${
                    (errors.name && 'is-invalid') || ''
                  }}`}
                />
                {errors.name && (
                  <div className='text-danger'>{errors.name.message}</div>
                )}
              </div>
              {category === 'ngo' && (
                <div className='p-3 col-6'>
                  <label htmlFor='registration' className='d-block mb-2'>
                    Registration Number
                  </label>
                  <input
                    type='text'
                    name='reg_no'
                    id='registration'
                    placeholder='Registration No:'
                    value={reg_no}
                    {...register('reg_no')}
                    className={`d-inline-block rounded border w-100 form-control ${
                      (errors.reg_no && 'is-invalid') || ''
                    }}`}
                  />
                  {errors.reg_no && (
                    <div className='text-danger'>{errors.reg_no.message}</div>
                  )}
                </div>
              )}
              <div className='col-6 p-3'>
                <div className=''>
                  <label htmlFor='email' className='d-block mb-2'>
                    Email
                  </label>

                  <input
                    type='email'
                    id='email'
                    className={`d-inline-block rounded border w-100 form-control ${
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

              <div className='col-6 p-3'>
                <label htmlFor='country' className='d-block mb-2'>
                  Country
                </label>
                <Controller
                  name='country'
                  id='country'
                  control={control}
                  render={({ field }) => (
                    <CountryDropdown className='form-control' {...field} />
                  )}
                />
                {errors.country && (
                  <div className='text-danger'>{errors.country.message}</div>
                )}
              </div>
              <div className='col-6 p-3'>
                <label htmlFor='region' className='d-block mb-2'>
                  Region
                </label>
                <Controller
                  name='region'
                  control={control}
                  render={({ field }) => (
                    <RegionDropdown
                      country={country}
                      className='form-control'
                      {...field}
                    />
                  )}
                />
                {errors.region && (
                  <div className='text-danger'>{errors.region.message}</div>
                )}
              </div>
              <div className='p-3 col-6'>
                <label htmlFor='phone' className='d-block mb-2'>
                  Phone Number
                </label>

                <Controller
                  name='phone'
                  id='phone'
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      className={'form-control'}
                      defaultCountry='TZ'
                      placeholder='Enter phone number'
                    />
                  )}
                />

                {errors.phone && (
                  <div className='text-danger'>{errors.phone.message}</div>
                )}
              </div>
              {category === 'donor' && (
                <div className='p-3 col-6'>
                  <label htmlFor='category' className='mb-1'>
                    Category
                  </label>
                  <select
                    name='category'
                    id='category'
                    className='form-control'
                    {...register('cat')}
                    value={cat}
                  >
                    <option value='Individual'>Individual Donor</option>
                    <option value='Organization'>Organization</option>
                  </select>
                </div>
              )}
              <div className='col-12 mb-4'>
                <label htmlFor='password' className='p-2'>
                  Enter your password
                </label>
                <div className='d-flex'>
                  <span
                    className='bg-muted  p-2 link rounded'
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
              <div className='col-12 mb-4'>
                <label htmlFor='password' className='p-2'>
                  Verify your password
                </label>
                <div className='d-flex'>
                  <span
                    className='bg-muted p-2 link rounded'
                    onClick={() => setShowVerifyPassword(!showVerifyPassword)}
                  >
                    {showVerifyPassword ? (
                      <AiFillEyeInvisible />
                    ) : (
                      <AiFillEye />
                    )}
                  </span>
                  <input
                    type={showVerifyPassword ? 'text' : 'password'}
                    className={`d-inline-block rounded border w-100 ${
                      (errors.verifyPass && 'is-invalid') || ''
                    }}`}
                    placeholder={
                      category === 'ngo'
                        ? 'Organization Password'
                        : 'Your Password'
                    }
                    {...register('verifyPass')}
                    value={verifyPass}
                  />
                </div>
                {errors.password ? (
                  <div className='text-danger'>
                    {errors.verifyPass?.message}
                  </div>
                ) : (
                  <div className='text-success'></div>
                )}
              </div>
            </div>
            <div>
              <button className='btn btn-success w-100' type='submit'>
                Register
              </button>
            </div>
          </form>
          <div className='text-center mt-4'>
            Already have an account? <a href='/login'>Login</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register
