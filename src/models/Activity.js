export default class Activity {

    static CATEGORIE = ['Activité sportive relaxante', 'Actitivé sportive intense', 'Relaxation', 'Oceania', 'Asia', 'Antarctica'];

    constructor(a_name, a_color = "#FFFFFF", a_pic, a_desc, a_cat, a_url, a_intenDay, a_ptBienEtre) {

        if (typeof a_name === 'undefined') {
            throw new Error(`Parameter "Team's name" is mandatory`);
        }
        if (typeof a_url === 'undefined') {
            throw new Error(`Parameter "Team's flag" is mandatory`);
        }
        if (typeof a_intenDay === 'undefined') {
            throw new Error(`Parameter "Team's continent" is mandatory`);
        }

        if (Activity.CATEGORIE.includes(a_cat)) {
            this.continent = a_cat;
        } else {
            const accepted_values = Activity.CATEGORIE.toString();
            throw new Error(`Parameter : "${a_cat}" is not correct, accepted values : ${accepted_values}`);
        }

        this.name = a_name;
        this.cat = a_cat;
        this.pic = a_pic;
        this.color = a_color;
        this.desc = a_desc;
        this.url = a_url;
        this.intenDay = a_intenDay;
        this.ptBienEtre = a_ptBienEtre;
    }

    get_image() {
        return `${this.pic}.png`;
    }

}