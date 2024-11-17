"use client"

import * as React from "react"
import { format, isValid, subYears } from "date-fns"
import { Calendar as CalendarIcon, Info } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Constants for date ranges
const EARLIEST_YEAR = 1900
const DEFAULT_YEAR = 1950
const CURRENT_YEAR = new Date().getFullYear()

interface DatePickerProps {
  date?: Date
  onChange?: (date?: Date) => void
  label?: string
  disabled?: boolean
  minDate?: Date
  maxDate?: Date
  placeholder?: string
  error?: string
  hint?: string
}

export function DatePicker({
  date,
  onChange,
  label,
  disabled = false,
  minDate,
  maxDate,
  placeholder = "Select date",
  error,
  hint,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [month, setMonth] = React.useState<Date>(date || new Date(DEFAULT_YEAR, 0))
  
  // Generate years array from EARLIEST_YEAR to current year
  const years = React.useMemo(() => {
    return Array.from(
      { length: CURRENT_YEAR - EARLIEST_YEAR + 1 },
      (_, i) => CURRENT_YEAR - i
    )
  }, [])

  // Group years by decades for easier navigation
  const yearGroups = React.useMemo(() => {
    const groups: { [key: string]: number[] } = {}
    years.forEach(year => {
      const decade = Math.floor(year / 10) * 10
      if (!groups[decade]) {
        groups[decade] = []
      }
      groups[decade].push(year)
    })
    return groups
  }, [years])

  const handleYearSelect = (year: string) => {
    const newDate = new Date(month)
    newDate.setFullYear(parseInt(year))
    setMonth(newDate)
  }

  const handleSelect = (selectedDate?: Date) => {
    if (selectedDate) {
      const isValidDate = isValid(selectedDate)
      if (isValidDate) {
        if (minDate && selectedDate < minDate) {
          return
        }
        if (maxDate && selectedDate > maxDate) {
          return
        }
      }
    }
    onChange?.(selectedDate)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-2">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        {hint && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">{hint}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              error && "border-red-500 focus:ring-red-500"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0"
          align="start"
        >
          <div className="p-3 border-b">
            <div className="flex flex-col space-y-2">
              <Select
                value={month.getFullYear().toString()}
                onValueChange={handleYearSelect}
              >
                <SelectTrigger 
                  className="w-full"
                  aria-label="Select year"
                >
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent className="overflow-y-auto">
                  <div className="p-1">
                    {Object.entries(yearGroups).map(([decade, decadeYears]) => (
                      <div key={decade} className="mb-2">
                        <div className="text-sm font-medium text-muted-foreground px-2 py-1.5 sticky top-0 bg-popover">
                          {decade}s
                        </div>
                        {decadeYears.map((year) => (
                          <SelectItem
                            key={year}
                            value={year.toString()}
                            className="pl-6"
                          >
                            {year}
                          </SelectItem>
                        ))}
                      </div>
                    ))}
                  </div>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Use dropdown to quickly navigate to a specific year
              </p>
            </div>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            defaultMonth={month}
            onMonthChange={setMonth}
            disabled={(date) => {
              if (disabled) return true
              if (date < new Date(EARLIEST_YEAR, 0)) return true
              if (date > new Date()) return true
              if (minDate && date < minDate) return true
              if (maxDate && date > maxDate) return true
              return false
            }}
            initialFocus
            fromYear={EARLIEST_YEAR}
            toYear={CURRENT_YEAR}
          />
        </PopoverContent>
      </Popover>
      {error && (
        <p className="mt-1 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
