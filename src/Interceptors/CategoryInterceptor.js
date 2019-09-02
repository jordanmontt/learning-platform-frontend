export default class CategoryInterceptor {

    static parseOne(unparsedCategory) {
        return {
            idCategory: parseInt(unparsedCategory.idCategory),
            name: unparsedCategory.name,
            description: unparsedCategory.description,
        }
    }

    static parseMany(unparsedCategories) {
        let parsedCategories = [];
        unparsedCategories.forEach(c => {
            parsedCategories.push(this.parseOne(c));
        })
        return parsedCategories
    }
}