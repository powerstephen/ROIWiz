import React from 'react'
export const StepStaffing=({s,setS})=>(<section className='grid md:grid-cols-3 gap-4'>
  <div className='card p-4'><label>Annual crew turnover rate (%)</label><input type='number' step='0.01' className='mt-1' value={s.turnover} onChange={e=>setS(cur=>({...cur,turnover:Number(e.target.value)||0}))}/><p className='hint mt-2'>Example: 0.20 for 20%.</p></div>
  <div className='card p-4'><label>Average cost to replace a crew member</label><input type='number' className='mt-1' value={s.costPerReplacement} onChange={e=>setS(cur=>({...cur,costPerReplacement:Number(e.target.value)||0}))}/></div>
  <div className='card p-4'><label>Annual cost of existing tools/processes replaced</label><input type='number' className='mt-1' value={s.softwareReplaced} onChange={e=>setS(cur=>({...cur,softwareReplaced:Number(e.target.value)||0}))}/></div>
  <div className='card p-4'><label>Tilla annual subscription cost</label><input type='number' className='mt-1' value={s.tillaCost} onChange={e=>setS(cur=>({...cur,tillaCost:Number(e.target.value)||0}))}/></div>
</section>)
