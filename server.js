const express = require('express');
const bodyParser = require('body-parser');
const compress = require('compression');
const cors = require('cors');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const middleware1 = require('./Middlewares/middleware1');
const middleware2 = require('./Middlewares/middleware2');
const AuthLDAP = require('./Middlewares/AuthLDAP');
const jwtGenerator = require('./jwtGenerator');
const port = 8889;

// const compress = require('compression')

const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// gzip compression
app.use(compress());
// enable CORS - Cross Origin Resource Sharing
app.use(cors());

const jwtOption = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: `dal;kfgmp'aowetjk[2jk4t=oi=korg=34ogkewojg3oktjo]`
};
const jwt = async (payload, done) => {
  try {
    const { sub } = payload;

    done(null, sub);
  } catch (e) {
    done(null, false);
  }
};

// jwt = new JwtStrategy(jwtOption, jwt)

app.use(passport.initialize());
passport.use('jwt', new JwtStrategy(jwtOption, jwt));

const requireAuthJWT = passport.authenticate('jwt', { session: false });

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/testMiddleWare', middleware1, middleware2, (req, res) => {
  // req.middleWare1 = 'middleWare1';
  console.log(`req.middleWare1`, req.middleWare1);
  console.log(`req.middleware2`, req.middleWare2);
  const { middleWare1, middleWare2 } = req;

  return res.send({ middleWare1, middleWare2 });
});

app.post('/buasriLogin', AuthLDAP, (req, res) => {
  const { employId } = req.body;
  const accessToken = jwtGenerator(employId, 'employee');
  return res.send({ accessToken });
});

app.post('/authBuasri', requireAuthJWT, (req, res) => {
  return res.send({ message: 'Welcone Back' });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// const momentTZ = require('moment-timezone')
// const jwt = require('jwt-simple')
