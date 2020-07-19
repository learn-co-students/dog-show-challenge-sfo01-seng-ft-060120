document.addEventListener('DOMContentLoaded', () => {
const tableBody = document.getElementById('table-body')
const dogForm = document.getElementById('dog-form')

// generate dog table
const buildDogRow = (dog) => {
    let tableRow = document.createElement('tr')
    tableRow.id = dog.id
    tableRow.innerHTML = `
    <td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td>
    <button>Edit Dog</button>
    `

    let button = tableRow.querySelector('button')
    button.addEventListener('click', () => fetchOneDog(dog))
    
    tableBody.appendChild(tableRow)
}

const fetchAllDogs = () => {
    fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(json => json.forEach(dog => buildDogRow(dog)))
}

// edit dog
const fetchOneDog = (dog) => {
    fetch(`http://localhost:3000/dogs/${dog.id}`)
    .then(res => res.json())
    .then(json => {
        dogForm[0].value = json.name
        dogForm[1].value = json.breed
        dogForm[2].value = json.sex

        dogForm.addEventListener('submit', (e, id) => patchOneDog(e, dog.id))

    })
}

const patchOneDog = (e, id) => {
    e.preventDefault()

    let data = {
        name: e.target[0].value,
        breed: e.target[1].value,
        sex: e.target[2].value
    }

    let configObj = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch(`http://localhost:3000/dogs/${id}`, configObj)
    .then(res => res.json())
    .then(json => {
        tableBody.innerHTML = ""
        fetchAllDogs()
    })

    dogForm.reset()
}

// method calls
    fetchAllDogs()
})

