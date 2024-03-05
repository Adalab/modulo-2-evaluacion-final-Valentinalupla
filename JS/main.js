'use strict';
inputSearch = document.querySelector('.js-search');
buttonSearch = document.querySelector('.js-button');

const url = 'https://api.jikan.moe/v4/anime?q=naruto';
let animeSeries = [];
let favoriteSerie = [];

/* Renderizar búsqueda */
const renderSeries = () => {
    let content = '';
    for(const serie of series) {
        content += `<div class="js-serie"> 
        <img class="js-img"/>
        <h3>${serie.title}</h3>
        </div>`;
    }
    content += '</div>';
}




/* Pintar las series con la info del servidor */

const dataOfSeries = () => {
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        animeSeries = data.series;
        console.log(data);
        localStorage.setItem('seriesAnime', JSON.stringify(animeSeries));
    });
};

    // const dataSeriesLS = JSON.parse(localStorage.getItem('seriesAnime'));






    buttonSearch.addEventListener('click' handleSearch);