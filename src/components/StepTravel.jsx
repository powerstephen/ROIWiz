// src/components/StepTravel.jsx
import React from 'react'

export const StepTravel = ({ s, setS }) => (
  <section className="grid md:grid-cols-3 gap-4">
    <div className="card p-4">
      <label>Average travel cost per crew change</label>
      <input
        type="number"
        className="mt-1"
        value={s.averageTravelCostPerChange}
        onChange={(e) =>
          setS((cur) => ({
            ...cur,
            averageTravelCostPerChange: Number(e.target.value) || 0,
          }))
        }
      />
    </div>

    <div className="card p-4">
      <label>Estimated % late / changed / cancelled travel</label>
      <input
        type="number"
        step="0.01"
        className="mt-1"
        value={s.latePctToday}
        onChange={(e) =>
          setS((cur) => ({
            ...cur,
            latePctToday: Number(e.target.value) || 0,
          }))
        }
      />
      <p className="hint mt-2">Example: 0.20 for 20%.</p>
    </div>

    <div className="card p-4">
      <label>Number of agencies used (optional)</label>
      <input
        type="number"
        min="0"
        className="mt-1"
        placeholder="e.g. 3"
        value={s.agencies ?? ''}   // stays purely UI; not used in calc
        onChange={(e) => {
          const v = e.target.value === '' ? '' : Math.max(0, Number(e.target.value) || 0)
          setS((cur) => ({ ...cur, agencies: v }))
        }}
      />
      <p className="hint mt-2">For demo only; doesn’t change results (yet).</p>
    </div>
  </section>
)
