'use strict';
const inputSearch = document.querySelector('.js-search');
const buttonSearch = document.querySelector('.js-button');
const container = document.querySelector('.js-container');
const containerFavoriteSerie = document.querySelector('.js-container-favorites');
const buttonSeries = document.querySelector('.js-buttonSeries');

let titleSeries = [];
let favoriteSerie = [];

/* Guardar serie favorita en LocalStorage */
const saveFavSerieLS = () => {
    localStorage.setItem('favoriteSerie', JSON.stringify(favoriteSerie));
}
const favoriteSerieLS = () => {
    const favStorage = localStorage.getItem('favoriteSerie');
    if(favStorage){
        favoriteSerie = JSON.parse(favStorage);
        console.log(favoriteSerie);
    }
}
favoriteSerieLS();


/*Click serie favorita |FAVORITOS|  */
const handleAddFavorite = (event) => {
    event.preventDefault();
    const selectedSerie = titleSeries.find((serie) => {
        return parseInt(event.currentTarget.id) === serie.mal_id;
        }); console.log('selectedSerie', selectedSerie);

    // buscar si el elemento seleccionado ya existe en favoritos
    const indexFavSerie = favoriteSerie.findIndex((favoriteTitle) => {
         return favoriteTitle.mal_id === selectedSerie.mal_id;
     });

    if(indexFavSerie === -1){
        favoriteSerie.push(selectedSerie);
        event.currentTarget.style.backgroundColor = 'deeppink';
        event.currentTarget.style.color = 'white';
        saveFavSerieLS();
    }

    renderSeries(favoriteSerie, containerFavoriteSerie);   /*Renderiza las series */
}


/* Pintar las series en el html cuando la busquen |BÚSQUEDA| */

const fillerImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

const renderSeries = (data, containerFavoriteSerie) => {
    let content = '';
    const urlTwo = 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png';
    for(const serie of data){
     const imageUrl = serie.images.jpg.image_url !== urlTwo ? serie.images.jpg.image_url : fillerImage;

        content += ` <div class="individual-serie js-serie" id="${serie.mal_id}">
                <img src="${imageUrl}"/>
                  <h3 class="title-serie">${serie.title}</h3>
                  <span class="title-serie">Episodes ${serie.episodes}</span>`;
        content += '</div>';
    }
   containerFavoriteSerie.innerHTML = content;
   const containerSeries = document.querySelectorAll('.js-serie');
    for(const containerSerie of containerSeries){
      containerSerie.addEventListener('click', handleAddFavorite);
    }
}

renderSeries(favoriteSerie, containerFavoriteSerie); 



/* Buscar las series con la info del servidor |BÚSQUEDA| */ 

const handleclick = (event) => {
    event.preventDefault();
    const clickButton = inputSearch.value;
    const url = `https://api.jikan.moe/v4/anime?q=${clickButton}`;
    
    fetch(url)
    .then((response) => response.json())
    .then((allData) => {
         titleSeries = allData.data; //array
        renderSeries(titleSeries, container);
        localStorage.setItem('seriesAnime',JSON.stringify(titleSeries));
    });

  
}


buttonSearch.addEventListener('click', handleclick);

buttonSeries.addEventListener ('click', () => {
   for(const serie of titleSeries){
    console.log('series', serie.title);
   }
});


  