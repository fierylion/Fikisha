import React, { useState } from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


const schema = yup
  .object({
    //email
    profile: yup.string('Please enter your profile information').required('profile is required'),
    website: yup
      .string('Please enter your website link')
      .required('link is required'),
    expenditure: yup
      .string('Please enter your report link')
      .required('link is required'),

  })
  .required()

const VerificationModal = () => {
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
  const profile = watch('profile')
  const website = watch('website')
  const expenditure = watch('expenditure')
  

  const onSubmit = (data) => {
    console.log(data)
  }
  return (
    <section>
      <>
        <div
          className='modal fade'
          id='verificationModal'
          tabIndex={-1}
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id='exampleModalLabel'>
                  Verification Details
                </h5>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                />
              </div>
              <div className='modal-body'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='row form-row'>
                    <div className='col-12 m-2'>
                      <div className='d-flex'>
                        <label htmlFor='title'>Organization Profile</label>

                        <textarea
                          type='text'
                          className={`d-inline-block rounded border w-100 ${
                            (errors.profile && 'is-invalid') || ''
                          }}`}
                          placeholder={'Overview of the mission and vision.'}
                          {...register('profile')}
                          value={profile}
                        />
                      </div>
                      {errors.profile ? (
                        <div className='text-danger'>
                          {errors.profile?.message}
                        </div>
                      ) : (
                        <div className='text-success'></div>
                      )}
                    </div>
                    <div className='col-12 m-2'>
                      <div className='d-flex'>
                        <label htmlFor='title'>Website URL</label>

                        <input
                          type='text'
                          className={`d-inline-block ms-2 rounded border w-100 ${
                            (errors.website && 'is-invalid') || ''
                          }}`}
                          placeholder={'Web link'}
                          {...register('website')}
                          value={website}
                        />
                      </div>
                      {errors.website ? (
                        <div className='text-danger'>
                          {errors.website?.message}
                        </div>
                      ) : (
                        <div className='text-success'></div>
                      )}
                    </div>
                    <div className='col-12 m-2'>
                      <div className='d-flex'>
                        <label htmlFor='title'>
                          Organization Expenditure (URL)
                        </label>

                        <input
                          type='text'
                          className={`d-inline-block rounded border w-100 ${
                            (errors.expenditure && 'is-invalid') || ''
                          }}`}
                          placeholder={'report of expenditure'}
                          {...register('expenditure')}
                          value={expenditure}
                        />
                      </div>
                      {errors.expenditure ? (
                        <div className='text-danger'>
                          {errors.expenditure?.message}
                        </div>
                      ) : (
                        <div className='text-success'></div>
                      )}
                    </div>

                    <button className='btn btn-success w-100' type='submit'>
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </section>
  )
}

export default VerificationModal
