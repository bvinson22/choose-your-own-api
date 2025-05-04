import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({});

let currentPage = 1;

const characterList = document.querySelector('.character-list'); 
const loadMoreButton = document.querySelector('#load-more');
const spinner = document.querySelector('.spinner');

function fetchCharacters(page) {
  spinner.style.display = 'block';

  const disneyCharactersURL = `https://api.disneyapi.dev/character?page=${page}`;

  fetch(disneyCharactersURL)
    .then(response => response.json())
    .then(characters => {
      spinner.style.display = 'none';

      characters.data.forEach(character => {
        const template = document.createElement('li');
        template.classList.add('fade-in');
        template.innerHTML = `
          <img src="${character.imageUrl}" alt="${character.name}" />
          <h2>${character.name}</h2>
          <div class="character-details">
            <p><strong>Films:</strong> ${character.films.length ? character.films.join(', ') : 'No films listed'}</p>
            <p><strong>TV Shows:</strong> ${character.tvShows.length ? character.tvShows.join(', ') : 'No TV shows listed'}</p>
          </div>
        `;
        characterList.appendChild(template);
      });
    })
    .catch(error => {
      spinner.style.display = 'none';
      console.error('Error fetching Disney characters:', error);
      characterList.insertAdjacentHTML('beforeend', "<li>Couldn't load more characters.</li>");
    });
}

fetchCharacters(currentPage);

loadMoreButton.addEventListener('click', () => {
  currentPage++;
  fetchCharacters(currentPage);
  window.scrollBy({ top: 400, behavior: 'smooth' });
});
