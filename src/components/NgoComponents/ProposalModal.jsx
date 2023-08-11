import React, { useState } from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup
  .object({
    //email
    title: yup.string('Please enter your title').required('Title is required'),
    description: yup
      .string('Please enter your description')
      .required('Description is required'),
    amount: yup
      .string('Please enter your amount')
      .required('Amount is required'),
    image: yup
      .mixed()
      .required('Please select an image')
      .test('isImage', 'Only image files are allowed', (value) => {
        if (!value[0]) return false
        return value && value[0].type.startsWith('image/')
      })
      .test('fileSize', 'File size is too large', (value) => {
        if (!value[0]) return false
        return value && value[0].size <= 10485760 // 10MB in bytes
      }),
  })
  .required()

const ProposalModal = () => {

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
  const title = watch('title')
  const description = watch('description')
  const amount = watch('amount')
 

  const onSubmit = (data) => {
    console.log(data)
  }
  return (
    <section>
      <>
        <div
          className='modal fade'
          id='proposalModal'
          tabIndex={-1}
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id='exampleModalLabel'>
                  Proposal Details
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
                        <label htmlFor='title'>Proposal title</label>

                        <input
                          type='text'
                          className={`d-inline-block rounded border w-100 ${
                            (errors.title && 'is-invalid') || ''
                          }}`}
                          placeholder={'Proposal title'}
                          {...register('title')}
                          value={title}
                        />
                      </div>
                      {errors.title ? (
                        <div className='text-danger'>
                          {errors.title?.message}
                        </div>
                      ) : (
                        <div className='text-success'></div>
                      )}
                    </div>
                    <div className='col-12 m-2'>
                      <div className='d-flex'>
                        <label htmlFor='title'>Description</label>

                        <textarea
                          type='text'
                          className={`d-inline-block ms-2 rounded border w-100 ${
                            (errors.description && 'is-invalid') || ''
                          }}`}
                          placeholder={'Proposal description'}
                          {...register('description')}
                          value={description}
                        />
                      </div>
                      {errors.description ? (
                        <div className='text-danger'>
                          {errors.description?.message}
                        </div>
                      ) : (
                        <div className='text-success'></div>
                      )}
                    </div>
                    <div className='col-12 m-2'>
                      <div className='d-flex'>
                        <label htmlFor='title'>Proposal amount</label>

                        <input
                          type='number'
                          className={`d-inline-block rounded border w-100 ${
                            (errors.amount && 'is-invalid') || ''
                          }}`}
                          placeholder={'Proposal amount'}
                          {...register('amount')}
                          value={amount}
                        />
                      </div>
                      {errors.amount ? (
                        <div className='text-danger'>
                          {errors.amount?.message}
                        </div>
                      ) : (
                        <div className='text-success'></div>
                      )}
                    </div>
                    <div className='col-12 p-2'>
                      <div className='d-flex'>
                        <label htmlFor='image'>Proposal image</label>

                        <input
                          type='file'
                          className={`d-inline-block rounded border w-100 ${
                            (errors.image && 'is-invalid') || ''
                          }}`}
                          placeholder={'Proposal image'}
                          {...register('image')}
                        />
                      </div>
                      {errors.image ? (
                        <div className='text-danger'>
                          {errors.image?.message}
                        </div>
                      ) : (
                        <div className='text-success'></div>
                      )}
                    </div>
                  </div>
                  <div>
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

export default ProposalModal
