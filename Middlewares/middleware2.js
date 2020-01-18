const middleWare2 = async (req, res, next) => {
  try {
    req.middleWare2 = 'middleWare2';
    next();
  } catch (e) {
    return res.status(401).send({ message: 'Unauthorize' });
  }
};

module.exports = middleWare2;
