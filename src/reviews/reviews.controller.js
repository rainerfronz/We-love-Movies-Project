const service = require("./reviews.service");

async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.read(reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  return next({
    status: 404,
    message: `Review with id ${reviewId} cannot be found!`,
  });
}

async function destroy(req, res) {
  const { review } = res.locals;
  await service.delete(review.review_id);
  res.sendStatus(204);
}

async function update(req, res, next) {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  const data = await service.update(updatedReview);
  const critic = await service.readCritic(res.locals.review.review_id);
  const time = Date.now().toString();
  if (data >= 1) {
    res.json({
      data: {
        ...updatedReview,
        created_at: time,
        critic: critic,
        updated_at: time,
      },
    });
  } else {
    next({
      status: 400,
      message: "Update failed!",
    });
  }
}

module.exports = {
  update: [reviewExists, update],
  delete: [reviewExists, destroy],
};
