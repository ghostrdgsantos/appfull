const crypto = require('crypto');
const connection = require('../database/connection');

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
  } 
};