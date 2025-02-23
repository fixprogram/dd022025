import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  DialogActions,
  Button,
  Typography
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import data from '../dataseries.json' with { type: 'json' }

import { z } from 'zod'
import { useCallback } from 'react'
import { chartColors, chartTypes } from '../features/chart/chartSlice'

const schema = z.object({
  name: z.string().min(1, 'Required field'),
  type: z.enum(chartTypes),
  color: z.enum(chartColors),
  dataseries: z.string().min(1, 'Required field'),
  xAxisName: z.string(),
  yAxisName: z.string(),
  description: z.string()
})

export type ChartFormData = z.infer<typeof schema>

interface ChartFormProps {
  open: boolean
  title: string
  initialValues: ChartFormData
  onClose: () => void
  onSubmit: (data: ChartFormData) => void
}

export const ChartForm = ({ open, title, initialValues, onClose, onSubmit }: ChartFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ChartFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialValues
  })

  const handleClose = useCallback(() => {
    onClose()
    reset()
  }, [onClose, reset])

  return (
    <Dialog
      open={open}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: handleSubmit(onSubmit)
        }
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            bgcolor: 'background.paper'
          }}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                label={
                  <>
                    Name{' '}
                    <Typography variant="caption" color="error">
                      *
                    </Typography>
                  </>
                }
                {...field}
                error={!!errors.name}
                helperText={errors.name?.message}
                sx={{ marginTop: 1 }}
              />
            )}
          />

          <FormControl error={!!errors.type}>
            <InputLabel id="select-type-label">
              Type{' '}
              <Typography variant="caption" color="error">
                *
              </Typography>
            </InputLabel>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select
                  labelId="select-type-label"
                  {...field}
                  label="Type * "
                  error={!!errors.type}
                >
                  {chartTypes.map(type => (
                    <MenuItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.type && <FormHelperText>{errors.type.message}</FormHelperText>}
          </FormControl>

          <FormControl error={!!errors.color}>
            <InputLabel id="select-color-label">
              Color{' '}
              <Typography variant="caption" color="error">
                *
              </Typography>
            </InputLabel>
            <Controller
              name="color"
              control={control}
              render={({ field }) => (
                <Select
                  labelId="select-color-label"
                  {...field}
                  label="Color * "
                  error={!!errors.color}
                >
                  {chartColors.map(color => (
                    <MenuItem key={color} value={color}>
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.color && <FormHelperText>{errors.color.message}</FormHelperText>}
          </FormControl>

          <FormControl error={!!errors.dataseries}>
            <InputLabel id="select-dataseries-label">
              Dataseries{' '}
              <Typography variant="caption" color="error">
                *
              </Typography>
            </InputLabel>
            <Controller
              name="dataseries"
              control={control}
              render={({ field }) => (
                <Select
                  labelId="select-dataseries-label"
                  {...field}
                  label="Dataseries * "
                  error={!!errors.dataseries}
                >
                  {data.map(({ name }) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.dataseries && <FormHelperText>{errors.dataseries.message}</FormHelperText>}
          </FormControl>

          <Box sx={{ display: 'flex', gap: '10px' }}>
            <Controller
              name="xAxisName"
              control={control}
              render={({ field }) => <TextField label="X-axis Name" {...field} />}
            />
            <Controller
              name="yAxisName"
              control={control}
              render={({ field }) => <TextField label="Y-axis Name" {...field} />}
            />
          </Box>

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField label="Text description" {...field} multiline rows={1} />
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button type="submit">{title}</Button>
      </DialogActions>
    </Dialog>
  )
}
