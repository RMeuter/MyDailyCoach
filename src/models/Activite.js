export default class Activite {

    static CATEGORIE = ['Activité sportive relaxante', 'Activité sportive intense', 'Relaxation'];

    static COULEUR = ["#FFA500B3","#FF0000B3","#ADFF2FB3"]
    constructor(a_nom, a_pic, a_desc, a_cat, a_url, a_intenDay, a_ptBienEtre) {

        if (typeof a_nom === 'undefined') {
            throw new Error(`Parameter "Activite's nom" is mandatory`);
        }
        if (typeof a_url === 'undefined') {
            throw new Error(`Parameter "Activite's flag" is mandatory`);
        }
        if (typeof a_intenDay === 'undefined') {
            throw new Error(`Parameter "Activite's continent" is mandatory`);
        }
        if (typeof a_pic === 'undefined') {
            throw new Error(`Parameter "Activite's continent" is mandatory`);
        }
        if (typeof a_desc === 'undefined') {
            throw new Error(`Parameter "Activite's continent" is mandatory`);
        }
        if (typeof a_ptBienEtre === 'undefined') {
            a_ptBienEtre = 0;
        }
        if (Activite.CATEGORIE.includes(a_cat)) {
            this.categorie = a_cat;
            this.couleur = Activite.COULEUR[Activite.CATEGORIE.indexOf(a_cat)]
        } else {
            const accepted_values = Activite.CATEGORIE.toString();
            throw new Error(`Parameter : "${a_cat}" is not correct, accepted values : ${accepted_values}`);
        }

        this.nom = a_nom;
        this.image = a_pic;
        this.description = a_desc;
        this.url = a_url;
        this.IntensiteJour = a_intenDay;
        this.PointBienEtre = a_ptBienEtre;
    }

    get_image() {
        return this.image;
    }
    get_color(){
        return this.couleur;
    }

}