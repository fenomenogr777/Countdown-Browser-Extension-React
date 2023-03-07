import { Box, IconButton, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import NotStartedIcon from '@mui/icons-material/NotStarted'
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled'
import StopCircleIcon from '@mui/icons-material/StopCircle'

function Interval({ time }) {
   const [sum, setSum] = useState(time)
   const [pause, setPause] = useState(false)
   const [reset, setReset] = useState(false)

   const handleReset = () => {
      reset(sum)
      console.log(sum)
      setHour(prev => ({
         ...prev,
         time: sum,
      }))
   }

   const handlePause = () => {
      setPause(!pause)
   }

   const [hour, setHour] = useState({
      time: time,
      hour: Math.trunc(time / 3600),
      minute: Math.trunc((time / 60) % 60),
      second: Math.trunc(time % 60),
   })

   useEffect(() => {
      // GUARD ,WHEN 0 STOP
      if (hour.time < 1) return

      // WHEN WE CLICK PAUSE
      if (pause) return

      console.log(hour)
      // INTERVAL
      const timer = setInterval(() => {
         console.log(hour)
         setHour(prev => ({
            ...prev,
            time: hour.time - 1,
            hour: Math.trunc(hour.time / 3600),
            minute: Math.trunc((hour.time / 60) % 60),
            second: Math.trunc(hour.time % 60),
         }))
      }, 1000)

      // CLEAR INTERVAL
      return () => clearInterval(timer)
   }, [hour, time, hour.time, hour.hour, handlePause])

   return (
      <Box>
         <Stack
            direction='row'
            gap={1}>
            <Typography variant='h4'>
               {`
            ${String(hour.hour).padStart(2, 0)}:${String(hour.minute).padStart(
                  2,
                  0
               )}:${String(hour.second).padStart(2, 0)}`}
            </Typography>
            <Box>
               {pause ? (
                  <IconButton
                     color='primary'
                     onClick={handlePause}>
                     <NotStartedIcon />
                  </IconButton>
               ) : (
                  <IconButton
                     color='primary'
                     onClick={handlePause}>
                     <PauseCircleFilledIcon />
                  </IconButton>
               )}
               <IconButton color='primary'>
                  <StopCircleIcon />
               </IconButton>
            </Box>
         </Stack>
      </Box>
   )
}
export default Interval
