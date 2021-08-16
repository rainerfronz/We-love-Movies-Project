function notFound(request, response, next) {
    next({ status: 404, message: 'That page does not exist.' });
  }
  
  module.exports = notFound;
  