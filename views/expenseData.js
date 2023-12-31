document.getElementById('premium').addEventListener("click",buyPremium)
document.getElementById('mouseover').addEventListener("click",consolevalue)
document.getElementById('update').addEventListener("click",updateData)
document.getElementById('downloadexpense').addEventListener("click",download)
document.getElementById('premium1').addEventListener("click",logOut)
document.getElementById('premium2').addEventListener("click",getDetails)

function logOut(event) {
    localStorage.clear()
    window.location.href = "login.html"
}

async function download() {
    try {
        console.log('here')
        let token = localStorage.getItem('token')
        const site = `http://localhost:4000/user/download`
        // const site = `http://3.80.172.222:4000/user/download`
        const res = await axios.get(site, { headers: { "Authorization": token } })
        console.log(res)

        if (res.status == 201) {
            let a = document.createElement("a");
            a.href = res.data.fileUrl.Location;
            a.download = 'Expense.csv';
            a.click()

            const leadBoardDetails = document.getElementById('leadBoardDetails');
            leadBoardDetails.innerHTML = ""

            // console.log(res)
            let arr = res.data.down

            arr.forEach((ele) => {
                // console.log(ele.name)

                // if (ele.totalExpense === null) {
                //     ele.totalExpense = 0
                // }


                const div = document.createElement('div');

                div.innerHTML = `<li class="tem">${ele.filename} - <a href="${ele.url}">Download</a>   </li>`

                leadBoardDetails.append(div)
            })
        }
    } catch (err) { console.log(err) }
}

// get data
async function getDetails(page) {
    console.log("here")
    try {
        let Updatebtn = document.getElementById("update");
        Updatebtn.hidden = true;
        let submitBtn = document.getElementById("mouseover");
        submitBtn.hidden = false;
        let downloadexpense = document.getElementById("downloadexpense");
        downloadexpense.hidden = true;

        let uName = document.getElementById('userName')

        let leadBoard = document.getElementById('leadBoard');
        leadBoard.hidden = true;
        
        let pageLimit = document.getElementById('pageLimit').value
        // console.log(token)


        const site = `http://localhost:4000/logIn/get-data/${page}/${pageLimit}`
        // const site = `http://3.80.172.222:4000/logIn/get-data/${page}/${pageLimit}`

        let token = localStorage.getItem('token')
        let res = await axios.get(site, { headers: { "Authorization": token } })
        // console.log(res)

        document.getElementById('pageLimit').value = pageLimit

        uName.innerHTML = res.data.user.name

        // console.log(res.data.user.isPremium)
        if (res.data.user.isPremium == true) {
            // leadBoard()
            let pbtn = document.getElementById('premium');
            pbtn.hidden = true;
            let ptag = document.getElementById('member');
            ptag.hidden = false;
            let leadBoard = document.getElementById('leadBoard');
            leadBoard.hidden = false;
            let downloadexpense = document.getElementById("downloadexpense");
            downloadexpense.hidden = false;
            // leadBoard() 
        }
        pagination(res.data)
        showOutputOfGet(res.data.userdetails.rows);
    } catch (err) { console.log(err) }
}
// console.log(res)data.


getDetails(1,2)

function pagination(data) {
    const pages = document.getElementById('pages')
    pages.innerHTML = ""

    if (data.hasPeriviosPage) {
        const btn2 = document.createElement('button');
        btn2.innerHTML = `<h4>${data.previosPage}</h4>`;
        btn2.classList.add("pageBtn");
        // btn2.innerHTML = `<h4>Prev</h4>`;
        btn2.addEventListener('click', () => getDetails(data.previosPage));
        pages.appendChild(btn2)
    }

    const btn1 = document.createElement('button');
    btn1.classList.add("pageBtn");
    btn1.innerHTML = `<h4>${data.currentPage}</h4>`;
    btn1.style.color = 'red'
    btn1.addEventListener('click', () => getDetails(data.currentPage));
    pages.appendChild(btn1)

    if (data.hasNextPage) {
        const btn3 = document.createElement('button');
        btn3.innerHTML = `<h4>${data.nextPage}</h4>`;
        btn3.classList.add("pageBtn");
        // btn3.innerHTML = `<h4>Next</h4>`;
        btn3.addEventListener('click', () => getDetails(data.nextPage));
        pages.appendChild(btn3)
    }
}




