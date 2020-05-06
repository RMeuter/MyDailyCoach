module.exports = {
    // ######### Entre Regulation (afin déviter le code spagetti et faire une code flexible sur les données):

    CapteurPas:{
        // Les pas sont issues de com.google.step_count.delta
        // La forme des données des pas nbPasEnUneHeure = [12, 23, ...] 
        // une unique array pour 24 heures
        Calcul(donneePas){
            return donneePas.reduce((accumulator, currentValue) => accumulator + currentValue)
        },
        typeCapteur :1, // type 1 revèle plus de l'activité
        AugmentatioNFoixPlusEleve:
        /**Recommandation :
         * - Nécéssite que la liste soit trier dans l'ordre décroissant de la valeur N
         */
            [ 
                { N : 2, ajoutPoint : 3},
                { N : 1, ajoutPoint : 2},
                { N : 1/2, ajoutPoint : 0},
                { N : 1/3, ajoutPoint : 1},
                { N : 1/4, ajoutPoint : 2},
                { N : 0, ajoutPoint : 3},
            ]  
    },
    CapteurSommeil:{
        // Le sommeil est issue de com.google.activity.segment (Activité numéro 72 et 109 à 112)
        // Le format des données est [tempsActivité, numéroActivité, numero ?] 
        // => une array par heure (x24)
        // Attention : Toujours par trois nombre, il peut y avoir plusieur activité en une array
        Calcul(donneeSommeil){
            let tempsSommeil = 0;
            let arraySommeil = [72, 109, 110, 111, 112];
            for (let arrayActivite in donneeSommeil){
                let i = 0;
                while(i < donneeSommeil[arrayActivite].length){
                    if(arraySommeil.includes(donneeSommeil[arrayActivite][i])){
                        tempsSommeil += donneeSommeil[arrayActivite][i+1];
                    }
                    i+=3
                }
            }
            return tempsSommeil;
        },
        typeCapteur :0, // type 0 revèle plus de l'anxiété
        AugmentatioNFoixPlusEleve:
            [ 
                { N : 6/5, ajoutPoint : 3},
                { N : 1, ajoutPoint : 2},
                { N : 4/5, ajoutPoint : 0},
                { N : 1/2, ajoutPoint : 1},
                { N : 1/3, ajoutPoint : 2},
                { N : 0, ajoutPoint : 3},
            ]
    },
    CapteurPointCoeur:{
        // Les pointsCoeurs est issue de com.google.heart_minutes
        // Le format des données est [nbPointCoeur, TempsPourObtenirDurantHeure] 
        // une array par heure (x24)
        Calcul(donneePointCoeur){
            let pointCumule = 0;
            for(let trancheHeure in donneePointCoeur){
                pointCumule+=donneePointCoeur[trancheHeure][0];
            }
            return pointCumule;
        },
        typeCapteur :1, // type 1 revèle plus de l'activité
        AugmentatioNFoixPlusEleve:
            [ 
                { N : 2, ajoutPoint : 3},
                { N : 1, ajoutPoint : 2},
                { N : 1/2, ajoutPoint : 0},
                { N : 1/3, ajoutPoint : 1},
                { N : 1/4, ajoutPoint : 2},
                { N : 0, ajoutPoint : 3},
            ]
    },
    CapteurFrequencesCardiaque:{
        // Les FreqCardiaques sont issues de com.google.heart_rate.bpm
        // Le formats des données est [67, 68, 69, ...] 
        // une array par heure (x24)
        Calcul(donneeFreqCardiaque){
            let pointCumule = 0;
            let nbCumule = 0;
            for (let freq in donneeFreqCardiaque){
                for(let trancheHeure in donneeFreqCardiaque[freq]){
                    pointCumule+=donneeFreqCardiaque[freq][trancheHeure];
                    nbCumule++
                }
            }
            return Math.round(pointCumule/nbCumule);
        },
        typeCapteur :0, // type 0 revèle plus de l'anxiété
        AugmentatioNFoixPlusEleve:
            [ 
                { N : 2, ajoutPoint : 3},
                { N : 1, ajoutPoint : 2},
                { N : 1/2, ajoutPoint : 0},
                { N : 1/3, ajoutPoint : 1},
                { N : 1/4, ajoutPoint : 2},
                { N : 0, ajoutPoint : 3},
            ]
    }
}