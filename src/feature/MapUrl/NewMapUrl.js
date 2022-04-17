import { Alert, Box, Button, Stack } from "@mui/material"
import TextInput from "../../components/input/TextInput"
import { useFormik } from "formik"
import { newMapUrl } from "../../apis/map_url"
import MuiSnackbar from "../../components/ui/MuiSnackbar"
import { useState } from "react"


const URL_PLACEHOLDER =
  "https://www.google.com/maps/place/%E8%91%89%E6%98%8E%E8%87%B4%E9%BA%B5%E8%88%96/@22.9913027,120.2089765,17z/data=!4m5!3m4!1s0x0:0xb9084e53b40d39f8!8m2!3d22.9913027!4d120.2111652"

export default function NewMapUrl() {
    const [open, setOpen] = useState(false)

    const formik = useFormik({
      initialValues: {
        url: "",
      },
      onSubmit: async (values, actions) => {
        const res = await newMapUrl(values.url)
        const status = res.status

        if (status === 200) {
          actions.resetForm({
            values: {
              url: "",
            },
          })
          setOpen(true)
        }
      },
    })

  return (
    <Box maxWidth="sm" sx={{margin: '0 auto 30px'}}>
      <MuiSnackbar
        open={open}
        doClose={() => setOpen(false)}
        message="提交成功！"
      />
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ textAlign: "center" }}
        noValidate
        mt={1}
      >
        <h1>新增店家</h1>
        <Stack sx={{ width: "100%" }}>
          <Alert serverity="info" sx={{ textAlign: "left" }}>
            複製貼上 Google Map 的連結即可。大約 2 - 3
            天會人工審核連結是否為正確的店家。
          </Alert>
        </Stack>
        <TextInput
          formik={formik}
          name="url"
          multiline
          rows={5}
          placeholder={URL_PLACEHOLDER}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ width: "100%" }}
          disabled={formik.isSubmitting}
        >
          提交
        </Button>
      </Box>
    </Box>
  )
}