// adding data
async function consolevalue(event) {
    try {
        event.preventDefault();
        console.log('here')
        let expense = document.getElementById("expense").value;
        let description = document.getElementById("description").value;
        if (!description) {
            alert('Fill the form')
            let des = document.getElementById("description")
            des.style.border = '2px solid red'
            return
        }
        else {
            let des = document.getElementById("description")
            des.style.border = 'none'

        }

        let category = document.getElementById("category").value;
        // console.log(expense, description, category);
        // name.value = ""
        let token = localStorage.getItem('token')
        // let userId = localStorage.getItem('userId')
        // console.log('token ......' + token);


        const obj = {
            expense: expense,
            description: description,
            category: category,
            // npm start
        }

        let Updatebtn = document.getElementById("update");
        Updatebtn.hidden = true;
        let submitBtn = document.getElementById("mouseover");
        submitBtn.hidden = false;


        let res = await axios.post("http://localhost:4000/logIn/expense-data", obj, { headers: { "Authorization": token } })
        // let res = await axios.post("http://3.80.172.222:4000/logIn/expense-data", obj, { headers: { "Authorization": token } })

        // leadBoard(event)

        if (res.data.user.isPremium == true) {
            leadBoard(event)
        }

        let exp = res.data.userdetails.expense
        let des = res.data.userdetails.description
        let cat = res.data.userdetails.category
        let id = res.data.userdetails.id

        console.log(des)
        showOutput(id, exp, des, cat)
        document.getElementById("expense").value = "";
        document.getElementById("description").value = "";
        document.getElementById("phone").value = "";
        //  }).catch((err)=> console.log(err))
    } catch (err) { console.log("err" + err) }
}

// for post response
function showOutput(id, expense, des, category) {
    // console.log('des-'+des)

    let details = document.getElementById("details");

    let div = document.createElement("div")

    div.innerHTML = `<li class="item">${expense}-${category}-${des}<button onClick="deleteData(event,'${id}')" id="delBtn" type="submit" value="Delete" class="btn btn-danger">Delete</button> <button type="button" class="btn btn-secondary" onClick="editData(event,'${id}')" id="submit" class="btnEdit" type="submit">Edit</button></li>`;

    details.append(div)

    let Updatebtn = document.getElementById("update");
    Updatebtn.hidden = true;
    let submitBtn = document.getElementById("mouseover");
    submitBtn.hidden = false;

}

// for get response
function showOutputOfGet(data) {

    // console.log(data[0].email)
    let details = document.getElementById("details");
    details.innerHTML = "";

    let arr = data.forEach(element => {
        // console.log(element._id)

        let div = document.createElement("div")

        div.innerHTML = `<li class="item">${element.expense}-${element.category}-${element.description}<button onClick="deleteData(event,'${element.id}')" id="delBtn" type="submit" value="Delete" class="btn btn-danger">Delete</button> <button type="button" class="btn btn-secondary" onClick="editData(event,'${element.id}')" id="submit" class="btnEdit" type="submit">Edit</button></li>`;



        details.append(div)
    });
    let Updatebtn = document.getElementById("update");
    Updatebtn.hidden = true;
    let submitBtn = document.getElementById("mouseover");
    submitBtn.hidden = false;
}

// deleting element form data
async function deleteData(event, id) {
    try {
        console.log('here')
        // console.log(id)
        event.preventDefault();
        // let site
        let token = localStorage.getItem('token')
        let site = `http://localhost:4000/logIn/raat-data/${id}`
        // let site = `http://3.80.172.222:4000/logIn/raat-data/${id}`
        let res = await axios.get(site, { headers: { "Authorization": token } })
        // console.log(res.status)
        if (res.status === 201) {
            getDetails()
        }
        let Updatebtn = document.getElementById("update");
        Updatebtn.hidden = true;
        let submitBtn = document.getElementById("mouseover");
        submitBtn.hidden = false;

    } catch (err) { console.log(err) }
    // console.log(id)
}

// editing data
async function editData(event, id) {
    try {

        console.log('here')
        event.preventDefault();
        // console.log(id)
        // let site
        let token = localStorage.getItem('token')
        let site = `http://localhost:4000/logIn/edit-data/${id}`
        // let site = `http://3.80.172.222:4000/logIn/edit-data/${id}`
        let res = await axios.get(site, { headers: { "Authorization": token } })
        // console.log(res.data)
        getContent(res.data.userdetails[0], res.data.userdetails[0].id)
    } catch (err) { console.log(err) }
}


