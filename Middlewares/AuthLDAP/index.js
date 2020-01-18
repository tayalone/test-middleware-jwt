const PREVENT_BUASRI = ['buasri1'];

const authLDAP = (req, res, next) => {
  try {
    const { employId } = req.body;
    console.log(`employId`, employId);
    //   const result = await axios.post(`motherfuckerBuasriId`, { buasriId, password });
    //   const { isEmploy } = result.data
    //   if (!isEmploy) {
    //             return res
    //     .status(401)
    //     .send({ message: 'Unauthorize From Mother Fucker LDAP SERVICE ' });
    //   }
    //   next();
    const isPreventBuisri = PREVENT_BUASRI.includes(employId);
    if (isPreventBuisri) {
      return res
        .status(401)
        .send({ message: 'Unauthorize From Mother Fucker LDAP SERVICE ' });
    } else {
      next();
    }
  } catch (e) {
    return res
      .status(401)
      .send({ message: 'Unauthorize From Mother Fucker LDAP SERVICE ' });
  }
};

module.exports = authLDAP;
