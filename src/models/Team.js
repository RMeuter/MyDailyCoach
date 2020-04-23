import Range from "../utils/Range";

export default class Team {

    static CONTINENTS = ['Europe', 'South America', 'North America', 'Africa', 'Oceania', 'Asia', 'Antarctica'];

    constructor(p_name, p_flag, p_color = "#FFFFFF", p_victories = 0, p_continent) {

        if (typeof p_name === 'undefined') {
            throw new Error(`Parameter "Team's name" is mandatory`);
        }
        if (typeof p_flag === 'undefined') {
            throw new Error(`Parameter "Team's flag" is mandatory`);
        }
        if (typeof p_continent === 'undefined') {
            throw new Error(`Parameter "Team's continent" is mandatory`);
        }

        if (Team.CONTINENTS.includes(p_continent)) {
            this.continent = p_continent;
        } else {
            const accepted_values = Team.CONTINENTS.toString();
            throw new Error(`Parameter : "${p_continent}" is not correct, accepted values : ${accepted_values}`);
        }

        this.name = p_name;
        this.flag = p_flag;
        this.color = p_color;
        this.victories = p_victories;
    }

    get_image() {
        return `${this.flag}.png`;
    }

    //construction d'une structure de données adaptée à Chartjs
    get data() {
        const years = Range(1930, 2020, 4);
        const a = [];

        years.forEach(year => {
            let obj;

            if (this.victories.includes(year)) {
                obj = { x: year, y: 1 };
            } else {
                obj = { x: year, y: 0 };
            }

            a.push(obj);
        });

        return a;
    }

}