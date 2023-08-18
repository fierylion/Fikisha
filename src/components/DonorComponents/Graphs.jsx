import React from 'react'
import SingleGraph from './SingleGraph' // Make sure to provide the correct path

const Graphs = () => {
  return (
    <section className='m-5'>
     
      <div className='row'>
        <SingleGraph type='order' />
       
      </div>
    </section>
  )
}

export default Graphs
