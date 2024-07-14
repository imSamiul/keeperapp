router.get('/tasks/today', auth, async (req, res) => {
  try {
    const todayTasks = await Task.find({
      owner: req.user._id,
      today: {
        $gte: new Date(new Date().setHours(0, 0, 0)),
        $lt: new Date(new Date().setHours(23, 59, 59)),
      },
    });
    res.status(201).send({ todayTasks });
  } catch (error) {
    res.status(500).send({ message: error.toString() });
  }
});