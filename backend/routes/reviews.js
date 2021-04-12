const router = require('express').Router();
const User = require('../models/User');
const Review = require('../models/Review');
const {
  reviewValidation,
  updateReviewValidation,
} = require('../validation/listingValidation');

//route for getting reviews on a speciffic listing
router.get('/:listingId', async (req, res) => {
  const listingId = req.params.listingId;
  const reviews = await Review.find({ listingId: listingId });

  res.json(reviews);
});

//route for deleting a review
//needs to be protected(only users who created the review)
router.delete('/deletereview', async (req, res) => {
  const { reviewId, listingId } = req.body;

  try {
    const review = await Review.deleteOne({
      _id: reviewId,
      listingId: listingId,
    });
    res.json('Review deleted.');
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

//route for creating a review
//needs to be protected(only auth users)
router.post('/create', async (req, res) => {
  const { error } = reviewValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { title, content, listingId } = req.body;

  const review = new Review({
    userId: 'lksjfnvjg7ke93kr973u85t',
    listingId: listingId,
    title: title,
    content: content,
  });

  try {
    const savedReview = await review.save();
    res.status(200).json(review);
  } catch (err) {
    res.status(400).json(review);
  }
});

//route for updating a review
router.post('/:reviewId/update', async (req, res) => {
  const { error } = updateReviewValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  //get reviewId from url
  const reviewId = req.params.reviewId;
  //get the updated review data from the request body
  const { title, content } = req.body;

  try {
    const updateReview = await Review.findByIdAndUpdate(reviewId, {
      title: title,
      content: content,
    });
    const updatedReview = await Review.findById(reviewId);
    res.json(updatedReview);
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
