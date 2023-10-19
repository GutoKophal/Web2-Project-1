async function partner(ticketId) {
  const selectElement = document.getElementById("associar");
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  const technicalId = selectedOption.value;

  if(technicalId === 'selecionar' || !technicalId.length) return alert('Selecione o Técnico de suporte')


  const options = {
    method: "POST",
    headers: {
     "Content-Type": "application/json"
   },
    body: JSON.stringify({ ticketId, technicalId })
  }

 const response = await fetch('/ticket/partner', options)
 const data = await response.json();
 
 if(response.status === 400) return alert(data.error)

 alert('Técnico de suporte associado')
}

async function disassociate(ticketId) {
  const selectElement = document.getElementById("associar");
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  const technicalId = selectedOption.value;

  if(technicalId === 'selecionar') return alert('Selecione o Técnico de suporte')

  const options = {
    method: "POST",
    headers: {
     "Content-Type": "application/json"
   },
    body: JSON.stringify({ ticketId, technicalId })
  }

 const response = await fetch('/ticket/disassociate', options)
 const data = await response.json();
 
 if(response.status === 400) return alert(data.error);
}

async function confirmSuport(ticketId) {
  const divObs = document.getElementById('observacao')
  
  let response;

  if(!divObs.style.display) {
    response = confirm("Dejesa enviar uma observação para o usuário?") ? divObs.style.display = 'block' : false
  }

  if(response === false) {

    const options = {
      method: "POST",
      headers: {
      "Content-Type": "application/json"
    },
      body: JSON.stringify({ ticketId })
    }

  await fetch('/ticket/conclude', options)

    alert(`Ticket concluído`)
    window.location.reload()
    return;
  }

  const observation = document.getElementById('observation').value;

  if(!observation.length) return alert('Preencha a campo observação para enviar para o usuário.')

  
  const options = {
    method: "POST",
    headers: {
     "Content-Type": "application/json"
   },
    body: JSON.stringify({ ticketId, observation })
  }

  await fetch('/ticket/conclude', options)

  alert('Observação enviada para o usuário')
  window.location.reload()
}

async function reOpen(ticketId) {
  const options = {
    method: "POST",
    headers: {
    "Content-Type": "application/json"
  },
    body: JSON.stringify({ ticketId })
  }

  await fetch('/ticket/reopen', options)

  window.location.reload()
}