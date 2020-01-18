const middleWare1 = async (req, res, next) => {
  try {
    req.middleWare1 = 'middleWare1';
    next();
  } catch (e) {
    return res.status(401).send({ message: 'Unauthorize' });
  }
};

module.exports = middleWare1;
