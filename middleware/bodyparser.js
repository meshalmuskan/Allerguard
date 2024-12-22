app.use(express.json()); // Parsed JSON data
app.use(express.urlencoded({ extended: true })); // Parsed URL-encoded data