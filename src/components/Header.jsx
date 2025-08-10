import React from 'react'

export const Header = ({ onShare, onExport }) => (
  <div className='flex items-center justify-between py-4'>
    <div className='flex items-center gap-4'>
      {/* Bigger logo */}
      <img src="/tilla-logo.svg" alt="Tilla" className="h-20 w-auto" />
      
      {/* Short, sharp tagline */}
      <span className='text-xl font-semibold text-[#0B00CF] leading-tight'>
        Your Crew-Ops ROI, Calculated
      </span>
    </div>

    <div className='flex items-center gap-2'>
      <button onClick={onShare} className='btn'>Share link</button>
      <button onClick={onExport} className='btn'>Export CSV</button>
      <a
        href='https://www.tilla.tech/'
        target='_blank'
        rel='noreferrer'
        className='btn btn-primary'
      >
        Learn about Tilla
      </a>
    </div>
  </div>
)


