export const verifiedAuth = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user is available for use here
    return next(); }
    else {res.send({status: 401, message:'unauthorized'})}
};
