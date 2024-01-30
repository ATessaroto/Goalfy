const usuarios = require('../models/AnnotationData');

module.exports = {
    async read(request, response){
        const annotationListAll = await usuarios.find().count();

        return response.json(annotationListAll);
    }
}