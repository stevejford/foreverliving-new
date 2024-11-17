"use client"

import * as React from "react"
import { IoChevronDown } from "react-icons/io5"

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

function CustomSelect({ 
  value, 
  options, 
  placeholder, 
  onChange,
  width = "w-[200px]"
}: { 
  value?: string
  options: string[]
  placeholder: string
  onChange: (value: string) => void
  width?: string
}) {
  const [isActive, setIsActive] = React.useState(false)
  
  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest(".dropdown")) {
        setIsActive(false)
      }
    }
    
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  return (
    <div className={`${width} relative dropdown`}>
      <button
        className="w-full bg-[#fff] border border-[#d1d1d1] rounded-xl justify-between px-3 py-2 flex items-center gap-2 cursor-pointer"
        onClick={() => setIsActive(!isActive)}
        type="button"
      >
        <span className="truncate">{value || placeholder}</span>
        <IoChevronDown
          className={`${
            isActive ? "rotate-[180deg]" : "rotate-0"
          } transition-all duration-300 text-[1.2rem] flex-shrink-0`}
        />
      </button>
      <div
        className={`${
          isActive ? "opacity-100 scale-[1]" : "opacity-0 scale-[0.8] pointer-events-none"
        } w-full absolute top-[calc(100%+4px)] left-0 right-0 z-40 bg-[#fff] rounded-xl overflow-hidden transition-all duration-300 ease-in-out`}
        style={{
          boxShadow: "0 15px 60px -15px rgba(0, 0, 0, 0.3)",
          maxHeight: "200px",
        }}
      >
        <div className="overflow-y-auto max-h-[200px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {options.map((option, index) => (
            <p
              className="py-2 px-4 hover:bg-[#ececec] transition-all duration-200"
              key={index}
              onClick={() => {
                onChange(option)
                setIsActive(false)
              }}
            >
              {option}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export function DateInput({ 
  value, 
  onChange, 
  label, 
  error,
  startYear = 1950,
  endYear = new Date().getFullYear()
}: DateInputProps) {
  const [month, setMonth] = React.useState<number | undefined>(value?.getMonth())
  const [day, setDay] = React.useState<number | undefined>(value?.getDate())
  const [year, setYear] = React.useState<number | undefined>(value?.getFullYear())

  const years = React.useMemo(() => {
    return Array.from(
      { length: endYear - startYear + 1 }, 
      (_, i) => (endYear - i).toString()
    )
  }, [startYear, endYear])

  const daysInMonth = React.useMemo(() => {
    if (!month || !year) return 31
    return new Date(parseInt(year), month + 1, 0).getDate()
  }, [month, year])

  const days = React.useMemo(() => 
    Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString()),
    [daysInMonth]
  )

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
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="flex gap-2">
        <CustomSelect
          value={month !== undefined ? months[month] : undefined}
          options={months}
          placeholder="Month"
          onChange={(value) => {
            const newMonth = months.indexOf(value)
            setMonth(newMonth)
            updateDate(newMonth, day, year)
          }}
          width="w-[140px]"
        />

        <CustomSelect
          value={day?.toString()}
          options={days}
          placeholder="Day"
          onChange={(value) => {
            const newDay = parseInt(value)
            setDay(newDay)
            updateDate(month, newDay, year)
          }}
          width="w-[90px]"
        />

        <CustomSelect
          value={year?.toString()}
          options={years}
          placeholder="Year"
          onChange={(value) => {
            const newYear = parseInt(value)
            setYear(newYear)
            updateDate(month, day, newYear)
          }}
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
