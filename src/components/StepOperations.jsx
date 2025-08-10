import React from 'react'
export const StepOperations=({s,setS})=>(<section className='grid md:grid-cols-3 gap-4'>
  <div className='card p-4'><label>Crew changes per month per vessel</label><input type='number' step='0.1' className='mt-1' value={s.changesPerMonthPerVessel} onChange={e=>setS(cur=>({...cur,changesPerMonthPerVessel:Number(e.target.value)||0}))}/></div>
  <div className='card p-4'><label>Average admin hours per crew change</label><input type='number' step='0.1' className='mt-1' value={s.adminHoursPerChangeToday} onChange={e=>setS(cur=>({...cur,adminHoursPerChangeToday:Number(e.target.value)||0}))}/></div>
  <div className='card p-4'><label>Average admin cost per hour</label><input type='number' className='mt-1' value={s.hourlyCost} onChange={e=>setS(cur=>({...cur,hourlyCost:Number(e.target.value)||0}))}/></div>
</section>)
