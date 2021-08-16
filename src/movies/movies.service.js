const knex = require("../db/connection");
// add critic function pass list for of loop to fill in values of review/critic

// review_id": 1,
//       "content": "Lorem markdownum ...",
//       "score": 3,
//       "created_at": "2021-02-23T20:48:13.315Z",
//       "updated_at": "2021-02-23T20:48:13.315Z",
//       "critic_id": 1,
//       "movie_id": 1,
//       "critic": {
//         "critic_id": 1,
//         "preferred_name": "Chana",
//         "surname": "Gibson",
//         "organization_name": "Film Frenzy",
//         "created_at": "2021-02-23T20:48:13.308Z",
//         "updated_at": "2021-02-23T20:48:13.308Z"
//       }
// callback function with a for of loop to get read critic/review for movie/:movieId/review
function addCritic(list) {
  const reviews = {};
  for (item of list) {
    reviews[item.review_id] = {
      review_id: item.review_id,
      content: item.content,
      score: item.score,
      created_at: item.created_at,
      updated_at: item.updated_at,
      critic_id: item.critic_id,
      movie_id: item.movie_id,
      critic: {
        critic_id: item.critic_id,
        preferred_name: item.preferred_name,
        surname: item.surname,
        organization_name: item.organization_name,
        created_at: item.created_at,
        updated_at: item.updated_at,
      },
    };
  }
  return Object.values(reviews);
}
// knex list movies is_showing join movies and movies_theaters
function list(query) {
  if (query === "true") {
    return knex("movies as m")
      .distinct()
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .select("m.*")
      .where({ "mt.is_showing": true });
  }
  return knex("movies").select("*");
}
//read moves get all movie info matching movie_id
function read(movieId) {
  return knex("movies as m").select("*").where({ movie_id: movieId }).first();
}
// movies/:movieId/theaters join movies, movies_theaters, theaters
function readTheaters(movieId) {
  return knex("movies as m")
    .select("*")
    .where({ "m.movie_id": movieId })
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*");
}
// movies/:movieId/reviews call addCritic fN join reviews critics
async function readReviews(movieId) {
  return (
    knex("reviews as r")
      // .join("movies as m", "m.movies_id", "r.movie_id")
      .select("*")
      .where({ "r.movie_id": movieId })
      .join("critics as c", "c.critic_id", "r.critic_id")
      .select("*")
      .then(addCritic)
  );
}

module.exports = {
  list,
  read,
  readTheaters,
  readReviews,
};
