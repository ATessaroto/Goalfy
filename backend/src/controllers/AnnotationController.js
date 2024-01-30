const usuarios = require('../models/AnnotationData') 

module.exports = {
    
    async read(request, response){
        const annotationList = await usuarios.find();

        return response.json(annotationList);
    },

    async create(request, response){
        const {nome_completo,email,telefone,CNPJ,endereco,cidade} = request.body;

        if(!nome_completo || !email || !telefone || !CNPJ || !endereco || !cidade){
            return response.status(400).json({error: "Necessário preencher todos os campos!"})
        }

        const annotationCreated = await usuarios.create({
            nome_completo,
            email,
            telefone,
            CNPJ,
            endereco,
            cidade
        });

        return response.json(annotationCreated);
    },

    async delete(request,response){
        const { id } = request.params;

        const annotationDeleted = await usuarios.findOneAndDelete({_id: id});

        if(annotationDeleted){
            return response.json({error: "Usuário deletado com sucesso!"})
        }

        return response.status(401).json({error: "Usuario não existente!"})
    }
    
}