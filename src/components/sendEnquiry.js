/* Posts a form to the /api/send-mail serverless function. Resolves true only when the
   function answers "success"; a network failure or any other answer is false. */
export async function sendEnquiry(fields) {
  try {
    const res = await fetch('/api/send-mail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(fields),
    })
    return (await res.text()).trim() === 'success'
  } catch {
    return false
  }
}
