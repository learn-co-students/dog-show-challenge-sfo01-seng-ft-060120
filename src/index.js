document.addEventListener('DOMContentLoaded', () => {

    const getAllDogs = () => {
        fetch('http://localhost:3000/dogs')
        .then(res => res.json())
        .then(json => json.forEach(dog => renderDog(dog)))
    }
    getAllDogs()

    const renderDog = (dog) => {
        let table = document.getElementById('table-body')
        let tr = document.createElement('tr')
        tr.id = dog.id

        let name = document.createElement('td')
        name.innerText = dog.name

        let breed = document.createElement('td')
        breed.innerText = dog.breed

        let sex = document.createElement('td')
        sex.innerText = dog.sex

        let edit = document.createElement('td')
        let btn = document.createElement('button')
        btn.id = dog.id
        btn.innerText = 'Edit'
        edit.appendChild(btn)

        tr.appendChild(name)
        tr.appendChild(breed)
        tr.appendChild(sex)
        tr.appendChild(edit)

        table.appendChild(tr)
        

        // event listener for edit button
        edit.addEventListener('click', (e) => {
            let form = document.getElementById('dog-form')
            form[0].value = dog.name
            form[1].value = dog.breed
            form[2].value = dog.sex
            form[3].id = dog.id
        })

    }


    let form = document.getElementById('dog-form')
    form.addEventListener('submit', (e) => {
        e.preventDefault

        let data = {
            name: e.target[0].value,
            breed: e.target[1].value,
            sex: e.target[2].value
        }

        fetch(`http://localhost:3000/dogs/${e.target[3].id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => {
            fetch('http://localhost:3000/dogs')
            .then(res => res.json())
            .then(json => json.forEach(dog => renderDog(dog)))
        })
    })
    

})