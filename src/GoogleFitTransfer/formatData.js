function takeSleepData(stepArray){
    //console.log(stepArray)
    let valueActivity = {
        "time": [],
        "steps":[],
        "activity":[],
    } 

    for(const dataset of stepArray){
        valueActivity.time.push(dataset.startTimeMillis);
        //console.log("\n\n ############## dataset "+ valueActivity.time[valueActivity.time.length - 1]);
        //console.log(dataset);
        for(const points of dataset.dataset){
            //console.log("points \n\n ");
            //console.log(points);
            let ordre = 1;
            valueActivity.activity.push([]);
            for(const datas of points.point){
                console.log("steps \n\n");
                console.log(datas);
                for(const v of datas.value){
                    if (ordre==1)  valueActivity.activity[valueActivity.activity.length-1].push(v.fpVal);
                    else valueActivity.activity[valueActivity.activity.length-1].push(v.intVal);
                    ordre ++;
                }
            }
        }
    }
    return valueActivity;
}

function endFor (type, ordre){
    /**
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
     */
    //if (type==1)

}