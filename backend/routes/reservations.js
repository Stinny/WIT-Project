const router = require('express').Router();
const Reservation = require('../models/Reservation');

//route for getting reservations on a speciffic listing
router.get('/listing/:listingId', async (req, res) => {
  try {
    const reservations = Reservation.find({ listingId: req.params.listingId });
    res.status(200).json(reservations);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.get('/getuserres', async (req, res) => {
  //if (!req.user) return res.status(400).send('auth error');
  try {
    const reservations = await Reservation.find({ userId: req.user.userId });
    res.status(200).json(reservations);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.post('/create/:listingId', async (req, res) => {
  if (!req.user) return res.status(400).json({ error: 'Auth error' });

  const { numberOfGuests, startDate, endDate } = req.body;

  const reservation = new Reservation({
    listingId: req.params.listingId,
    userId: req.user.userId,
    numberOfGuests: numberOfGuests,
    startDate: startDate,
    endDate: endDate,
  });

  try {
    await reservation.save();
    res.status(200).send('Reservation created');
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

module.exports = router;
