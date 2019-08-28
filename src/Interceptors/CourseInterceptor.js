export default class CourseInterceptor {
    static parseOne(unparsedCourse) {
        return {
            idCourse: parseInt(unparsedCourse.idCourse),
            price: parseFloat(unparsedCourse.price),
            name: unparsedCourse.name,
            idCreator: parseInt(unparsedCourse.idCreator),
            idCategory: parseInt(unparsedCourse.idCategory),
            description: unparsedCourse.description
        }
    }

    static parseMany(unparsedCourses) {
        let parsedCourses = [];
        unparsedCourses.forEach(c => {
            parsedCourses.push(this.parseOne(c));
        })
        return parsedCourses
    }
}