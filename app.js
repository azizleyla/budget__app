const form = document.getElementById('form');
const budget = document.getElementById('budget');
const amount = document.getElementById('amount');
const total = document.querySelector('.total');
const tbody = document.querySelector('.tbody');
const hiddenInputForId = document.getElementById('id');
//empty array
let expenses = [];
let editFlag = false;

form.addEventListener('submit', saveExpense);

function renderExpense(expenses) {

    tbody.innerHTML = "";
    expenses.map(expense => {
        tbody.innerHTML += `
       <tr>
       <td>${expense.name}</td>
       <td>${expense.amount}</td>
       <td>
        <button type="button" class="btn edit" data-id="${expense.id}">Update</button>
        <button type="button" class="btn delete" data-id="${expense.id}">Delete</button>
       </td >
       </tr >

            `

    })
}
//addExpense
function addExpense() {
    let randomId = Math.floor(Math.random() * 100);
    const budgetObj = {
        id: randomId,
        name: budget.value,
        amount: Number(amount.value)
    }
    expenses.push(budgetObj);
    setItemtoLS(expenses)
}
function saveExpense(e) {
    e.preventDefault();
    //Check inputs
    if (!editFlag) {
        addExpense()
    } else if (editFlag) {
        updateOne();
        editFlag = false;

    }
    renderExpense(expenses);
    totalExpense()
    displayMessage('Record has been saved!', 'blue');
    // setItemtoLS()
    setBackDefault()
}
//Clear Inputs
function setBackDefault() {
    budget.value = "";
    amount.value = "";
}
//displayMessage
function displayMessage(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.innerHTML = `
            <p>${message}</p>
                <i class="fas fa-times"></i>
        `
    document.querySelectorAll('.heading')[1].insertAdjacentElement('afterend', div);
    setTimeout(() => {
        div.remove();
    }, 1000)

}



//calculate total expense
function totalExpense() {
    let sum = expenses.reduce((acc, val) => {
        return acc + +val.amount
    }, 0)
    total.innerHTML = `Total Expenses: ${sum} 💵`;
}
//clear All expense
const clear = document.querySelector('.clear');
clear.addEventListener('click', function () {
    expenses = [];
    renderExpense(expenses);
    totalExpense();
    localStorage.clear();
    editFlag = false;
})



function deleteOne(id) {
    //dele expense for LS
    expenses = getItemfromLS();
    expenses = expenses.filter(expense => expense.id !== Number(id));
    renderExpense(expenses)
    totalExpense()
    displayMessage('Record has been deleted', 'red')
    setItemtoLS(expenses)
    editFlag = false;
}
function updateOne() {
    const id = hiddenInputForId.value;
    let editElment = expenses.find(expense => expense.id === Number(id));
    editElment.name = budget.value;
    editElment.amount = amount.value;
    setItemtoLS(expenses)

}
function takeDataToInputs(id) {
    let editElement = expenses.find(expense => expense.id === Number(id));
    budget.value = editElement.name;
    amount.value = editElement.amount;
    hiddenInputForId.value = id;

}
tbody.addEventListener('click', function (e) {
    const clicked = e.target;
    const id = e.target.dataset.id;
    if (clicked.classList.contains('delete')) {
        deleteOne(id);
    } else if (clicked.classList.contains('edit')) {
        editFlag = true;
        takeDataToInputs(id);
    }
})


//get expenes from lS
function getItemfromLS() {
    return localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses', expenses)) : [];
}
//set expenses to LS
function setItemtoLS(expenses) {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}
//load expenses from LS
window.addEventListener('load', function () {
    expenses = getItemfromLS();
    renderExpense(expenses);
})




// const form = document.getElementById('form');
// const budget = document.getElementById('budget');
// const amount = document.getElementById('amount');
// const total = document.querySelector('.total');
// const tbody = document.querySelector('.tbody');
// //empty array
// let expenses = [];
// let editFlag = false;
// let editName;
// let editAmount;
// form.addEventListener('submit', addExpense);

// function renderExpense(expenses) {

//     tbody.innerHTML = "";
//     expenses.map(expense => {
//         tbody.innerHTML += `
//        <tr>
//        <td>${expense.name}</td>
//        <td>$${expense.amount}</td>
//        <td>
//         <button type="button" class="btn edit"   onclick="updateExpense(${expense.id})">Update</button>
//         <button type="button" class="btn delete" onclick="deleteExpense(${expense.id})">Delete</button>
//        </td>
//        </tr>
//     `
//     })


// }
// //addExpense

// function addExpense(e) {
//     e.preventDefault();
//     let randomId = Math.floor(Math.random() * 100 + 1);
//     const budgetObj = {
//         id: randomId,
//         name: budget.value,
//         amount: Number(amount.value)
//     }
//     //Check inputs
//     if (budget.value === "" || amount.value === "") {
//         alert("Plese fill the inputs");
//     } else {
//         expenses.push(budgetObj);
//         renderExpense(expenses);
//         totalExpense()
//         displayMessage('Record has been saved!', 'blue');
//         setItemtoLS()
//     }

//     setBackDefault()



// }
// //Clear Inputs
// function setBackDefault() {
//     budget.value = "";
//     amount.value = "";
// }
// //displayMessage
// function displayMessage(message, className) {
//     const div = document.createElement('div');

//     div.className = `alert alert-${className}`;
//     div.innerHTML = `
//     <p>${message}</p>
//     <i class="fas fa-times"></i>
//     `
//     document.querySelectorAll('.heading')[1].insertAdjacentElement('afterend', div);
//     setTimeout(() => {
//         div.remove();
//     }, 3000)
// }

// //deleteExpense
// function deleteExpense(id) {
//     expenses = getItemfromLS();
//     if (confirm("Are you sure delete this expense")) {
//         expenses.forEach((exp, index) => {
//             if (exp.id === id) {
//                 expenses.splice(index, 1);
//                 totalExpense()
//             }
//         })
//     }
//     tbody.insertAdjacentHTML = "";
//     renderExpense(expenses);
//     displayMessage('Deleted', 'red')
//     setItemtoLS(expenses)

// }
// //edit Expense
// function updateExpense(id) {
//     expenses.forEach((exp, index) => {
//         if (exp.id === id) {
//             editName = exp.name;
//             editAmount = exp.amount;
//             budget.value = editName;
//             amount.value = editAmount;

//             editFlag = true;


//         }
//     })

// }
// //find totalExpense
// function totalExpense() {
//     let sum = expenses.reduce((acc, val) => {
//         return acc + val.amount
//     }, 0)
//     total.innerHTML = `Total Expenses : ${sum}💵`;
// }
// //clear All expense
// const clear = document.querySelector('.clear');
// clear.addEventListener('click', function () {
//     expenses.splice(0, expenses.length)
//     renderExpense(expenses);
//     totalExpense();
//     localStorage.clear();
// })

// //get expenes from lS
// function getItemfromLS() {
//     return localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses', expenses)) : [];
// }
// //set expenses to LS
// function setItemtoLS() {
//     localStorage.setItem('expenses', JSON.stringify(expenses));
// }
// //load expenses from LS
// window.addEventListener('load', function () {
//     expenses = getItemfromLS();
//     renderExpense(expenses);
// })