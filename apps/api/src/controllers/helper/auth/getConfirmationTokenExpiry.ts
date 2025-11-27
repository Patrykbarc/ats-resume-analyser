export const getConfirmationTokenExpiry = () => {
  const now = new Date()

  const confirmationTokenExpiry = new Date(now.getTime())

  return new Date(confirmationTokenExpiry.setHours(now.getHours() + 24))
}
