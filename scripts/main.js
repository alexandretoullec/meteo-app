import jourTabOrdre from "./Utilitaire/gestionTemps.js"


const ApiKey = 'c618a9b1cdf4340b7c5de245c8725a6a';
let apiResult;
const temp = document.querySelector('.temps');

const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');
const jourDiv = document.querySelectorAll('.jour-prevision-nom');
const jourTemp = document.querySelectorAll('.jour-prevision-temp');
const imgIcone = document.querySelector('.logo-meteo')


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {

        // console.log(position);
        let long = position.coords.longitude;
        let lat = position.coords.latitude;

        appelApi(long,lat)

    }, () => {
        alert("Votre geolocalisation n'est pas activez veuillez l'activer!!")
    })

}

function appelApi(long, lat) {
    // console.log(long,lat);
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${ApiKey}`)
        .then(reponse => {
            return reponse.json();
        })
        .then(data => {
            console.log(data);
            apiResult = data;

            temp.innerText = apiResult.current.weather[0].description;
            temperature.innerText = `${Math.trunc(apiResult.current.temp)}°`
            localisation.innerText = apiResult.timezone;


            // les heures par tranche de 3 avec temp

            let heureActuelle = new Date().getHours();
            
            for (let i = 0; i < heure.length; i++) {
                let heureIncr = heureActuelle + i * 3;
                

                if (heureIncr > 24) {
                    heure[i].innerText = `${heureIncr -24 }h` ;

                } else if (heureIncr === 24){
                    heure[i].innerText = " 00 h";
                } else {
                    heure[i].innerText = `${heureIncr}h`
                }
                
                
                
                
                

            }

            // temp pour 3h

            for (let j = 0; j < tempPourH.length ; j++){
                tempPourH[j].innerText = `${Math.trunc(apiResult.hourly[j*3].temp)}°`
            }

            // 3 première lettre jour semaine
            
            for (let k = 0; k < jourTabOrdre.length; k++){
                jourDiv[k].innerText = jourTabOrdre[k].slice(0, 3);

            }

            //températures par jour

            for (let m = 0; m < jourTabOrdre.length; m++){
                jourTemp[m].innerText = `${Math.trunc(apiResult.daily[m+1].temp.day)}°`
            }

            //icone dynamique

            if (heureActuelle >= 6 && heureActuelle < 21) {
                imgIcone.src = `ressources/jour/${apiResult.current.weather[0].icon}.svg`
            } else {
                imgIcone.src = `ressources/nuit/${apiResult.current.weather[0].icon}.svg`
            }
    })
}