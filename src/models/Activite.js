export default class Activite {

    static CATEGORIE = ['Activité sportive relaxante', 'Activité sportive intense', 'Relaxation'];
    // Choix des couleurs :https://htmlcolorcodes.com/fr/
    static COULEUR = ["#F7FF20","#FB2A10","#9AFF7C"]
    constructor(a_nom, a_pic, a_desc, a_cat, a_url, a_intenDay, a_ptBienEtre) {

        if (typeof a_nom === 'undefined') {
            throw new Error(`Parameter "Activite's nom" is mandatory`);
        }
        if (typeof a_url === 'undefined') {
            //Utilisation d'url youtube spéciale tel que https://www.youtube.com/embed/QjoZfET5kJ8 (il y a embed en plus)
            // il faut aller sur la vidéo => partage => intégré et tu recup l'url
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