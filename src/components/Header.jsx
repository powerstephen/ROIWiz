import React from 'react'

export const Header = ({ onShare, onExport }) => (
  <div className='flex items-center justify-between'>
    <div className='flex items-center gap-3'>
      <img src="/tilla-logo.svg" alt="Tilla" className="h-8 w-auto" />
      <span className='badge'>ROI Wizard</span>
    </div>
    <div className='flex items-center gap-2'>
      <button onClick={onShare} className='btn'>Share link</button>
      <button onClick={onExport} className='btn'>Export CSV</button>
      <a href='https://www.tilla.tech/' target='_blank' rel='noreferrer' className='btn btn-primary'>
        Learn about Tilla
      </a>
    </div>
  </div>
)

