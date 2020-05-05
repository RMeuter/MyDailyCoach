export default function(idParametre,parametreChangeant){
    let obj = [
        {
        "useParametre.NePlusVoirExplication":null,
        },
        {
            "useParametre.NombreDePas":null,
        },{
            "useParametre.PointCoeur":null,
        },{
            "useParametre.freqCardiaque":null,
        },
    ]
    let array = [
        "NePlusVoirExplication",
        "NombreDePas",
        "PointCoeur",
        "freqCardiaque"
    ] 
    let key = Object.keys(obj[idParametre])[0]
    obj[idParametre][key] = parametreChangeant
    return [obj[idParametre], array[idParametre]]
}
