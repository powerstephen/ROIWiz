import React from 'react'
const fmtCurrency=n=>Number.isFinite(n)?n.toLocaleString(void 0,{style:'currency',currency:'USD',maximumFractionDigits:0}):'-'
const fmtNumber=n=>Number.isFinite(n)?n.toLocaleString(void 0,{maximumFractionDigits:0}):'-'
const fmtPercent=n=>Number.isFinite(n)?`${(n*100).toFixed(1)}%`:'-'
export const Summary=({s,totals})=>{ const {totalCrew,annualCrewChanges,adminSavings,travelSavings,complianceSavings,turnoverSavings,totalGross,netSavings,roi,paybackMonths}=totals
  return (<section className='grid lg:grid-cols-3 gap-4'>
    <div className='card p-5'><h3 className='font-semibold mb-3'>Scale & Activity</h3><div className='space-y-1 text-sm'>
      <div className='flex justify-between'><span>Total crew</span><span className='font-medium'>{fmtNumber(totalCrew)}</span></div>
      <div className='flex justify-between'><span>Annual crew changes</span><span className='font-medium'>{fmtNumber(annualCrewChanges)}</span></div>
    </div></div>
    <div className='card p-5'><h3 className='font-semibold mb-3'>Savings (annual)</h3><div className='space-y-1 text-sm'>
      <div className='flex justify-between'><span>Admin savings</span><span className='font-medium'>{fmtCurrency(adminSavings)}</span></div>
      <div className='flex justify-between'><span>Travel savings</span><span className='font-medium'>{fmtCurrency(travelSavings)}</span></div>
      <div className='flex justify-between'><span>Compliance & risk savings</span><span className='font-medium'>{fmtCurrency(complianceSavings)}</span></div>
      <div className='flex justify-between'><span>Turnover savings</span><span className='font-medium'>{fmtCurrency(turnoverSavings)}</span></div>
    </div></div>
    <div className='card p-5'><h3 className='font-semibold mb-3'>Outcome</h3><div className='space-y-1 text-sm'>
      <div className='flex justify-between'><span>Total gross savings</span><span className='font-medium'>{fmtCurrency(totalGross)}</span></div>
      <div className='flex justify-between'><span>Net savings</span><span className='font-medium'>{fmtCurrency(netSavings)}</span></div>
      <div className='flex justify-between'><span>ROI (Net / Tilla)</span><span className='font-medium'>{fmtPercent(roi)}</span></div>
      <div className='flex justify-between'><span>Payback period</span><span className='font-medium'>{paybackMonths?`${paybackMonths.toFixed(1)} months`:'N/A'}</span></div>
    </div></div>
  </section>)}
