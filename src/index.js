document.addEventListener('DOMContentLoaded', () => {
    fetchAllDogs()
})

// Fetches

function fetchAllDogs() {
    fetch(`http://localhost:3000/dogs`)
    .then(res => res.json())
    .then(json => json.forEach(dog => buildOneRow(dog)))
}

const fetchOneDog = (dog) => {
    // debugger
    const editForm = document.getElementById('dog-form')
    fetch(`http://localhost:3000/dogs/${dog.id}`)
    .then(res => res.json())
    .then(item => {
        editForm[0].value = dog.name
        editForm[1].value = dog.breed
        editForm[2].value = dog.sex
    })
    
    editForm.addEventListener('submit', (e, id) => patchOneDog(e, dog.id))
}

const patchOneDog = (e, dogId) => {
    e.preventDefault()
    
    const dogTable = document.getElementById('table-body')

    let data = {
        "id": dogId,
        "name": e.target[0].value,
        "breed": e.target[1].value,
        "sex": e.target[2].value
    }

    fetch(`http://localhost:3000/dogs/${dogId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type':'application:json',
            'Accept':'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => {
        dogTable.innerHTML = ""
        fetchAllDogs()
    })
}


// DOM Manipulation

function buildOneRow(dog) {

    const dogTable = document.getElementById('table-body')

    let tr = document.createElement('tr')

    tr.id = dog.id

    tr.innerHTML = `
        <td> ${dog.name} </td> 
        <td> ${dog.breed} </td> 
        <td> ${dog.sex} </td> 
        <button> Edit </button> 
    `
    dogTable.appendChild(tr)

    let editButton = tr.querySelector('button')
    editButton.id = dog.id
    editButton.addEventListener('click', () => fetchOneDog(dog))

}