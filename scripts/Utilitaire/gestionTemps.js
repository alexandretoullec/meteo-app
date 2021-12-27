const jourSem = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

let ajd = new Date();
let option = { weekday: 'long' };
let jourActuel = ajd.toLocaleDateString('fr-FR', option);
// console.log(jourActuel,ajd);

jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);

let jourTabOrdre = jourSem.slice(jourSem.indexOf(jourActuel)).concat(jourSem.slice(0, jourSem.indexOf(jourActuel)))
// console.log(jourTabOrdre);

export default jourTabOrdre