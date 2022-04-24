import { Grid, Stack, Typography } from "@mui/material"

const WEEKDAY_ARR = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
]
function GridLine({ weekday, hours }) {
  return (
    <>
      <Grid item xs={2}></Grid>
      <Grid item xs={2}>
        <Typography  variant="body2" color="#444">
          {WEEKDAY_ARR[weekday]}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Stack sx={{ height: "28px" }}>
          {hours.map((hour) => {
            return (
              <Typography key={hour} variant="body2" color="#444">
                {hour}
              </Typography>
            )
          })}
        </Stack>
      </Grid>
      <Grid item xs={2}></Grid>
    </>
  )
}

function readableClock(str) {
  return str.slice(0, 2) + ":" + str.slice(2)
}

export default function OpeningHours({ openingHours }) {
  const weekdaysArray = [...Array(7).keys()].map((i) => {
    return {
      weekday: i,
      hours: [],
    }
  })

  openingHours.forEach((openingHour) => {
    const readableHour =
      readableClock(openingHour.open_time) +
      " - " +
      readableClock(openingHour.close_time)

    const weekday = weekdaysArray.find(
      (wa) => wa.weekday === openingHour.open_day
    )
    weekday.hours.push(readableHour)
  })

  return (
    <Grid container spacing={2} mb={2} ml={1}>
      {weekdaysArray.map((weekdayInfo) => {
        return (
          <GridLine
            key={weekdayInfo.weekday.toString()}
            weekday={weekdayInfo.weekday}
            hours={weekdayInfo.hours}
          />
        )
      })}
    </Grid>
  )
}
