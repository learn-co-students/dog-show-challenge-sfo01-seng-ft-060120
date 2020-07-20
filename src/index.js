document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/dogs')
    .then(function(response){
        return response.json()
    })
    .then(function(json){
        renderDogs(json)
    })

    document.addEventListener('click', event)
    function event(e){
        e.preventDefault()
        if(e.target.id === 'edit'){
            edit(e.target.dataset.id)
        }
        else if(e.target.parentElement.id === 'dog-form'){
            update(e)
        }
    }

    function renderDogs(json){
        let table = document.getElementById('table-body')
        json.forEach(dog => {
            let tr = document.createElement('tr')
            tr.innerHTML = `<tr data-id=${dog.id}><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button id='edit' data-id=${dog.id}>Edit</button></td></tr>`
            table.appendChild(tr)
        })
    }

    function edit(id){
        fetch(`http://localhost:3000/dogs/${id}`)
        .then(function(response){
            return response.json()
        })
        .then(dog => {
            let form = document.getElementById('dog-form')
            form.name.value = dog.name
            form.breed.value = dog.breed
            form.sex.value = dog.sex
            form.dataset.id = dog.id
        })
    }

    function update(e){
        let dog = {
            name: e.target.parentElement.name.value,
            breed: e.target.parentElement.breed.value,
            sex: e.target.parentElement.sex.value
        }
        fetch(`http://localhost:3000/dogs/${e.target.parentElement.dataset.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(dog)
        })
        .then(res => res.json())
        .then(dog => {
            let tr = document.querySelector(`tr[data-id="${dog.id}"]`)
            let td = tr.querySelectorAll('td')
            td[0].innerText = dog.name
            td[1].innerText = dog.breed
            td[2].innerText = dog.sex
        })   
    }
})