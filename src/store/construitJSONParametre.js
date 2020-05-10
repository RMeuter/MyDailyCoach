export default function(idParametre,parametreChangeant){
    let obj = [
        {
        "useParametre.NePlusVoirExplication":null,
        },
        {
            "useParametre.capteurPas":null,
        },
        {
            "useParametre.capteurSommeil":null,
        }
    ]
    let array = [
        "NePlusVoirExplication",
        "capteurPas",
        "capteurSommeil"
    ] 
    let key = Object.keys(obj[idParametre])[0]
    obj[idParametre][key] = parametreChangeant
    return [obj[idParametre], array[idParametre]]
}
