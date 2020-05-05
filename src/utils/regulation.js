var regulation = {
    CapteurPas:{
        // Les pas sont issues de com.google.step_count.delta
        // La forme des données des pas nbPasEnUneHeure = [12, 23, ...] 
        // une unique array pour 24 heures
        Calcul(donneePas){
            return donneePas.reduce((accumulator, currentValue) => accumulator + currentValue)
        },
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
            for (let arrayActivite in donneeSommeil){
                let i = 0;
                while(i < arrayActivite.length){
                    if(donneeSommeil[i] in [72, 109, 110, 111, 112]){
                        tempsSommeil += donneeSommeil[i+1];
                    }
                    i+=3
                }
            }
            return tempsSommeil;
        },
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
    PointCoeur:{
        // Les pointsCoeurs est issue de com.google.heart_minutes
        // Le format des données est [nbPointCoeur, TempsPourObtenirDurantHeure] 
        // une array par heure (x24)
        Calcul(donneePointCoeur){
            let pointCumule = 0;
            for(let trancheHeure in donneePointCoeur){
                pointCumule+=trancheHeure[0];
            }
            return pointCumule;
        },
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
    CapteurFreqCardiaque:{
        // Les FreqCardiaques sont issues de com.google.heart_rate.bpm
        // Le formats des données est [67, 68, 69, ...] 
        // une array par heure (x24)
        Calcul(donneeFreqCardiaque){
            let pointCumule = 0;
            let nbCumule = 0;
            for (let freq in donneeFreqCardiaque){
                for(let trancheHeure in freq){
                    pointCumule+=trancheHeure[0];
                    nbCumule++
                }
            }
            return pointCumule/nbCumule;
        },
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