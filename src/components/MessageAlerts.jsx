import React from 'react'

const MessageAlerts = ({msg, color}) => {
  return (
    <section>
      <div className={`alert alert-${color} alert-dismissible`}>
        <button type='button' className='btn-close' data-bs-dismiss='alert' />
        <div className='small_text'>{msg}</div>
      </div>
    </section>
  )
}

export default MessageAlerts