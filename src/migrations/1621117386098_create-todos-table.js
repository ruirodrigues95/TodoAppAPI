/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('todos', {
    id: 'id',
    title: { type: 'varchar(100)', notNull: true },
    user_id: { type: 'int', notNull: true },
    checked: { type: 'boolean', default: 'false'}
  })

  pgm.addConstraint('todos', 'fk_users', {
    foreignKeys: { columns: 'user_id', references: 'users(id)', onDelete: 'cascade' }
  })
};

exports.down = pgm => {
  pgm.dropTable('todos')
};
