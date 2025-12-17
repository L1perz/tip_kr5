const express = require("express");
const path = require("path");
const timerRoutes = require("./routes/timerRoutes");
const logger = require("./middleware/logger");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);


app.use(express.static(path.join(__dirname, "public")));

app.use("/api/timers", timerRoutes);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
