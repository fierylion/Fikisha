import React, { useState } from 'react'
import Chart from 'react-apexcharts'

const SingleGraph = ({ type, chartData }) => {
  

  const options = {
    title: {
      text: `${type === 'votes' ? 'Votes Over Proposal' : 'Proposal Rejection Rate'} `,
      align: 'left',
      style: {
        fontSize: '13px',
        color: '#9915f7',
        marginRight: '20px',
      },
    },
    stroke: {
      curve: 'smooth',
    },

    chart: {
      id: `${type}-chart`,
      animation: {
        speed: 1300,
      },
      background: 'tranparent',
    },

    axisBorder: {
      color: 'transparent', // Set the axis border color to transparent
    },
    xaxis: {
      type: 'category',
    },
  }

  const series = [
    {
      name: type === 'votes' ? 'Votes' : 'Proposal',
      data: chartData,
    },
  ]

  return (
    <div className='col-md-6 p-1 my-3'>
     
      <Chart options={options} series={series} type='line' height={400} />
   
    </div>
  )
}

export default SingleGraph
