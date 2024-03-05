'use strict';
const inputSearch = document.querySelector('.js-search');
const buttonSearch = document.querySelector('.js-button');
const container = document.querySelector('.js-container');
const containerFavoriteSerie = document.querySelector('.js-container-favorite');

let titleSeries = [];
let favoriteSerie = [];


/*Click serie favorita */
const handleAddFavorite = () => {
    console.log('ey');
}


/* Pintar las series en el html cuando la busquen*/
const fillerImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';


const renderSeries = (data) => {
    let content = '';
    
    for(const serie of data){
     const imageUrl = serie.images.jpg.image_url ? serie.images.jpg.image_url : fillerImage;

        content += `<div class="js-serie">
                <img src="${serie.images.jpg.image_url}"/>
                  <h3>${serie.title}</h3>`;
        content += '</div>';
    }
   container.innerHTML = content;
   const containerSeries = document.querySelectorAll('.js-serie');
   for(const containerSerie of containerSeries){
    containerSerie.addEventListener('click', handleAddFavorite);
   }
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


  