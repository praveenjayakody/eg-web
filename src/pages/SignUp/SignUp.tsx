import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Link as MuiLink,
  Typography,
  CircularProgress,
  Alert
} from "@mui/material"
import { ChangeEvent, FormEvent, useState } from "react"

import { isValidEmail } from "../../lib/utils/isValidEmail"
import { isStrongPassword } from "../../lib/utils/isStrongPassword"
import { Link } from "react-router-dom"
import { useApiMutation } from "../../lib/query"
import { RegisterApiReq } from "../../lib/models"

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
  const isInvalidFullName = formData.fullName.trim() === ""
  const isInvalidEmail =
    formData.email.trim() === "" || !isValidEmail(formData.email)
  const isInvalidPassword =
    formData.password === "" || !isStrongPassword(formData.password)

  const { isPending, mutate, isError, error, isSuccess } = useApiMutation<
    unknown,
    RegisterApiReq
  >("register/email", "post", {
    onSuccess: data => {
      console.log(data)
    }
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorsShown(true)
    if (!isInvalidFullName && !isInvalidEmail && !isInvalidPassword) {
      mutate({
        email: formData.email.trim().toLowerCase(),
        newPassword: formData.password,
        fullname: formData.fullName.trim()
      })
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
          {isPending && <CircularProgress sx={{ mt: 3 }} size={24} />}
          {isError && (
            <Alert severity="warning" sx={{ mt: 3 }}>
              {error.message}
            </Alert>
          )}
          {isSuccess && (
            <Alert severity="success" sx={{ mt: 3 }}>
              Registration successful! Please sign in
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isPending || isSuccess}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login">
                <MuiLink component={"span"}>
                  Already have an account? Sign in
                </MuiLink>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default SignUp
