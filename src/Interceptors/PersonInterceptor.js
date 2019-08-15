export default class PersonInterceptor {

    static parsePerson(unparsedPerson) {
        return {
            idPerson: parseInt(unparsedPerson.idPerson),
            rol: unparsedPerson.rol,
            email: unparsedPerson.email,
            firstName: unparsedPerson.firstName,
            secondName: unparsedPerson.secondName,
            fatherLastName: unparsedPerson.fatherLastName,
            motherLastName: unparsedPerson.motherLastName,
            birthDate: unparsedPerson.birthDate
        };
    }

    static parse(unparsedPersons) {
        let parsedPersons = [];
        unparsedPersons.forEach(l => {
            parsedPersons.push(this.parsePerson(l));
        })
        return parsedPersons
    }
}