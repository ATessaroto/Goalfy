const usuarios = require('../models/AnnotationData');

module.exports = {
    async update(request,response){
        const { id } = request.params;
        const {nome_completo,email,telefone,CNPJ,endereco,cidade} = request.body;

        const annotation = await usuarios.findOne({_id:id});

        if (nome_completo, email, telefone, CNPJ,endereco,cidade){

            annotation.nome_completo = nome_completo;
            annotation.email = email;
            annotation.telefone = telefone;
            annotation.CNPJ = CNPJ;
            annotation.endereco = endereco;
            annotation.cidade = cidade;

            await annotation.save();
        } 

        return response.json({error: "Usuário atualizado com sucesso!"})

    }
}