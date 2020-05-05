const fs = require('fs');

module.exports = class PeopleService {
    constructor() {
        this.peoples = JSON.parse(fs.readFileSync(__dirname + '/people.json', 'utf8'));
    }

    updatePeople(id, people) {
        let person = this.peoples[id];
        if (person == null) {
            return HttpStatus.NOT_FOUND;
        }
        this.peoples[id] = people;
        return HttpStatus.OK;
    }
    
    getPeople(filters) {
        if (Object.entries(filters).length === 0){
            return this.peoples;
        }

        let tabpeople = [];        
        this.peoples.forEach(people => {
            for (const key in filters) {
                if (people[key] === filters[key]) {
                    tabpeople.push(people);
                }
            }
        });
        return tabpeople;    
    }
}
