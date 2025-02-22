import { FC, forwardRef, HTMLProps, Ref, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './DateRangePicker.css'
import CalendarIcon from '@mui/icons-material/CalendarMonthOutlined'

import { FormControl, TextField } from '@mui/material'

import { Box, IconButton, Typography } from '@mui/material'
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined'
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined'
import dayjs from 'dayjs'

interface CustomHeaderProps {
  date: Date
  changeYear: (year: number) => void
  changeMonth: (month: number) => void
  decreaseMonth: () => void
  increaseMonth: () => void
}

export const years = Array.from({ length: new Date().getFullYear() - 1989 + 1 }, (_, i) =>
  (i + 1990).toString()
)

export const months = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC'
]

const CustomHeader: FC<CustomHeaderProps> = ({ date, decreaseMonth, increaseMonth }) => {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}
    >
      <IconButton
        className="MuiButtonBase-root MuiIconButton-root MuiIconButton-edgeEnd MuiIconButton-sizeMedium MuiPickersArrowSwitcher-button MuiPickersArrowSwitcher-previousIconButton css-11wxb"
        sx={{ p: '2px', color: 'rgba(0, 0, 0, 0.54)' }} // MUI icon button style - adjust color
        onClick={decreaseMonth}
        title="Previous month"
        aria-label="Previous month"
      >
        <ChevronLeftOutlinedIcon className="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit MuiPickersArrowSwitcher-leftArrowIcon css-1cw4hi4" />{' '}
      </IconButton>
      <Typography
        className="MuiTypography-root MuiTypography-subtitle1 css-16rlg6l" // Apply MUI class
        variant="subtitle1"
        id="month-year-label" // Add an ID if needed for accessibility
        sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.87)' }} // MUI typography style - adjust color
      >
        {dayjs(date).format('MMMM YYYY')} {/* Display Month and Year */}
      </Typography>
      <IconButton
        className="MuiButtonBase-root MuiIconButton-root MuiIconButton-edgeStart MuiIconButton-sizeMedium MuiPickersArrowSwitcher-button MuiPickersArrowSwitcher-nextIconButton css-10giph5"
        sx={{ p: '2px', color: 'rgba(0, 0, 0, 0.54)' }} // MUI icon button style - adjust color
        onClick={increaseMonth}
        title="Next month"
        aria-label="Next month"
      >
        <ChevronRightOutlinedIcon className="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit MuiPickersArrowSwitcher-rightArrowIcon css-1cw4hi4" />{' '}
      </IconButton>
    </Box>
  )
}

interface CustomDateInputProps extends HTMLProps<HTMLButtonElement> {
  value?: string
}

export const DateRangePicker: FC<{
  initialDates: [Date, Date]
  onChange: (dates: [Date, Date]) => void
}> = ({ initialDates, onChange }) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>(initialDates)
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

  const formatDate = (date: Date | null) => {
    if (!date) return ''
    return dayjs(date).format('D/M/YYYY') // Use dayjs to format the date
  }

  const CustomDateInput = forwardRef<HTMLButtonElement, CustomDateInputProps>(
    ({ value, onClick }, ref) => (
      <TextField
        id={'date-picker'}
        value={value}
        onClick={onClick}
        variant="outlined"
        label="Period"
        ref={ref as Ref<HTMLDivElement>}
        sx={{ mt: 1, width: 233 }}
        size="small"
        slotProps={{ input: { endAdornment: <CalendarIcon color={'secondary'} /> } }}
      />
    )
  )

  useEffect(() => {
    setStartDate(dateRange[0] || undefined)
    setEndDate(dateRange[1] || undefined)
  }, [dateRange])

  return (
    <FormControl variant="outlined" fullWidth sx={{ maxWidth: 233 }}>
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        formatWeekDay={nameOfDay => nameOfDay.slice(0, 1)}
        endDate={endDate}
        onChange={update => {
          setDateRange(update)

          if (update.filter(Boolean).length === 2) {
            onChange(update)
          }
        }}
        calendarStartDay={1}
        customInput={
          <CustomDateInput value={formatDate(startDate) + ' - ' + formatDate(endDate)} />
        } // Pass the formatted date
        renderCustomHeader={props => {
          return (
            <CustomHeader
              date={props.date}
              changeYear={props.changeYear}
              changeMonth={props.changeMonth}
              decreaseMonth={props.decreaseMonth}
              increaseMonth={props.increaseMonth}
            />
          )
        }}
      />
    </FormControl>
  )
}
