import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link as MuiLink,
  TextField,
  Typography
} from "@mui/material"
import { ChangeEvent, FormEvent, useState } from "react"
import { Link } from "react-router-dom"

const Login: React.FC = () => {
  const initialFormData: {
    email: string
    password: string
  } = {
    email: "",
    password: ""
  }
  const [formData, setFormData] = useState(initialFormData)
  const handleFormChange =
    (field: keyof typeof initialFormData) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setFormData(currentFormData => ({
        ...currentFormData,
        [field]: event.target.value
      }))
    }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const isFormDataInvalid = formData.email === "" || !formData.password

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleFormChange("email")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleFormChange("password")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isFormDataInvalid}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/signup">
                <MuiLink component={"span"}>
                  Don't have an account? Sign Up
                </MuiLink>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Login
