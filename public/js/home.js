function switchScreen() {
  let registerForm = document.getElementById("registerForm");
  let loginForm = document.getElementById("loginForm");

  if (registerForm.style.display === "none" || registerForm.style.display === "") {
    registerForm.style.display = "block";
    loginForm.style.display = "none";
  } else {
    registerForm.style.display = "none";
    loginForm.style.display = "block";
  }
}

let registerForm = document.getElementById("registerForm");

registerForm.addEventListener('submit', async (event) => {
   // Impede o envio padrão do formulário
  event.preventDefault();
  const username = document.getElementById("r_username").value;
  const password = document.getElementById("r_password").value;
  const email = document.getElementById("r_email").value;

  const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password, email })
  }
  
  const response = await fetch('/register', options)
  const data = await response.json()

  if(response.status === 400) return alert(data.error)
  
  window.location.href = '/'
})


let loginForm = document.getElementById("loginForm");

loginForm.addEventListener('submit', async (event) => {
  // Impede o envio padrão do formulário
 event.preventDefault();
 const email = document.getElementById("l_email").value;
 const password = document.getElementById("l_password").value;
 const options = {
   method: "POST",
   headers: {
    "Content-Type": "application/json"
  },
   body: JSON.stringify({ email, password })
 }
 
 const response = await fetch('/login', options)
 const data = await response.json()

 if(response.status === 400) return alert(data.error);
 
 window.location.href = '/painel'
})