import data from "../JsonFile/Step.json"
import activites from "../JsonFile/Activity.json"
import regulation from "./regulation"
import calculPointIntensiteJournaliere from "./calculPointIntensiteJournaliere"

let essaie = calculPointIntensiteJournaliere(data, regulation, activites)
console.log(essaie);
