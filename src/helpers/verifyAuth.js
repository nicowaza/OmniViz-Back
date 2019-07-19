const verifiedAuth = function (req, res, next) {
  // if (req.isAuthenticated()) {
  //   // req.user is available for use here
  //   return next(); }
  //   else {res.send({status: 401, message:'unauthorized'})}
    if (req.isAuthenticated()) {
      console.log('verifiedAuth :', req.isAuthenticated())
      // req.user is available for use here
      // res.send({status: 200, message: 'user identified', isAuthenticated: req.isAuthenticated()})
      return next();
    } else {
      console.log('not authenticated user :', req.isAuthenticated())
      res.send({status: 401, message:'unauthorized', isAuthenticated: req.isAuthenticated()})}
};

module.exports = verifiedAuth;