// edit contain
function getContent(data, id) {
    localStorage.setItem("key", id)
    // console.log(id)
    document.getElementById("expense").value = data.expense;
    document.getElementById("description").value = data.description;
    document.getElementById("category").value = data.category;
    let btn = document.getElementById("update");
    btn.hidden = false;
    let submitBtn = document.getElementById("mouseover");
    submitBtn.hidden = true;



}



// Update data
async function updateData(event) {

    try {
        event.preventDefault();

        let id = localStorage.getItem('key')
        // console.log(typeof (id))
        let userId = localStorage.getItem('userId')


        let expense = document.getElementById("expense").value;
        let description = document.getElementById("description").value;
        let category = document.getElementById("category").value;

        let obj = {
            id: id,
            updatedExpense: expense,
            updatedDescription: description,
            updatecatagory: category,

        }

        // console.log(obj)
        let token = localStorage.getItem('token')
        let site = `http://localhost:4000/logIn/updated-data`
        // let site = `http://3.80.172.222:4000/logIn/updated-data`

        let res = await axios.post(site, obj, { headers: { "Authorization": token } })

        // console.log(res.status)
        getDetails()
        localStorage.removeItem("key")
        document.getElementById("expense").value = "";
        document.getElementById("description").value = "";
        document.getElementById("category").value = "";
        // showOutput(res)
        let Updatebtn = document.getElementById("update");
        Updatebtn.hidden = true;
        let submitBtn = document.getElementById("mouseover");
        submitBtn.hidden = false;

        // console.log("update")
    } catch (err) { console.log(err) }
}

async function buyPremium(event) {

    try {
        event.preventDefault();
        const token = localStorage.getItem('token');

        const site = `http://localhost:4000/purchase/premiummembership`

        // const site = `http://3.80.172.222:4000/purchase/premiummembership`
        const response = await axios.get(site, { headers: { "Authorization": token } })

        // console.log(response)

        const options = {
            "key": response.data.key_id,// Enter the key id genetated from dashboard
            "order_id": response.data.order.id,// enter the oder id

            // now Handeler function will handel the success payment

            "handler": async function (response) {
                // let res = await axios.post('http://3.80.172.222:4000/purchase/updatetransactionstatus', {
                let res = await axios.post('http://localhost:4000/purchase/updatetransactionstatus', {
                    order_id: options.order_id,
                    payment_id: response.razorpay_payment_id,
                }, { headers: { "Authorization": token } })
                console.log(res.status)
                alert("Payment succesfull")
                getDetails()
            }
        }
        // } catch (err) { console.log(err) }

        const rzp1 = new Razorpay(options);
        rzp1.open()

        rzp1.on('payment.failed', async function (response) {

            // try {
            // console.log(response.error.metadata)

            const token = localStorage.getItem('token');
            // await axios.post('http://3.80.172.222:4000/purchase/failed/updatetransactionstatus', {
            await axios.post('http://localhost:4000/purchase/failed/updatetransactionstatus', {
                order_id: response.error.metadata.order_id,
                payment_id: response.error.metadata.payment_id,
            }, { headers: { "Authorization": token } })

            // console.log(res.status)    

            alert('Payment Failed')
            getDetails()
        })
    } catch (err) { console.log(err) }
}



const element = document.getElementById('leadBoard');
element.addEventListener("click", leadBoard);

async function leadBoard() {
    // event.preventDefault();

    let token = localStorage.getItem('token')
    const site = `http://localhost:4000/premium/leadBoardDetails`
    // const site = `http://3.80.172.222:4000/premium/leadBoardDetails`
    const res = await axios.get(site, { headers: { "Authorization": token } })


    const leadBoardDetails = document.getElementById('leadBoardDetails');
    leadBoardDetails.innerHTML = ""

    // console.log(res)
    let arr = res.data.udata

    arr.forEach((ele) => {
        // console.log(ele.name)

        if (ele.totalExpense === null) {
            ele.totalExpense = 0
        }

        const div = document.createElement('div');

        div.innerHTML = `<li class="tem">${ele.name} - ${ele.totalExpense} Score </li>`

        leadBoardDetails.append(div)
    })


}




