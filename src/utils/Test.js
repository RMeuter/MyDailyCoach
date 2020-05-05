import data from "../JsonFile/Step.json"
import activites from "../JsonFile/Activity.json"
import regulation from "./regulation"
import calculPointIntensiteJournaliere from "./calculPointIntensiteJournaliere"
import trouverActivite from "./trouverActivite.js"

let essaie = calculPointIntensiteJournaliere(data, regulation)
console.log(essaie);

let activiteSortie = trouverActivite(essaie, activites.activite)
console.log(activiteSortie);