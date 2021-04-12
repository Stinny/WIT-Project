const router = require('express').Router();
const User = require('../models/User');
const Listing = require('../models/Listing');
const Review = require('../models/Review');
const { userCanEdit } = require('../permissions/listing');
const {
  listingValidation,
  updateListingValidation,
} = require('../validation/listingValidation');

const { reviewValidation } = require('../validation/reviewValidation');

//needed for uploading to S3 bucket
const AWS = require('aws-sdk');
const multer = require('multer');
const multers3 = require('multer-s3');

//config for s3 bucket
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

//function that uploads file to s3 bucket
const uploads3 = multer({
  storage: multers3({
    s3: s3,
    acl: 'public-read',
    bucket: 'kret-static',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + '-' + file.originalname);
    },
  }),
}).array('listingImage');

//route for getting all listings
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (err) {
    res.json({ error: err.message });
  }
});

//route for getting listings for one user
router.get('/userlistings', async (req, res) => {
  try {
    const listings = await Listing.find({ userId: req.user.userId });
    res.json(listings);
  } catch (err) {
    res.json({ error: err });
  }
});

//route for getting a speciffic listing
router.get('/:listingId', async (req, res) => {
  const listingId = req.params.listingId;

  const listing = await Listing.findOne({ _id: listingId });
  if (!listing) return res.status(400).json('No listing found');

  res.status(200).json(listing);
});

//route for creating a listing
//needs to be protected
router.post('/create', async (req, res) => {
  const { error } = listingValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  if (!req.user) return res.status(400).json({ error: 'Authentication error' });

  const {
    title,
    description,
    numberOfGuests,
    numberOfRooms,
    numberOfBeds,
    numberOfBaths,
    price,
    amenities,
  } = req.body;

  const listing = new Listing({
    title: title,
    description: description,
    numberOfGuests: numberOfGuests,
    numberOfRooms: numberOfRooms,
    numberOfBeds: numberOfBeds,
    numberOfBaths: numberOfBaths,
    price: price,
    userId: req.user.userId,
  });

  for (let i = 0; i < amenities.length; i++) {
    listing.amenities.push(amenities[i]);
  }

  try {
    await listing.save();
    res.json(listing);
  } catch (err) {
    res.json({ error: err });
  }
});

//route for adding images to a listing
//this route needs to be protected
router.post('/:listingId/uploadimages/', uploads3, async (req, res) => {
  //check if images were given or not
  if (!req.files) return res.status(400).json({ message: 'No images given!' });

  //listing to add images to
  const listing = await Listing.findById({ _id: req.params.listingId });

  //array of files(images) that were uploaded to S3
  let images = req.files;

  console.log(listing);

  //add image urls to listing
  for (let i = 0; i < images.length; i++) {
    listing.imgUrls.push(images[i].location);
  }
  await listing.save();

  res.status(200).json({ message: 'Uploaded successfully.' });
});

//route for updating a listing
//needs to be protected, only user who owns the listing can edit/delete
router.post('/:listingId/update', setListing, async (req, res) => {
  const { error } = updateListingValidation(req.listing);
  if (error) return res.status(400).json({ error: error.details[0].message });

  //get listingId from url
  const listingId = req.params.listingId;
  //get the updated listing data from the request body
  const {
    title,
    description,
    numberOfGuests,
    numberOfRooms,
    numberOfBeds,
    numberOfBaths,
    price,
  } = req.listing;

  try {
    const updateListing = await Listing.findByIdAndUpdate(listingId, {
      title: title,
      description: description,
      numberOfGuests: numberOfGuests,
      numberOfRooms: numberOfRooms,
      numberOfBeds: numberOfBeds,
      numberOfBaths: numberOfBaths,
      price: price,
    });
    const updatedListing = await Listing.findById(listingId);
    res.json(updatedListing);
  } catch (err) {
    res.json({ error: err });
  }
});

//route for creating reviews on a listing
router.post('/review/:listingId', async (req, res) => {
  const listingId = req.params.listingId;

  const { error } = reviewValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message }); //validates the request body data, returns error if one

  if (!req.user) return res.send('Must be logged in');

  const user = await User.findById(req.user.userId); //user info of user who is writing review
  const { title, content } = req.body; //data in request body for creation of Review

  const review = new Review({
    title: title,
    content: content,
    listingId: listingId,
    userId: req.user.userId,
    userName: user.userName,
  });

  try {
    await review.save();
    res.status(200).json({ success: 'review created' });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.get('/reviews/:listingId', async (req, res) => {
  const listingId = req.params.listingId;

  const reviews = await Review.find({ listingId: listingId });

  if (!reviews) return res.status(200).send('No reviews for this listing.');

  res.status(200).json({ reviews: reviews });
});

//middleware function for setting the req.listing
async function setListing(req, res, next) {
  const listingId = req.params.listingId;
  req.listing = await Listing.find({ _id: listingId });

  if (!req.listing) {
    res.status(404).json({ error: 'Listing not found' });
  }

  next();
}

function canEdit(req, res, next) {}

module.exports = router;
