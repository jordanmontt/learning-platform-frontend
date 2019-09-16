export default class PersonInterceptor {

    static parseOne(unparsedPerson) {
        return {
            idPerson: parseInt(unparsedPerson.idPerson),
            rol: unparsedPerson.rol,
            email: unparsedPerson.email,
            names: unparsedPerson.names,
            lastNames: unparsedPerson.lastNames,
            birthDate: unparsedPerson.birthDate,
            password: unparsedPerson.password
        };
    }

    static parseMany(unparsedPersons) {
        let parsedPersons = [];
        unparsedPersons.forEach(l => {
            parsedPersons.push(this.parseOne(l));
        })
        return parsedPersons
    }
}