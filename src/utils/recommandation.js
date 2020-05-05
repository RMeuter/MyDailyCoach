// Algorithme de recommandation possible : https://medium.com/@lgrees/creating-a-simple-recommendation-engine-using-javascript-and-neo4j-c0fe9859c469

/**
 * Savoir l'intensité d'éffort de la journée sera basé sur 
 * l'éffort et le temps d'éffort 
 * Au début recommandation aléatoire, puis avec les points
 * et enfin algo ML
 * 
 * Pour l'ajout des points on peut essayer de voir du coté de sa moyenne
 * habituelle on prend le summary a partir des 3 dernières
 * semaines (temps de mise en place des habitudes) (merci le bucket !)
 * selon google => moyenne
 * Si passe au dessus il y a plus d'éffort..
 * On additionne par variable et par le taux de dépassement
 * exemple : moyenne 1000 pas jour
 * S'il fait 3000 pas (il a un ratio de 3x son score habituelle donc
 * plus trois points !)
 * 
 * La forme de data doit etre de la manière suivante :
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
 *              "FrequencesCardiaque": [[60, 63, 62],[60, 63],[60, 63, 6260, 63, 62], ] ## Ces données peuvent etre désordonner de la sorte 
 *              }
 *          }
 *        }
 * 
 * 
 */



 function recommandation(data, regulation){
    let pointIntensiteDay = 0;
    for (let liaison in data.ArrayLiaison){
        let moyenne3SemaineCapteur = data.moyennes3SemainesCapteurs[liaison[0]];
        try {
            console.log(regulation[liaison[1]]);
            let result = regulation[liaison[1]].calcul(data.donneesJournaliere[liaison[1]])
            for(let augmentationFoix in regulation[liaison[1]].AugmentatioNFoixPlusEleve){
                if (moyenne3SemaineCapteur*augmentationFoix.N <= result){
                    pointIntensiteDay += augmentationFoix.ajoutPoint
                    break;
                }
            }
        } catch (e) {
            console.log(e);
            console.log("Attention la valeur "+liaison[1]+ " est manquante dans régulation");
        }
    }
    return pointIntensiteDay;
 }


 // ######### Entre Regulation (afin déviter le code spagetti et faire une code flexible sur les données):

import data from "../JsonFile/Step.json"
import {regulation} from "./regulation"

console.log(recommandation(data, regulation));
