const connection = require('../database/connection');

module.exports ={
    async create(request, response) {
        const { id } = request.body;

        const instituicoes = await connection('instituicoes')
          .where('id', id)
          .select('nome')
          .first();

        if (!instituicoes) {
            return response.status(400).json({ error: 'Nenhuma instituição encontrada com esse ID'});
        }

        return response.json(instituicoes);
    }
}