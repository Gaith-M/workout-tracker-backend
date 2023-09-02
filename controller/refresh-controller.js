const jwt = require("jsonwebtoken");

const refreshHandler = (req, res) => {
  const refreshToken = req.cookies["brogression-refreshToken"];

  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    const accessToken = jwt.sign({ firstName: user.firstName, lastName: user.lastName, id: user.id }, process.env.AUTH_TOKEN_SECRET, { expiresIn: "15m" });

    res.json({
      data: {
        accessToken,
      },
    });
  });
};

module.exports = refreshHandler