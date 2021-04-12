//returns true if requested user is owner of the listings
function userCanEdit(user, listing) {
  return listing.userId === user.userId;
}

module.exports = { userCanEdit };
