import React, { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { StepCompany } from './components/StepCompany'
import { StepOperations } from './components/StepOperations'
import { StepTravel } from './components/StepTravel'
import { StepCompliance } from './components/StepCompliance'
import { StepStaffing } from './components/StepStaffing'
import { Summary } from './components/Summary'

const Method = {
  MANUAL: 'Manual (Excel, Emails, etc.)',
  ERP: 'Non-specialised ERP',
  SPECIALISED: 'Specialised Software'
}

const presets = {
  'Cruise': { avgCrewPerVessel: 800, changesPerMonthPerVessel: 3.0, averageTravelCostPerChange: 1500, breachesToday: 3.0, breachCost: 30000 },
  'Cargo/Heavy Goods': { avgCrewPerVessel: 22, changesPerMonthPerVessel: 2.0, averageTravelCostPerChange: 1000, breachesToday: 2.0, breachCost: 15000 },
  'Offshore/Energy': { avgCrewPerVessel: 60, changesPerMonthPerVessel: 2.5, averageTravelCostPerChange: 1200, breachesToday: 3.0, breachCost: 25000 },
  'Other': { avgCrewPerVessel: 40, changesPerMonthPerVessel: 2.0, averageTravelCostPerChange: 1100, breachesToday: 2.0, breachCost: 20000 }
}

const defaultState = {
  // Company
  industry: 'Cargo/Heavy Goods',
  vessels: 50,
  crewEntryMode: 'average', // 'average' | 'total'
  avgCrewPerVessel: presets['Cargo/Heavy Goods'].avgCrewPerVessel,
  totalCrewAllVessels: 0,
  method: Method.MANUAL,

  // Ops & cost
  changesPerMonthPerVessel: presets['Cargo/Heavy Goods'].changesPerMonthPerVessel,
  adminHoursPerChangeToday: 5.0,
  hourlyCost: 35,

  // Travel
  averageTravelCostPerChange: presets['Cargo/Heavy Goods'].averageTravelCostPerChange,
  latePctToday: 0.20, // 20%

  // Compliance
  breachesPerYear: presets['Cargo/Heavy Goods'].breachesToday,
  breachCost: presets['Cargo/Heavy Goods'].breachCost,

  // Staffing
  turnover: 0.20, // 20%
  costPerReplacement: 2500,

  // Tooling
  softwareReplaced: 20000,
  tillaCost: 120000,
}

export default function App() {
  const [s, setS] = useState(defaultState)
  const [step, setStep] = useState(0)
  const [toast, setToast] = useState(false)

  // Update defaults when industry changes
  useEffect(() => {
    const p = presets[s.industry]
    setS(cur => ({
      ...cur,
      avgCrewPerVessel: p.avgCrewPerVessel,
      changesPerMonthPerVessel: p.changesPerMonthPerVessel,
      averageTravelCostPerChange: p.averageTravelCostPerChange,
      breachesPerYear: p.breachesToday,
      breachCost: p.breachCost
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s.industry])

  // Derived quantities
  const totalCrew = s.crewEntryMode === 'total'
    ? s.totalCrewAllVessels
    : s.vessels * s.avgCrewPerVessel

  const annualCrewChanges = s.vessels * s.changesPerMonthPerVessel * 12

  // Backend improvement assumptions
  const adminReduction = ({ [Method.MANUAL]: 0.35, [Method.ERP]: 0.25, [Method.SPECIALISED]: 0.15 })[s.method] || 0.25
  const adminWithTilla = Math.max(s.adminHoursPerChangeToday * (1 - adminReduction), 0)
  const adminSavings = (s.adminHoursPerChangeToday - adminWithTilla) * annualCrewChanges * s.hourlyCost

  const lateReduction = ({ [Method.MANUAL]: 0.40, [Method.ERP]: 0.25, [Method.SPECIALISED]: 0.15 })[s.method] || 0.25
  const lateWithTilla = Math.max(s.latePctToday * (1 - lateReduction), 0)
  const travelSavings = Math.max(s.latePctToday - lateWithTilla, 0) * s.averageTravelCostPerChange * annualCrewChanges

  const compBase = ({ 'Cruise': 0.33, 'Cargo/Heavy Goods': 0.30, 'Offshore/Energy': 0.30, 'Other': 0.25 })[s.industry] || 0.25
  const compAdj = ({ [Method.MANUAL]: 1.2, [Method.ERP]: 1.0, [Method.SPECIALISED]: 0.8 })[s.method] || 1.0
  const compReduction = Math.min(compBase * compAdj, 0.8)
  const complianceSavings = s.breachesPerYear * compReduction * s.breachCost

  const toBase = ({ 'Cruise': 0.12, 'Cargo/Heavy Goods': 0.10, 'Offshore/Energy': 0.10, 'Other': 0.08 })[s.industry] || 0.10
  const toAdj = ({ [Method.MANUAL]: 1.5, [Method.ERP]: 1.0, [Method.SPECIALISED]: 0.7 })[s.method] || 1.0
  const turnoverReduction = Math.min(toBase * toAdj, 0.5)
  const turnoverSavings = (totalCrew * s.turnover) * turnoverReduction * s.costPerReplacement

  const totalGross = adminSavings + travelSavings + complianceSavings + turnoverSavings + s.softwareReplaced
  const netSavings = totalGross - s.tillaCost
  const roi = s.tillaCost > 0 ? netSavings / s.tillaCost : 0
  const paybackMonths = netSavings > 0 ? Math.ceil((s.tillaCost / netSavings) * 12 * 10) / 10 : null

  const steps = [
    { title: 'Company Basics' },
    { title: 'Operations & Scale' },
    { title: 'Travel & Scheduling' },
    { title: 'Compliance & Risk' },
    { title: 'Staffing & Turnover' },
    { title: 'Summary' },
  ]

  const share = () => {
    const p = new URLSearchParams()
    Object.entries(s).forEach(([k, v]) => p.set(k, String(v)))
    const url = `${location.origin}${location.pathname}?${p.toString()}`
    navigator.clipboard.writeText(url).then(() => {
      setToast(true)
      setTimeout(() => setToast(false), 1500)
    })
  }

  const exportCSV = () => {
    const rows = [
      ['Industry', s.industry],
      ['Vessels', s.vessels],
      ['Crew entry mode', s.crewEntryMode],
      ['Average crew per vessel', s.avgCrewPerVessel],
      ['Total crew (derived)', Math.round(totalCrew)],
      ['Method', s.method],
      ['Crew changes / month / vessel', s.changesPerMonthPerVessel],
      ['Admin hours / change (today)', s.adminHoursPerChangeToday],
      ['Admin hours / change (with Tilla)', adminWithTilla.toFixed(2)],
      ['Average travel cost / change', s.averageTravelCostPerChange],
      ['Late/change/cancel % (today)', s.latePctToday],
      ['Late/change/cancel % (with Tilla)', lateWithTilla.toFixed(3)],
      ['Breaches / year (today)', s.breachesPerYear],
      ['Compliance reduction (backend)', compReduction],
      ['Turnover rate', s.turnover],
      ['Cost per replacement', s.costPerReplacement],
      ['Turnover reduction (backend)', turnoverReduction],
      ['Annual crew changes', Math.round(annualCrewChanges)],
      ['Admin savings', Math.round(adminSavings)],
      ['Travel savings', Math.round(travelSavings)],
      ['Compliance savings', Math.round(complianceSavings)],
      ['Turnover savings', Math.round(turnoverSavings)],
      ['Software replaced', Math.round(s.softwareReplaced)],
      ['Tilla subscription', Math.round(s.tillaCost)],
      ['Total gross savings', Math.round(totalGross)],
      ['Net savings', Math.round(netSavings)],
      ['ROI (Net/Tilla)', roi],
      ['Payback (months)', (paybackMonths ?? 'N/A')],
    ]
    const csv = rows.map(r => r.map(x => typeof x === 'string' ? `"${x.replace(/"/g, '""')}"` : x).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'tilla-roi-summary.csv'
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url)
  }

  // Load shared state from URL
  useEffect(() => {
    const p = new URLSearchParams(location.search)
    if (p.size > 0) {
      const loaded = { ...s }
      p.forEach((val, key) => {
        loaded[key] = isNaN(Number(val)) || ['industry', 'method', 'crewEntryMode'].includes(key) ? val : Number(val)
      })
      setS(loaded)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='mx-auto max-w-5xl p-6 space-y-6'>
      <Header onShare={share} onExport={exportCSV} />

      {/* Top card: title + progress ONLY */}
      <div className='card p-4'>
        <div className='flex items-center justify-between'>
          <h1 className='text-xl font-semibold'>{steps[step].title}</h1>
          <span className='text-xs text-slate-500'>Step {step + 1} of {steps.length}</span>
        </div>
        <div className='progress mt-3'>
          <div style={{ width: ((step) / (steps.length - 1)) * 100 + '%' }}></div>
        </div>
      </div>

      {/* Step content */}
      {step === 0 && <StepCompany s={s} setS={setS} Method={Method} presets={presets} />}
      {step === 1 && <StepOperations s={s} setS={setS} />}
      {step === 2 && <StepTravel s={s} setS={setS} />}
      {step === 3 && <StepCompliance s={s} setS={setS} />}
      {step === 4 && <StepStaffing s={s} setS={setS} />}
      {step === 5 && (
        <Summary
          s={s}
          totals={{
            totalCrew,
            annualCrewChanges,
            adminSavings,
            travelSavings,
            complianceSavings,
            turnoverSavings,
            totalGross,
            netSavings,
            roi,
            paybackMonths
          }}
        />
      )}

      {/* Navigation — single bottom-right bar */}
      <div className="mt-8 flex justify-end gap-3">
        {step > 0 && (
          <button
            onClick={() => setStep(Math.max(step - 1, 0))}
            className="px-5 py-3 text-base font-medium border rounded-xl hover:bg-slate-50 transition"
          >
            Back
          </button>
        )}
        <button
          onClick={() => setStep(Math.min(step + 1, steps.length - 1))}
          className="px-6 py-3 text-lg font-semibold text-white rounded-xl transition bg-tilla-primary hover:brightness-110 disabled:opacity-50"
        >
          {step === steps.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>

      {/* Toast */}
      <div className={'toast ' + (toast ? 'show' : '')}>Link copied!</div>
    </div>
  )
}
