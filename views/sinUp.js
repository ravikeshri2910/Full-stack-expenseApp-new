

document.getElementById('submit').addEventListener("click", sinUpData)

async function sinUpData(event) {
    try {
        event.preventDefault()
        console.log("here")

        let name = document.getElementById('name')
        let email = document.getElementById('email')
        let password = document.getElementById('password')

        if (!name.value || !email.value || !password.value) {
            return alert('Fill the form properly')
        }
        let sinUpData = {
            name: name.value,
            email: email.value,
            password: password.value
        }


        // console.log(sinUpData)

        // let res = await axios.post("http://3.80.172.222:4000/user/expense-sinup-data", sinUpData)
        let res = await axios.post("http://localhost:4000/user/expense-sinup-data", sinUpData)

        name.value = "";
        email.value = ""
        password.value = ""

        console.log(res.message)

        if (res.status == 201) {
            alert("Account registered")
            window.location.href="login.html"
        }
        // console.log(res)Request failed with status code 400

    } catch (err) {
        // console.log(err)
        if (err.message === 'Request failed with status code 400') {
            alert("User already exists")
        }
        // console.log('msg'+) 
    }
}
