import * as React from 'react'
import { IoChevronDown } from 'react-icons/io5'

interface CustomSelectProps {
  value?: string
  options: string[]
  placeholder: string
  onChange: (value: string) => void
  width?: string
}

export function CustomSelect({ 
  value, 
  options, 
  placeholder, 
  onChange,
  width = 'w-full'
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={ref} className={`relative ${width}`}>
      <button
        type="button"
        className={`
          flex items-center justify-between w-full px-3 py-2 text-left
          border rounded-md shadow-sm bg-background
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
          ${isOpen ? 'border-primary' : 'border-input'}
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? 'text-foreground' : 'text-muted-foreground'}>
          {value || placeholder}
        </span>
        <IoChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-background border border-input rounded-md shadow-lg">
          <div className="py-1 max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option}
                className={`
                  w-full px-3 py-2 text-left hover:bg-accent hover:text-accent-foreground
                  ${option === value ? 'bg-accent text-accent-foreground' : ''}
                `}
                onClick={() => {
                  onChange(option)
                  setIsOpen(false)
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
