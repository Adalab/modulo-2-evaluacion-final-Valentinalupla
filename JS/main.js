'use strict';
const inputSearch = document.querySelector('.js-search');
const buttonSearch = document.querySelector('.js-button');
const containerSerie = document.querySelector('.js-container');
const url = 'https://api.jikan.moe/v4/anime?q=naruto';
let titleSeries = [];
let favoriteSerie = [];

const renderSeries = (data) => {
    let content = '';
    
    for(const serie of data){
        containerSerie.innerHTML = `<div id="${serie.id}">
            <h3>${serie.title}</h3>
        `
         for(const title of serie.titles){
            // console.log(title);
            content += `<div ${title}></div> `
        }
       content += '</div>'
    }
   containerSerie.innerHTML = content;
}



/* Pintar las series con la info del servidor */

    fetch(url)
    .then((response) => response.json())
    .then((allData) => {
        console.log('ha hecho una peticion al servidor');
       const titleSeries = allData.data; //array
        renderSeries(titleSeries);
        localStorage.setItem('seriesAnime',JSON.stringify(titleSeries));
    });

    const titleSeriesLS = JSON.parse(localStorage.getItem('seriesAnime'));
    console.log(titleSeriesLS);

 

const handleclick = (event) => {
   event.preventDefault();
    const clickButton = inputSearch.value;
    console.log('click');
}
    const searchSeries = titleSeries.filter((serie) => {
        return serie.title.includes(clickButton);
    })



buttonSearch.addEventListener('click', handleclick);


  