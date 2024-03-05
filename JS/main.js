'use strict';
const inputSearch = document.querySelector('.js-search');
const buttonSearch = document.querySelector('.js-button');
const containerSerie = document.querySelector('.js-container');

let titleSeries = [];
let favoriteSerie = [];

/* Pintar las series en el html cuando la busquen*/
const renderSeries = (data) => {
    let content = '';
    
    for(const serie of data){
        content += `<div>
                <img src="${serie.images.jpg.image_url}"/>
                  <h3>${serie.title}</h3>`;
       content += '</div>';
    }
   containerSerie.innerHTML = content;
}



/* Buscar las series con la info del servidor */

const handleclick = (event) => {
    event.preventDefault();
    const clickButton = inputSearch.value;
    const url = `https://api.jikan.moe/v4/anime?q=naruto ${clickButton}`;
    
    fetch(url)
    .then((response) => response.json())
    .then((allData) => {
       const titleSeries = allData.data; //array
        renderSeries(titleSeries);
        localStorage.setItem('seriesAnime',JSON.stringify(titleSeries));
    });

    const titleSeriesLS = JSON.parse(localStorage.getItem('seriesAnime'));
  
}




buttonSearch.addEventListener('click', handleclick);


  