import React from 'react'
import SingleGraph from './SingleGraph' // Make sure to provide the correct path

const Graphs = () => {
  const propVotes = [{x:'prop1', y:4}, {x:'prop2', y:1}]
  const propRate = [
    { x: 'rejected', y: 2 },
    { x: 'approved', y: 4 },
  ]
  return (
    <section className='m-5'>
     
      <div className='row'>
        <SingleGraph type='votes' chartData={propVotes} />
        <SingleGraph type='proposal' chartData={propRate} />
      </div>
    </section>
  )
}

export default Graphs
