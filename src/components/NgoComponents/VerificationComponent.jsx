import React from 'react'

const VerificationComponent = ({status}) => {
 let info =
   status !== 'denied'? (status === 'pending'
     ? [
         'Pending',
         'warning',
         'Your submission is pending approval by the admin. We appreciate your contribution! Our team will review your proposal in less than a week and email you the progress. Thank you for your patience!',
       ]
     : [
         'Unsubmitted',
         'danger',
         'Please submit your details for  KYC verification. Once submitted, your details will be reviewed in less than a week and you will be notified via email. ',
       ]) : ['Denied', 'danger', 'Sorry we cannot verify your details. An email is sent to you for further details.']
  
  
  return (
    <section>
      <div className='w-75 mx-auto shadow border p-5 rounded flex-column d-flex'>
        <div className='d-flex '>
          <h3 className='d-inline-block me-2 text-muted'>KYC status: </h3>
          <span
            className={`small_text text-white bg-${info[1]} p-1 rounded h-50 `}
          >
            {info[0]}
          </span>{' '}
        </div>
        <div className='my-2'>
          <p className='fs-6 text-muted'>{info[2]}</p>
        </div>
        {status === 'unsubmitted' && (
          <div>
            <button
              className='btn btn-outline-warning'
              type='button'
              data-bs-toggle='modal'
              data-bs-target='#verificationModal'
            >
              Submit Details
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default VerificationComponent