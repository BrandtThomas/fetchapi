const btnCharacters = document.querySelector('.btnCharacters');

const btnPlace = document.querySelector('.btnPlace');

const btnEpisode = document.querySelector('.btnEpisode');
const pageNumberCharacter = 42;
const pageNumberLocation = 7;
const pageNumberEpisode = 3;

btnCharacters.addEventListener('click', () => {
        
        for (let i = 1; i <= pageNumberCharacter; i++) {
            fetch(`https://rickandmortyapi.com/api/character?page=${i}`)
            .then(response => response.json())
            .then(data => {
                
                data.results.forEach(element => {
                    const createDiv = document.createElement('div');
                    createDiv.className = "card"
                    
                    const createH2 = document.createElement('h2')
                    createH2.textContent = element.name
                    
                    const createImg = document.createElement('img');
                    createImg.src = element.image
                    
                    const sectionPersonnage = document.querySelector('.sectionPersonnage')
                    
                    sectionPersonnage.appendChild(createDiv);
                    
                    createDiv.appendChild(createH2)
                    createDiv.appendChild(createImg)
                });
                
            })
        }
    
    })   
    
    btnPlace.addEventListener('click', () => {
        for (let i = 1; i < pageNumberLocation; i++) {
            fetch(`https://rickandmortyapi.com/api/location?page=${i}`)
                .then(response => response.json())
                .then(data => {
                    data.results.forEach( (element) => {
                        const createDiv = document.createElement('div');
                        createDiv.className = "card"
                        const createH2 = document.createElement('h2')
                        createH2.textContent = element.name
                        const createP = document.createElement('p')
                        createP.textContent = element.dimension
                        const sectionPersonnage = document.querySelector('.sectionPersonnage') 
                        sectionPersonnage.appendChild(createDiv);
                        createDiv.appendChild(createH2)
                        createDiv.appendChild(createP)
                        element.residents.forEach(element2 => {
                            fetch(element2)
                                .then(response => response.json())
                                .then(data => {
                                    const createResident = document.createElement('p')
                                    createResident.textContent = data.name
                                    createDiv.appendChild(createResident)
                                })
                    })
                })
            })
        }
    })


btnEpisode.addEventListener('click', () => {



    for (let i = 1; i <= pageNumberEpisode; i++) {
        fetch(`https://rickandmortyapi.com/api/episode?page=${i}`)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(element => {
                console.log(data.results);
                const createDiv = document.createElement('div');
                createDiv.className = "card"

                const createId = document.createElement('p')
                createId.textContent = element.id
                
                const createH2 = document.createElement('h2')
                createH2.textContent = element.name

                const createAirDate = document.createElement('p')
                createAirDate.textContent = element.air_date
                const sectionEpisodes = document.querySelector('.sectionEpisodes')
                sectionEpisodes.appendChild(createDiv);
                
                createDiv.appendChild(createId)
                createDiv.appendChild(createH2)
                createDiv.appendChild(createAirDate)
            });
        })
    }
})