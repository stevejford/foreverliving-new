"use client"

import * as React from 'react'
import { CustomSelect } from '@/components/ui/custom-select'

interface DateInputProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  label?: string
  error?: string
  startYear?: number
  endYear?: number
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const days = Array.from({ length: 31 }, (_, i) => i + 1)
const currentYear = new Date().getFullYear()
const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

export function DateInput({ 
  value, 
  onChange, 
  label, 
  error 
}: DateInputProps) {
  const [month, setMonth] = React.useState<number | undefined>(value?.getMonth())
  const [day, setDay] = React.useState<number | undefined>(value?.getDate())
  const [year, setYear] = React.useState<number | undefined>(value?.getFullYear())

  const updateDate = React.useCallback((newMonth?: number, newDay?: number, newYear?: number) => {
    if (typeof newMonth === 'number' && typeof newDay === 'number' && typeof newYear === 'number') {
      const date = new Date(newYear, newMonth, newDay)
      onChange?.(date)
    } else {
      onChange?.(undefined)
    }
  }, [onChange])

  React.useEffect(() => {
    if (value) {
      setMonth(value.getMonth())
      setDay(value.getDate())
      setYear(value.getFullYear())
    } else {
      setMonth(undefined)
      setDay(undefined)
      setYear(undefined)
    }
  }, [value])

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      <div className="flex gap-2">
        <CustomSelect
          value={month !== undefined ? months[month] : undefined}
          options={months}
          placeholder="Month"
          onChange={(value) => setMonth(months.indexOf(value))}
          width="w-[150px]"
        />
        <CustomSelect
          value={day?.toString()}
          options={days.map(String)}
          placeholder="Day"
          onChange={(value) => setDay(parseInt(value, 10))}
          width="w-[100px]"
        />
        <CustomSelect
          value={year?.toString()}
          options={years.map(String)}
          placeholder="Year"
          onChange={(value) => setYear(parseInt(value, 10))}
          width="w-[120px]"
        />
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}

export default DateInput;
