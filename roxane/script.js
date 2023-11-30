//A l'aide de l'API Rick et Morty et du fetch, créez un site mono page (One Page Application) qui permettra d'afficher à l'aide d'un bouton la section correspondante :

// Une section avec tous les personnages de la série (afficher le nom et son image)
// Une section avec tous les lieux de la série (afficher le nom, la dimension et tous les résidents)
// Une section avec tous les épisodes (numéro de l'épisode, le nom et sa date de sortie)

// La grosse difficulté que vous allez avoir, est que l'API resteint l'accès aux données 20 par 20. Il va donc falloir parcourir les pages lors du fetch (à l'aide d'une boucle for)

// Lors de l'affichage de tous les résidents dans la partie avec tous les lieux de la série, il faudra utiliser un foreach

// Le design du site doit être la dernière chose à faire

// Documentation : https://rickandmortyapi.com/

// 3 boutons
// Ecouteurs d'événement
// -> fetch -> afficher les différentes sections
// display la bonne section
// display none les mauvaises


const apiUrl = 'https://rickandmortyapi.com/api';
const container = document.querySelector('#container');
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const type = button.id;
        const pageCount = pageNumber(type);
        fetchData(type, pageCount);
    });
});

function pageNumber(type) {
    // Retourne le nombre de pages en fonction du type
    if (type === 'episode') {
        return 3;
    }
    if (type === 'location') {
        return 7;
    }
    if (type === 'character') {
        return 42;
    }
}

async function fetchData(type, pageCount) {
    try {
        let allData = [];

        for (let page = 1; page <= pageCount; page++) {
            const response = await fetch(`${apiUrl}/${type}?page=${page}`);
            const data = await response.json();

            if (data.results) {
                allData = allData.concat(data.results);

            }
        }

        if (type === 'character') {
            displayCharacters(allData, container);
        } else if (type === 'location') {
            displayLocations(allData, container);
        }
        else if (type === 'episode') {
            displayEpisodes(allData, container);
        }
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des données', error);
    }

}
function displayCharacters(data, container) {
    container.textContent = ''; // Efface le contenu précédent

    if (data.length > 0) {
        data.forEach(character => {
            const wrapper = document.createElement('div');
            wrapper.classList.add('character');

            const nameElement = document.createElement('p');
            nameElement.textContent = character.name
            wrapper.appendChild(nameElement);


            const imageElement = document.createElement('img');
            imageElement.src = character.image;
            imageElement.alt = character.name
            wrapper.appendChild(imageElement);


            container.appendChild(wrapper);
        });
    } else {
        console.error('Aucune donnée trouvée.');
    }
}

function displayLocations(data, container) {
    container.textContent = ''; // Efface le contenu précédent

    if (data.length > 0) {
        data.forEach(location => {
            const wrapper = document.createElement('div');
            wrapper.classList.add('location-item');

            const nameElement = document.createElement('p');
            nameElement.textContent = `Location: ${location.name}`;
            wrapper.appendChild(nameElement);

            const dimensionElement = document.createElement('p');
            dimensionElement.textContent = `Dimension: ${location.dimension}`;
            wrapper.appendChild(dimensionElement);

            const residentsList = document.createElement('ul');
            residentsList.textContent = 'Residents:';

            location.residents.forEach(residentUrl => {
                fetch(residentUrl)
                    .then(response => response.json())
                    .then(resident => {
                        const residentItem = document.createElement('li');
                        residentItem.textContent = resident.name;
                        residentsList.appendChild(residentItem);
                    })
                    .catch(err => console.error('Erreur lors de la récupération du résident:', err));
            });

            wrapper.appendChild(residentsList);
            container.appendChild(wrapper);
        });
    } else {
        console.error('Aucune donnée de lieu trouvée.');
    }
}

function displayEpisodes(data, container) {
    container.textContent = ''; // Efface le contenu précédent

    if (data.length > 0) {
        data.forEach(episode => {
            const wrapper = document.createElement('div');
            wrapper.classList.add('episode-item');

            const episodeNumber = document.createElement('p');
            episodeNumber.textContent = `Épisode: ${episode.episode}`;
            wrapper.appendChild(episodeNumber);

            const episodeName = document.createElement('p');
            episodeName.textContent = `Nom: ${episode.name}`;
            wrapper.appendChild(episodeName);

            const airDate = document.createElement('p');
            airDate.textContent = `Date de sortie: ${episode.air_date}`;
            wrapper.appendChild(airDate);

            container.appendChild(wrapper);
        });
    } else {
        console.error('Aucune donnée d\'épisode trouvée.');
    }
}

// function fetchData(type, pageCount) {
//     let allData = [];

//     const fetchPage = (page) => {
//         return fetch(`${apiUrl}/${type}?page=${page}`)
//             .then(response => response.json())
//             .then(data => {
//                 if (data.results) {
//                     allData = allData.concat(data.results);
//                 }
//             });
//     };

//     const fetchPages = () => {
//         const promises = [];
//         for (let page = 1; page <= pageCount; page++) {
//             promises.push(fetchPage(page));
//         }
//         return Promise.all(promises);
//     };

//     fetchPages()
//         .then(() => {
//             if (type === 'character') {
//                 displayCharacters(allData, container);
//             } else if (type === 'location') {
//                 displayLocations(allData, container);
//             } else if (type === 'episode') {
//                 displayEpisodes(allData, container);
//             }
//         })
//         .catch(error => {
//             console.error('Une erreur s\'est produite lors de la récupération des données', error);
//         });
// }