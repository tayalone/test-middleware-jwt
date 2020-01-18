const momentTZ = require('moment-timezone');
const jwt = require('jwt-simple');

/**
 * คืนค่า accessToken และ expiresIn
 * @public
 */
const jwtGenerator = (employId, role) => {
  const expiresIn = momentTZ().add(3, 'minutes');

  const playload = {
    exp: expiresIn.unix(),
    iat: momentTZ().unix(),
    sub: employId,
    role: role
  };
  const accessToken = jwt.encode(
    playload,
    `dal;kfgmp'aowetjk[2jk4t=oi=korg=34ogkewojg3oktjo]`
  );
  return { accessToken, expiresIn: expiresIn.unix() };
};

module.exports = jwtGenerator;
