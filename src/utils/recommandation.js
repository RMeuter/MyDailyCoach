/**
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
 * Pour permettre l'ajout des points l'algorithme essayer de voir du coté de sa moyenne
 * habituelle on prend le summary a partir des 3 dernières semaines (temps de mise en place des habitudes)
 * l'API google nous fournit sa moyenne directement. 
 * Si passe au dessus il y a plus d'éffort fournit dans la journée de l'utilisateur par rapport à ces habitudes..
 * On additionne par variable et par le taux de dépassement
 * exemple : moyenne 1000 pas jour
 * S'il fait 3000 pas (il a un ratio de 3x son score habituelle donc
 * plus trois points !)
 * => Ceci est pris en compte par le parametre regulation qui adapte les calcul et
 * l'ajout de point selon les capteurs.
 */

export default function (data, regulation, Activites){
    let capteurDispo = [0, 0];
    let pointIntensiteDay = [0, 0];
    for (let liaison in data.ArrayLiaison){
        try {
            let moyenne3SemaineCapteur = data.moyennes3SemainesCapteurs[data.ArrayLiaison[liaison][0]];
            let resultat = regulation[data.ArrayLiaison[liaison][1]].Calcul(data.donneesJournaliere[data.ArrayLiaison[liaison][1]])
            for(let augmentationFoix in regulation[data.ArrayLiaison[liaison][1]].AugmentatioNFoixPlusEleve){
                if (moyenne3SemaineCapteur*regulation[data.ArrayLiaison[liaison][1]].AugmentatioNFoixPlusEleve[augmentationFoix].N <= resultat){
                    pointIntensiteDay[regulation[data.ArrayLiaison[liaison][1]].typeCapteur] += regulation[data.ArrayLiaison[liaison][1]].AugmentatioNFoixPlusEleve[augmentationFoix].ajoutPoint
                    capteurDispo[regulation[data.ArrayLiaison[liaison][1]].typeCapteur] += 1; 
                    break;   
                }
            }
        } catch (e) {
            console.log(e);
            console.log("Attention la valeur "+data.ArrayLiaison[liaison][1]+ " est manquante dans régulation");
        }
    }
    let pointMoyen = 0;
    for(let capteur in capteurDispo){
        pointMoyen += pointIntensiteDay[capteur]/capteurDispo[capteur];
    }
    return trouveActivite (pointMoyen, Activites); 
 }

function trouveActivite (noteJournaliere, Activites){
    let array = []
    let borneMaxIntensiteJournaliere = 5;
    for(let activite in Activites){
        if (Activites[activite].IntensiteJour >= noteJournaliere && 
            Activites[activite].IntensiteJour <= (noteJournaliere+borneMaxIntensiteJournaliere))
        {
            array.push(Activites[activite])
        }
    }
    let nbAle = Math.round(Math.random()*(array.length-1)); // L'algorithme de recommandation sera appeler ici
    return array[nbAle]
}