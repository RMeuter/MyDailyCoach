// ###################### Comment relier API et App : https://fireship.io/snippets/how-to-use-google-apis-or-gapi-with-firebase-auth/
/*La forme de data doit etre de la manière suivante :
 * data = {
 *          ArrayLiaison:[
 *              [MoyPasJournalier, CapteurPas],[MoyFrequenceCardiaqueJournaliere, FrequencesCardiaque] 
 *          ]
 *          moyennes3SemainesCapteurs: {
 *              "MoyPasJournalier":5000,
 *              "MoyFrequenceCardiaqueJournaliere": 90
 *              },
 *          donneesJournaliere:{ ## Chaque donné ou array est faite par heure avec l'heure donnée par la ref :"heure"
 *              "heure": [1587679197864, 1587679197864, 1587679197864, ...], # Donnée en milliseconde
 *              "CapteurPas": [0, 12, 800, ...],
 *              "FrequencesCardiaque": [[60, 63, 62],[60, 63],[60, 63, 62, 60, 63, 62], ] ## Ces données peuvent etre désordonner de la sorte 
 *              }
 *          }
 *        }
 *
 * 
 * ##### Information sur la forme des données : 
 *
* Fonction qui permet de recupéré correctement les valeurs :
* - (4) com.google.heart_rate.bpm : Que des fpVal (peut etre plusieur fois sur une heure) : 
* (relever des bpm du coeur plusieur fois sur une heure)
* 
* - (3) com.google.activity.segment : Que des intVal : une suite d'array par activité où il y a [numeroActivité, tempsMilliseconde, ?] il peut y avoir plusieur
* array de ce type sur une heure => type D'activité : https://developers.google.com/fit/rest/v1/reference/activity-types
* 
* - (2) com.google.step_count.delta : Que des intVal : le nombre de pas fais, c'est un nombre unique par heure
* 
* - (1) com.google.heart_minutes : FpVal en premiere qui est le nombre de point coeur, 
* puis intVal qui est le temps pour acquerir ces points coeurs
*
*/ 
module.exports = function formateDonnee(stepArray){
    let donneesJournaliere = {
        "heure": [],
        "CapteurPas":[],
        "CapteurSommeil":[],
        "CapteurPointCoeur":[],
        "CapteurFrequencesCardiaque":[],
    } 
    let arrayTri = [
        ["CapteurPas", "CapteurSommeil",
        "CapteurPointCoeur", "CapteurFrequencesCardiaque"],
        ["com.google.step_count.delta", "com.google.activity.segment",
        "com.google.heart_minutes",  "com.google.heart_rate.bpm"]
    ]

    for(const dataset of stepArray){
        donneesJournaliere.heure.push(dataset.startTimeMillis);
        for(const points of dataset.dataset){
            for (let element in donneesJournaliere){
                if (element != 'heure') donneesJournaliere[element].push([]);
            }
            for(const steps of points.point){
                let capteur = arrayTri[0][arrayTri[1].indexOf(steps.dataTypeName)];
                for(const v of steps.value){
                    if (v["intVal"]){
                        donneesJournaliere[capteur][donneesJournaliere[capteur].length-1].push(v.intVal);
                    } else if (v["fpVal"]){
                        donneesJournaliere[capteur][donneesJournaliere[capteur].length-1].push(v.fpVal);
                    } else {
                        console.log("Variable inconnu !")
                    }
                }
            }
        }
    }
    return donneesJournaliere;
}



