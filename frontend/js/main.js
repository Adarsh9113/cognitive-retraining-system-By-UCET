async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const msg = document.getElementById("msg");

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.token) {
      // save data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // redirect
      window.location.href = "dashboard.html";
    } else {
      msg.innerText = data.message;
    }

  } catch (error) {
    msg.innerText = "Server error ❌";
  }
}

// logout
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.location.href = "login.html";
}
async function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const msg = document.getElementById("msg");

  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    msg.innerText = data.message;

  } catch (error) {
    msg.innerText = "Error ❌";
  }
}