import React from 'react'
export const StepCompany=({s,setS,Method,presets})=>(<section className='grid md:grid-cols-3 gap-4'>
  <div className='card p-4'><label>Industry</label><select className='mt-1' value={s.industry} onChange={e=>setS(cur=>({...cur,industry:e.target.value}))}>
    {Object.keys(presets).map(opt=><option key={opt} value={opt}>{opt}</option>)}</select></div>
  <div className='card p-4'><label>Fleet size (number of vessels)</label><input type='number' className='mt-1' value={s.vessels} onChange={e=>setS(cur=>({...cur,vessels:Number(e.target.value)||0}))}/></div>
  <div className='card p-4'><label>How are you currently managing crew changes?</label><select className='mt-1' value={s.method} onChange={e=>setS(cur=>({...cur,method:e.target.value}))}>
    <option>{Method.MANUAL}</option><option>{Method.ERP}</option><option>{Method.SPECIALISED}</option></select><p className='hint mt-2'>Affects backend savings assumptions.</p></div>
  <div className='card p-4 md:col-span-3'><div className='flex items-center justify-between'><label>Crew entry</label><div className='toggle'>
    <label><input type='radio' name='crewMode' checked={s.crewEntryMode==='average'} onChange={()=>setS(cur=>({...cur,crewEntryMode:'average'}))}/> Average per vessel</label>
    <label><input type='radio' name='crewMode' checked={s.crewEntryMode==='total'} onChange={()=>setS(cur=>({...cur,crewEntryMode:'total'}))}/> Total crew across all vessels</label></div></div>
    {s.crewEntryMode==='average'
      ? (<div className='mt-2'><label>Average crew per vessel</label><input type='number' className='mt-1' value={s.avgCrewPerVessel} onChange={e=>setS(cur=>({...cur,avgCrewPerVessel:Number(e.target.value)||0}))}/><p className='hint mt-2'>Default set by industry.</p></div>)
      : (<div className='mt-2'><label>Total crew across all vessels</label><input type='number' className='mt-1' value={s.totalCrewAllVessels} onChange={e=>setS(cur=>({...cur,totalCrewAllVessels:Number(e.target.value)||0}))}/></div>)
    }
  </div>
</section>)
