document.getElementById('submit').addEventListener("click", passwordForget)

async function passwordForget(event) {
    event.preventDefault()
    const email = document.getElementById('email').value;
    console.log(email)

    const obj = {
        email: email
    }

    const res = await axios.post("http://3.80.172.222:3000/password/forgotpassword", obj)
    // const res = await axios.get("http://3.80.172.222:3000/password/resetpassword")
    // // /password/resetpassword
    console.log(res)

}