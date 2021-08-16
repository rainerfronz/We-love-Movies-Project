const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//middleware action
async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({
    status: 404,
    message: `Movie with id ${movieId} not found.`,
  });
}
// read theaters w/promise
async function readTheaters(req, res, next) {
  const { movie } = res.locals;
  service
    .readTheaters(movie.movie_id)
    .then((data) => res.json({ data }))
    .catch(next);
}
//read/list reviews with promise
function readReviews(req, res, next) {
  const { movie } = res.locals;
  service
    .readReviews(movie.movie_id)
    .then((data) => res.json({ data }))
    .catch(next);
}
//list movies is_showing query params
async function list(req, res, next) {
  const isShowing = req.query.is_showing;
  service
    .list(isShowing)
    .then((data) => res.json({ data }))
    .catch(next);
}
//read/list movies
function read(req, res) {
  res.json({
    data: res.locals.movie,
  });
}

// //list moves all or if showing
// async function list(req, res, next) {
//   try { const data = await service.list();
//   const { is_showing } = req.params;
//   const byResult = is_showing ? (movie) => movie.is_showing == true : () =>
//   true;
//   res.json({data: data.filter(byResult) });
// } catch(error) {
//   next(error);
// }
// }

module.exports = {
  list,
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  readTheaters: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readTheaters),
  ],
  readReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readReviews),
  ],
};
