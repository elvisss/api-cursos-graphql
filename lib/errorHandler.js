'use strict';

const errorHandler = (error) => {
  console.log(error);
  throw new Error('Ocurrió un error, vuelve a intentarlo');
};

module.exports = errorHandler;
