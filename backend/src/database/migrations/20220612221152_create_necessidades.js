/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('necessidades', function (table) {
        table.increments();
  
        table.string('titulo').notNullable();
        table.string('descricao').notNullable();
        table.decimal('valor').notNullable();
  
        table.string('inst_id').notNullable();
  
        table.foreign('inst_id').references('id').inTable('instituicoes');
      });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
      return knex.schema.dropTable('necessidades');
  };
