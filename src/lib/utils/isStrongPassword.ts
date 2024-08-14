export const isStrongPassword = (password: string) => {
  const passwordRegExp =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i
  return passwordRegExp.test(password)
}
