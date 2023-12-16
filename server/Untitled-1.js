app.get('/userinfo', (req, res) => {
  try {
    // Get the token from the Authorization header
    const token = req.headers.authorization.split(' ')[1];

    // Check if the token is provided
    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }

    // Verify the token
    const decoded = jwt.verify(token,JWT_SECRET );

    // Access the user information from the decoded token
    const user = decoded.user;

    res.status(200).json({ user });
  } catch (error) {
    // Handle different JWT errors
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token' });
    } else if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token expired' });
    } else {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
});