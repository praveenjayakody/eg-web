import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from "@mui/material"
import { ChangeEvent, FormEvent, useState } from "react"

import { isValidEmail } from "../../lib/utils/isValidEmail"
import { isStrongPassword } from "../../lib/utils/isStrongPassword"

const SignUp: React.FC = () => {
  const initialFormData: {
    email: string
    fullName: string
    password: string
  } = {
    email: "",
    fullName: "",
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

  // INFO: errors are shown only if user has tried to submit the form at least once only
  const [errorsShown, setErrorsShown] = useState(false)
  const isInvalidFullName = formData.fullName === ""
  const isInvalidEmail = formData.email === "" || !isValidEmail(formData.email)
  const isInvalidPassword =
    formData.password === "" || !isStrongPassword(formData.password)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorsShown(true)
    if (!isInvalidFullName && !isInvalidEmail && !isInvalidPassword) {
      console.log(formData)
    }
  }

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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="fullName"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                value={formData.fullName}
                onChange={handleFormChange("fullName")}
                autoFocus
                helperText={
                  errorsShown && isInvalidFullName
                    ? "Full name is required"
                    : undefined
                }
                error={errorsShown && isInvalidFullName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleFormChange("email")}
                helperText={
                  errorsShown
                    ? formData.email === ""
                      ? "Email is required"
                      : !isValidEmail(formData.email)
                        ? "Invalid email"
                        : undefined
                    : undefined
                }
                error={errorsShown && isInvalidEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleFormChange("password")}
                helperText={
                  errorsShown
                    ? formData.password === ""
                      ? "Password is required"
                      : !isStrongPassword(formData.password)
                        ? "Weak password"
                        : undefined
                    : undefined
                }
                error={errorsShown && isInvalidPassword}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default SignUp
