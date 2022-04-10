import Api from "../helper/api"
import { useEffect, useState } from "react"
import { Container, Paper, Avatar } from "@material-ui/core/"

const api = new Api()

const Profile = () => {
  const [info, setInfo] = useState({})

  useEffect(() => {
    api.me().then(res => {
      const { id, email, name } = res.data
      setInfo({ id, email, name })
    })

  }, [])

  return (
    <Container
      maxWidth="sm"
      style={{ backgroundColor: "#efefef", height: "100vh", padding: 40 }}
    >
      {info.id && (
        <Paper
          elevation={3}
          style={{
            padding: 40,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar style={{ width: 80, height: 80 }}>T</Avatar>
          <h1>Test User</h1>
          <p>email: test@test.com</p>
        </Paper>
      )}
    </Container>
  )
}

export default Profile
