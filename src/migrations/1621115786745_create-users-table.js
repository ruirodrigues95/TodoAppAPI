/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('users', {
    id: 'id',
    username: { type: 'varchar(100)', notNull: true },
    password: { type: 'varchar(255)', notNull: true }
  })
};

exports.down = pgm => {
  pgm.dropTable('users')
};
