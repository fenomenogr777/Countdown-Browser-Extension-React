import { Box, InputBase, Typography, Stack, IconButton } from '@mui/material'
import { useReducer, useState } from 'react'
import Interval from './Interval'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'

function TimerCount() {
   //  HOUR+MINUTE+SECOND CONVERTED ON TOTAL SECONDS
   const [sum, setSum] = useState('')
   const [start, setStart] = useState(false)
   //  WHEN FALSE START COUNTDOWN + CHANGE BTN TO PAUSE
   const [hide, setHide] = useState(true)

   const reducer = (state, action) => {
      switch (action.type) {
         case 'hour':
            return {
               ...state,
               hour: action.payload,
            }

         case 'minute':
            return {
               ...state,
               minute: action.payload,
            }
         case 'second':
            return {
               ...state,
               second: action.payload,
            }

         default:
            return state
      }
   }

   const [state, dispatch] = useReducer(reducer, {
      hour: '',
      minute: '',
      second: '',
   })

   // SETUP COUNTDOWN TIME
   const handleChange = e => {
      if (e.target.name === 'hour') {
         dispatch({
            type: 'hour',
            payload: +e.target.value,
         })
      }
      if (e.target.name === 'minute') {
         dispatch({
            type: 'minute',
            payload: +e.target.value,
         })
      }
      if (e.target.name === 'second') {
         dispatch({
            type: 'second',
            payload: +e.target.value,
         })
      }
   }

   // START COUNTDOWN
   const startCountdown = () => {
      setSum(state.hour * 3600 + state.minute * 60 + state.second)
      setStart(!start)
      setHide(!hide)
   }

   return (
      <Stack
         direction='column'
         alignItems='center'
         gap={2}
         width="280px"
         >
          
         <Box
            borderRadius='9px'
            bgcolor='yellow'
            padding='0.8rem 1.6rem'>
            <Box>
               <Stack
                  direction='column'
                  alignItems='start'>
                  {/* LABEL */}
                  {hide ? (
                     <Typography>Select Countdown Time</Typography>
                  ) : (
                     <Typography>Countdown Time</Typography>
                  )}

                  <Box>
                     {/* COUNTDOWN */}
                     {hide ? (
                        <Stack
                           direction='row'
                           alignItems='center'
                           width='210px'
                           bgcolor='white'
                           border='3px solid black'>
                           <InputBase
                              name='hour'
                              value={state.hour}
                              onChange={handleChange}
                              placeholder='hour'
                              type='number'
                              sx={{
                                 borderRight: '3px solid black',
                              }}
                           />
                           <InputBase
                              name='minute'
                              type='number'
                              value={state.minute}
                              onChange={handleChange}
                              placeholder='min'
                              sx={{ borderRight: '3px solid black' }}
                           />
                           <InputBase
                              name='second'
                              value={state.second}
                              placeholder='sec'
                              onChange={handleChange}
                              type='number'
                           />
                        </Stack>
                     ) : (
                        <Box>{start && <Interval time={sum} />}</Box>
                     )}

                     {/* BUTTONS */}
                     <Stack direction='row'>
                        {hide && (
                           <IconButton
                              color='primary'
                              onClick={startCountdown}>
                              <PlayCircleFilledIcon />
                           </IconButton>
                        )}
                     </Stack>
                  </Box>
               </Stack>
            </Box>

            {/* START COUNDOWN WHEN CLICK START AND START=TRUE */}
         </Box>
      </Stack>
   )
}
export default TimerCount
