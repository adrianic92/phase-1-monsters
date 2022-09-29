// Declare variables
const createMonster = document.getElementById("create-monster")
const monsterContainer = document.querySelector("#monster-container")
const back = document.getElementById("back")
const forward = document.getElementById("forward")
let page = 1

// Show initial 50 monsters
fetchMonsters(page)

// Create the boxes for the form
createBoxSection()

// Declare variables for elements of the form
const button = document.querySelector("div > form > button")
const wholeForm = document.querySelector("form")

back.addEventListener("click", backPage)
forward.addEventListener("click", forwardPage)
wholeForm.addEventListener("submit", submitForm)

function backPage() {
    page--
    if (page <= 0) {
        alert("Aint no monsters here")
        page++
        return
    }
    fetchMonsters(page)
}

function forwardPage() {
    page++
    fetchMonsters(page)
}

function fetchMonsters(page) {
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
    .then(resp => resp.json())
    .then(data => {
        monsterContainer.innerHTML = ""
        data.forEach(appendMonster)
    })
}

function appendMonster(monster) {
    
    const {name, age, description} = monster
    const div = document.createElement("div")
    const h2 = document.createElement("h2")
    const h4 = document.createElement("h4")
    const p = document.createElement("p")

    h2.innerText = name
    h4.innerText = `Age: ${age}`
    p.innerText = `Bio: ${description}`

    div.append(h2, h4, p)
    monsterContainer.append(div)
}



// append name... age... description... boxes and "create" button
function createBoxSection() {
    const form = document.createElement("form")
    const input1 = document.createElement('input')
    const input2 = document.createElement('input')
    const input3 = document.createElement('input')
    const create = document.createElement('button')
    
    form.id = "monster-form"

    input1.id = "name"
    input1.placeholder = "name..."

    input2.id = "age"
    input2.placeholder = "age..."
    
    input3.id = "description"
    input3.placeholder = "description..."

    create.innerText = "Create"

    form.append(input1, input2, input3, create)
    createMonster.append(form)
}

function submitForm(event) {
    event.preventDefault();
    const name = event.target.children[0].value
    const age = event.target.children[1].value
    const bio = event.target.children[2].value
    wholeForm.reset()
    
    fetch((`http://localhost:3000/monsters`), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            name: `${name}`,
            age: age,
            description: `${bio}`
        })
    })
}

function deleteMonster(a) {
    fetch(`http://localhost:3000/monsters/${a}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}