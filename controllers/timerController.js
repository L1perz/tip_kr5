let timers = [];
let idCounter = 1;

// GET /api/timers
exports.getAllTimers = (req, res) => {
  res.json(timers);
};

// GET /api/timers/:id
exports.getTimerById = (req, res) => {
  const id = Number(req.params.id);
  const format = req.query.format; 

  const timer = timers.find(t => t.id === id);
  if (!timer) {
    return res.status(404).json({ message: "Timer not found" });
  }

  const remainingMs = Math.max(0, timer.endTime - Date.now());

  if (format === "seconds") {
    return res.json({
      id: timer.id,
      remaining: Math.ceil(remainingMs / 1000) + " сек"
    });
  }

  res.json({
    id: timer.id,
    remainingMs
  });
};

// POST /api/timers
exports.createTimer = (req, res) => {
  const { seconds } = req.body;

  if (!seconds || seconds <= 0) {
    return res.status(400).json({ message: "Invalid seconds value" });
  }

  const timer = {
    id: idCounter++,
    startTime: Date.now(),
    endTime: Date.now() + seconds * 1000
  };

  timers.push(timer);
  res.status(201).json(timer);
};

// DELETE /api/timers/:id
exports.deleteTimer = (req, res) => {
  const id = Number(req.params.id);
  timers = timers.filter(t => t.id !== id);
  res.json({ message: "Timer deleted" });
};
