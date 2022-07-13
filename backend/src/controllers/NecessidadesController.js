const connection = require('../database/connection');

module.exports = {
  async index (request, response) {
    const { page = 1} = request.query;

    const [count] = await connection('necessidades').count();
    

    const necessidades = await connection('necessidades')
      .join('instituicoes', 'instituicoes.id', '=', 'necessidades.inst_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'necessidades.*', 
        'instituicoes.nome', 
        'instituicoes.email', 
        'instituicoes.whatsapp',
        'instituicoes.cidade', 
        'instituicoes.uf'
      ]);

    response.header('X-Total-Count', count['count(*)']); 
          
    return response.json(necessidades);
  },

  async create(request, response) {
    const { titulo, descricao, valor } = request.body;
    const inst_id = request.headers.authorization;
    
    const [id] = await connection('necessidades').insert({
      titulo,
      descricao,
      valor,
      inst_id,
    });

    return response.json({ id });
  },
  
  async delete(request, response) {
    const { id } = request.params;
    const inst_id = request.headers.authorization;

    const necessidades = await connection('necessidades')
       .where('id', id)
       .select('inst_id')
       .first();

    if (necessidades.inst_id != inst_id) {
      return response.status(401).json({ error: 'operação não permitida' });
    }
  
    await connection('necessidades').where('id', id).delete();

    return response.status(204).send();
  }

 

};