/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to require an authenticated user, or else redirect to login page
 *                 Looks for an Authorization header bearing a valid JWT token
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = async (req, res, proceed) => {
  try {
    await sails.helpers.jwt.verifyToken(req);
    return proceed();
  } catch (error) {
    return res.status(401).send({message: error.raw});
  }
};
