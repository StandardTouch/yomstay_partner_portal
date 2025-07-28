"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import axios from "axios"
import { debounce } from "lodash"

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Select...",
  disabled = false,
  onFocus,
  onBlur,
  fetchUrl,
  searchParam = "search",
  idParam = "id",
  idValue,
}) {
  const [open, setOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [fetchedOptions, setFetchedOptions] = React.useState(options)

  // Debounced search function
  const debouncedSearch = React.useCallback(
    debounce(async (term) => {
      if (!fetchUrl) {
        setFetchedOptions(options)
        return
      }
      
      try {
        setLoading(true)
        const params = { [searchParam]: term }
        if (idParam && idValue) {
          params[idParam] = idValue
        }
        
        const response = await axios.get(fetchUrl, { params })
        const apiOptions = (response.data.data || []).map(item => ({
          value: item.id,
          label: item.name
        }))
        setFetchedOptions(apiOptions)
      } catch (error) {
        console.error("Search error:", error)
        setFetchedOptions([])
      } finally {
        setLoading(false)
      }
    }, 500),
    [fetchUrl, idParam, idValue, options]
  )

  React.useEffect(() => {
    if (searchTerm && fetchUrl) {
      debouncedSearch(searchTerm)
    } else {
      setFetchedOptions(options)
    }
    
    return () => debouncedSearch.cancel()
  }, [searchTerm, options, fetchUrl])

  React.useEffect(() => {
    if (open && onFocus) onFocus()
    if (!open && onBlur) onBlur()
  }, [open])

  // Combine initial options with fetched options
  const displayOptions = searchTerm ? fetchedOptions : [...options, ...fetchedOptions.filter(opt => 
    !options.some(o => o.value === opt.value))
  ]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled}
        >
          {value
            ? displayOptions.find((opt) => opt.value === value || opt.label === value)?.label
            : placeholder}
          <ChevronsUpDown className="opacity-50 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start" side="bottom" style={{ width: "var(--radix-popover-trigger-width)" }}>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={`Search ${placeholder.toLowerCase()}`}
            className="h-9"
            value={searchTerm}
            onValueChange={setSearchTerm}
          />
          <CommandList>
            {loading ? (
              <CommandEmpty>Loading...</CommandEmpty>
            ) : (
              <>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {displayOptions.map((opt) => (
                    <CommandItem
                      key={opt.value}
                      value={opt.value}
                      onSelect={(currentValue) => {
                        const selectedOption = displayOptions.find(opt => opt.value === currentValue)
                        onChange({ 
                          value: selectedOption.value,
                          label: selectedOption.label
                        })
                        setSearchTerm("")
                        setOpen(false)
                      }}
                    >
                      {opt.label}
                      <Check
                        className={
                          (value === opt.value || value === opt.label)
                            ? "ml-auto opacity-100"
                            : "ml-auto opacity-0"
                        }
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}