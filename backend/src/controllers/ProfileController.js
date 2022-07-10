const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const inst_id = request.headers.authorization;

    const necessidades = await connection('necessidades')
      .where('inst_id', inst_id)
      .select('*');

    return response.json(necessidades)  
  }
}