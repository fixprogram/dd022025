import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormHelperText
} from '@mui/material'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod';

import { useAppDispatch } from '../../hooks'
import data from '../../dataseries.json' with {type: 'json'}

import AddIcon from '@mui/icons-material/Add'
import { Controller, useForm } from 'react-hook-form'
import { Chart, createChart } from './chartSlice'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  color: z.string().min(1, 'Color is required'),
  dataseries: z.string().min(1, 'Dataseries is required'),
  xAxisName: z.string(), 
  yAxisName: z.string(), 
  description: z.string(),
});

export const AddChart = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      type: '',
      color: '',
      dataseries: '',
      xAxisName: '',
      yAxisName: '',
      description: ''
    },
  });

  const [modalOpen, setModalOpen] = useState(false)
  const dispatch = useAppDispatch()

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const onSubmit = (data: Omit<Chart, 'id'>) => {
    dispatch(createChart(data))
    handleCloseModal()
  }

  return (
    <>
      <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenModal} sx={{height: "44px"}}>
        Add Chart
      </Button>

      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}

        slotProps={{
          paper: {
            component: 'form',
            onSubmit: handleSubmit(onSubmit)
          }
        }}
      >
        <DialogTitle>Add Chart</DialogTitle>
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
                  label="Name"
                  {...field}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  sx={{ marginTop: 1 }}

                />
              )}
            />

            <FormControl error={!!errors.type}>
              <InputLabel id="select-type-label" error={!!errors.type}>
                Type
              </InputLabel>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select
                    labelId="select-type-label"
                    id="select-type-label"
                    {...field}
                    label="Type"
                    error={!!errors.type}
                  >
                    <MenuItem value={'line'}>Line</MenuItem>
                    <MenuItem value={'bar'}>Bar</MenuItem>
                  </Select>
                )}
              />
              {errors.type && (
                <FormHelperText sx={{ ml: 2, mt: 1, color: 'error.main', fontSize: '0.75rem' }}>
                  {errors.type.message}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl error={!!errors.color}>
              <InputLabel id="select-color-label" error={!!errors.color}>
                Color
              </InputLabel>
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <Select
                    labelId="select-color-label"
                    id="select-color-label"
                    {...field}
                    label="Color"
                    error={!!errors.color}
                  >
                    <MenuItem value={'blue'}>Blue</MenuItem>
                    <MenuItem value={'red'}>Red</MenuItem>
                    <MenuItem value={'green'}>Green</MenuItem>
                    <MenuItem value={'yellow'}>Yellow</MenuItem>
                    <MenuItem value={'orange'}>Orange</MenuItem>
                  </Select>
                )}
              />
              {errors.color && (
                <Box sx={{ ml: 2, mt: 1, color: 'error.main', fontSize: '0.75rem' }}>
                  {errors.color.message}
                </Box>
              )}
            </FormControl>

            <FormControl error={!!errors.dataseries}>
              <InputLabel id="select-dataseries-label" error={!!errors.dataseries}>
                Dataseries
              </InputLabel>
              <Controller
                name="dataseries"
                control={control}
                render={({ field }) => (
                  <Select
                    labelId="select-dataseries-label"
                    id="select-dataseries-label"
                    {...field}
                    label="Dataseries"
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
              {errors.dataseries && (
                <Box sx={{ ml: 2, mt: 1, color: 'error.main', fontSize: '0.75rem' }}>
                  {errors.dataseries.message}
                </Box>
              )}
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
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button type="submit">Add chart</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
