import React from 'react'
import logoUrl from '/tilla-logo.svg'
export const Header=({onShare,onExport})=>(<div className='flex items-center justify-between'>
  <div className='flex items-center gap-3'><img src={logoUrl} alt='Tilla' className='h-8 w-auto'/><span className='badge'>ROI Wizard</span></div>
  <div className='flex items-center gap-2'><button onClick={onShare} className='btn'>Share link</button><button onClick={onExport} className='btn'>Export CSV</button><a href='https://www.tilla.technology' target='_blank' rel='noreferrer' className='btn btn-primary'>Learn about Tilla</a></div>
</div>)
