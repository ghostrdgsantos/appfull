const crypto = require('crypto');
const connection = require('../database/connection');
const NecessidadesController = require('./NecessidadesController');

module.exports = {
  async index (request, response) {
    const instituicoes = await connection('instituicoes').select('*');
      
    return response.json(instituicoes);
  },

  async create(request, response) {
    const { nome, email, whatsapp, cidade, uf} = request.body;
 
    const id = crypto.randomBytes(4).toString('HEX');

    await connection('instituicoes').insert({
      id,
      nome,
      email,
      whatsapp,
      cidade,
      uf,
    })

    return response.json({ id });  
  },

  async delete(request, response) {
    const { id } = request.params;
    

    const instituicoes = await connection('instituicoes')
       .where('id', id)
       .select('id')
       .first();

    if (instituicoes.id != id) {
      return response.status(401).json({ error: 'operação não permitida' });
    }
  
    await connection('instituicoes').where('id', id).delete();

    return response.status(204).send();
  },

  
  async put(request, response) {
    const { id } = request.params;
    const { nome, email, whatsapp, cidade, uf} = request.body;
 
    await connection('instituicoes').where('id', id).update({
      
      nome,
      email,
      whatsapp,
      cidade,
      uf,
    })

    return response.json({ id });  
  }
};