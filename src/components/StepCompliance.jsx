import React from 'react'
export const StepCompliance=({s,setS})=>(<section className='grid md:grid-cols-3 gap-4'>
  <div className='card p-4'><label>Compliance breaches per year</label><input type='number' className='mt-1' value={s.breachesPerYear} onChange={e=>setS(cur=>({...cur,breachesPerYear:Number(e.target.value)||0}))}/></div>
  <div className='card p-4'><label>Average cost per compliance breach</label><input type='number' className='mt-1' value={s.breachCost} onChange={e=>setS(cur=>({...cur,breachCost:Number(e.target.value)||0}))}/></div>
  <div className='card p-4'><h3 className='font-semibold mb-2'>Note</h3><p className='hint'>Reduction in breaches is auto-estimated by industry + method.</p></div>
</section>)
