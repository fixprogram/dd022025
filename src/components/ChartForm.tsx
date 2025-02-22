// import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
// import { FC, useState } from 'react'
// import { Chart } from '../features/chart/chartSlice'
// import data from '../dataseries.json' with {type: 'json'}
// import { useForm } from 'react-hook-form'

// export const ChartForm: FC<{
//   initialData?: Partial<Chart>
// }> = ({ initialData }) => {
//   const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
//     // resolver: yupResolver(chartFormSchema),
//     defaultValues: {
//       name: initialData?.name || '',
//       type: initialData?.type || '',
//       color: initialData?.color || '',
//       dataseries: initialData?.dataseries || '',
//       xAxisName: initialData?.xAxisName || '',
//       yAxisName: initialData?.yAxisName || '',
//       description: initialData?.description || ''
//     }
//   })

//   // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   setFormData({ ...formData, [e.target.name]: e.target.value })
//   // }

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         gap: 2,
//         bgcolor: 'background.paper'
//       }}
//     >
//       <TextField
//         label="Name"
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//         sx={{ marginTop: 1 }}
//         required
//       />

//       <FormControl>
//         <InputLabel id="select-type-label">Type</InputLabel>
//         <Select
//           labelId="select-type-label"
//           id="select-type-label"
//           name='type'
//           value={formData.type}
//           label="Type"
//           onChange={handleChange}
//           required
//         >
//           <MenuItem value={'line'}>Line</MenuItem>
//           <MenuItem value={'bar'}>Bar</MenuItem>
//         </Select>
//       </FormControl>

//       <FormControl>
//         <InputLabel id="select-color-label">Color</InputLabel>
//         <Select
//           labelId="select-color-label"
//           id="select-color-label"
//           name="color"
//           value={formData.color}
//           label="Color"
//           onChange={handleChange}
//           required
//         >
//           <MenuItem value={'blue'}>Blue</MenuItem>
//           <MenuItem value={'red'}>Red</MenuItem>
//           <MenuItem value={'green'}>Green</MenuItem>
//           <MenuItem value={'yellow'}>Yellow</MenuItem>
//           <MenuItem value={'orange'}>Orange</MenuItem>
//         </Select>
//       </FormControl>

// <FormControl>
//         <InputLabel id="select-dataseries-label">Dataseries</InputLabel>
//         <Select
//           labelId="select-dataseries-label"
//           id="select-dataseries-label"
//           name="dataseries"
//           value={formData.dataseries}
//           label="Dataseries"
//           onChange={handleChange}
//           required
//         >
//       {data.map(({name}) => <MenuItem key={name} value={name}>{name}</MenuItem>)}
//         </Select>
//       </FormControl>

//       <Box sx={{display: 'flex', gap: '10px'}}>

//       <TextField
//         label="X-axis Name"
//         name="xAxisName"
//         value={formData.xAxisName}
//         onChange={handleChange}
//       />
//       <TextField
//         label="Y-axis Name"
//         name="yAxisName"
//         value={formData.yAxisName}
//         onChange={handleChange}
//       />
//       </Box>
//       <TextField
//         label="Text description"
//         name="description"
//         value={formData.description}
//         onChange={handleChange}
//         multiline
//         rows={1}
//       />
//     </Box>
//   )
// }
