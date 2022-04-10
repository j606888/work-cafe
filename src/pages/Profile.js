import Api from "../helper/api"
import { useEffect, useState } from "react"
import { Container, Paper, Avatar } from "@material-ui/core/"
import NavbarContainer from "../components/layout/NavbarContainer"

const api = new Api()

const Profile = () => {
  const [info, setInfo] = useState({})

  useEffect(() => {
    api.me().then((res) => {
      const { id, email, name } = res.data
      setInfo({ id, email, name })
    })
  }, [])

  return (
    <NavbarContainer>
      <Container
        maxWidth="sm"
        style={{padding: 40 }}
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
            <Avatar style={{ width: 80, height: 80 }}>
              {info.name[0].toUpperCase()}
            </Avatar>
            <h1>{info.name}</h1>
            <p>{info.email}</p>
          </Paper>
        )}
        {!info.id && <h1>Loading...</h1>}
      </Container>
    </NavbarContainer>
  )
}

export default Profile
