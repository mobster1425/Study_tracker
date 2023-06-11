
const attachCookie = ({ res, token }) => {
  const oneDay = 1000 * 60 * 60 * 24;

  /*
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
*/
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    // secure: process.env.NODE_ENV === 'production',
    // secure:false,
  });
};

module.exports= attachCookie;











/*

const attachCookie = ({ res, token }) => {
    const oneDay = 1000 * 60 * 60 * 24;
  
    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
     // secure: process.env.NODE_ENV === 'production',
    // secure:false,
    });
  };
  
  module.exports= attachCookie;

  */