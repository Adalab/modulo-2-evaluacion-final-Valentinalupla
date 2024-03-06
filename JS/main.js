'use strict';
const inputSearch = document.querySelector('.js-search');
const buttonSearch = document.querySelector('.js-button');
const container = document.querySelector('.js-container');
const containerFavoriteSerie = document.querySelector('.js-container-favorites');

let titleSeries = [];
let favoriteSerie = [];

/* Guardar serie favorita en LocalStorage */
// const favoriteSerieLS = () => {
//     const favStorage = localStorage.getItem('favoriteSerie');
//     if(favStorage){
//         favoriteSerie = JSON.parse(favStorage);
        
//     }
// }
const saveFavSerieLS = () => {
    localStorage.setItem('favoriteSerie', JSON.stringify(favoriteSerie));
    console.log(saveFavSerieLS);
}

/*Click serie favorita |FAVORITOS|  */
const handleAddFavorite = (event) => {
    event.preventDefault();
   const selectedSerie = titleSeries.find((serie) => {
    return parseInt(event.currentTarget.id) === serie.mal_id;
    });
    // buscar si el elemento seleccionado ya existe en favoritos
    const indexFavSerie = favoriteSerie.findIndex((favoriteTitle) => {
        return favoriteTitle.mal_id === selectedSerie.mal_id;
    });
    console.log(favoriteSerie);
    if(indexFavSerie === -1){
        saveFavSerieLS();
        favoriteSerie.push(selectedSerie);
        event.currentTarget.style.backgroundColor = 'greenyellow';
        event.currentTarget.style.color = 'deeppink';
    };

renderSeries(favoriteSerie, containerFavoriteSerie);   /*Renderiza las series */
}


/* Pintar las series en el html cuando la busquen |BÚSQUEDA| */

const fillerImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

const renderSeries = (data, containerFavoriteSerie) => {
    let content = '';
    
    for(const serie of data){
     const imageUrl = serie.images.jpg.image_url ? serie.images.jpg.image_url : fillerImage;

        content += ` <div class="individual-serie js-serie" id="${serie.mal_id}">
                <img src="${serie.images.jpg.image_url}"/>
                  <h3>${serie.title}</h3>`;
        content += '</div>';
    }
   containerFavoriteSerie.innerHTML = content;
   const containerSeries = document.querySelectorAll('.js-serie');
   for(const containerSerie of containerSeries){
    containerSerie.addEventListener('click', handleAddFavorite);
   }
}



/* Buscar las series con la info del servidor |BÚSQUEDA| */ 

const handleclick = (event) => {
    event.preventDefault();
    const clickButton = inputSearch.value;
    const url = `https://api.jikan.moe/v4/anime?q=naruto ${clickButton}`;
    
    fetch(url)
    .then((response) => response.json())
    .then((allData) => {
         titleSeries = allData.data; //array
        renderSeries(titleSeries, container);
        localStorage.setItem('seriesAnime',JSON.stringify(titleSeries));
    });

    const titleSeriesLS = JSON.parse(localStorage.getItem('seriesAnime'));
  
}


buttonSearch.addEventListener('click', handleclick);


  