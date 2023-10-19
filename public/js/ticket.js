async function registerTicket(userId) {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const detail = document.getElementById('details').value;
  const selectElement = document.getElementById("category");
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  const category = selectedOption.value;

  if(!title.length || !description.length || !detail.length || category === 'selecionar') return alert('Alguma informação está incorreta');

  const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, description, detail, category, userId })
  }

  const response = await fetch('/ticket/register', options)
  const data = await response.json()

  if(response.status === 400) {
    alert(data.error)
    return;
  }

  window.location.reload()
  window.location.href = '/ticket/meus-ticket'
}