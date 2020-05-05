export default function (noteJournaliere, Activites){
    let array = []
    let borneMaxIntensiteJournaliere = 5;
    for(let activite in Activites){
        if (activite.IntensiteJour >= noteJournaliere && 
            (activite.IntensiteJour+borneMaxIntensiteJournaliere) <= noteJournaliere)
        {
            array.push(activite)
        }
    }
    let nbAle = Math.round(Math.random()*(array.length-1)); // ici il faudra remplacer par un algo de recommandation
    return array[nbAle]
}