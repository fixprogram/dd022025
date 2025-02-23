import { FC, forwardRef, HTMLProps, useEffect, useState } from 'react'
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
  decreaseMonth: () => void
  increaseMonth: () => void
}

const CustomHeader: FC<CustomHeaderProps> = ({ date, decreaseMonth, increaseMonth }) => {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}
    >
      <IconButton
        sx={{ p: '2px', color: 'rgba(0, 0, 0, 0.54)' }}
        onClick={decreaseMonth}
        title="Previous month"
        aria-label="Previous month"
      >
        <ChevronLeftOutlinedIcon />
      </IconButton>
      <Typography
        variant="subtitle1"
        id="month-year-label"
        sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.87)' }}
      >
        {dayjs(date).format('MMMM YYYY')}
      </Typography>
      <IconButton
        sx={{ p: '2px', color: 'rgba(0, 0, 0, 0.54)' }}
        onClick={increaseMonth}
        title="Next month"
        aria-label="Next month"
      >
        <ChevronRightOutlinedIcon />
      </IconButton>
    </Box>
  )
}

interface CustomDateInputProps extends HTMLProps<HTMLInputElement> {
  value?: string
}

export const DateRangePicker: FC<{
  initialDates: [Date, Date]
  onChange: (dates: [Date, Date]) => void
}> = ({ initialDates, onChange }) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>(initialDates)
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const formatDate = (date: Date | null) => {
    if (!date) return ''
    return dayjs(date).format('D/M/YYYY')
  }

  const CustomDateInput = forwardRef<HTMLInputElement, CustomDateInputProps>(
    ({ value, onClick }, ref) => (
      <TextField
        id={'date-picker'}
        value={value}
        onClick={onClick}
        variant="outlined"
        label="Period"
        ref={ref}
        sx={{ mt: 1, width: 233 }}
        size="small"
        slotProps={{
          input: {
            endAdornment: <CalendarIcon color={'secondary'} />,
            value: formatDate(startDate) + ' - ' + formatDate(endDate)
          }
        }}
      />
    )
  )

  useEffect(() => {
    setStartDate(dateRange[0])
    setEndDate(dateRange[1])
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

          const [start, end] = update
          if (start && end) {
            onChange([start, end])
          }
        }}
        calendarStartDay={1}
        customInput={<CustomDateInput />}
        renderCustomHeader={props => {
          return (
            <CustomHeader
              date={props.date}
              decreaseMonth={props.decreaseMonth}
              increaseMonth={props.increaseMonth}
            />
          )
        }}
      />
    </FormControl>
  )
}
