async function regiterCategory() {
  const category = document.getElementById('category').value;

  const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ category })
  }
  
  const response = await fetch('/categoria/register', options)
  const data = await response.json()

  if(response.status === 400) return alert(data.error)

  alert(data.message)

}