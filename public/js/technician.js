async function registerTechnician() {
  const username = document.getElementById('username').value
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  if(!username.length || !email.length || !password.length) return alert('Preencha todas as informações necessárias.');

  const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, email, password })
  }

  const response = await fetch('/technician/register', options)
  const data = await response.json()

  if(response.status === 400) {
    alert(data.error)
    return;
  }

  alert('Técnico de suporte cadastrado')
}