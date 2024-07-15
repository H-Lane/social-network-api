const router = require(`express`).Router();
const apiRoutes = require(`./api`);

router.use(`/api`, apiRoutes);

router.use((req, res) => res.send(`Request could not be completed.`));

module.exports = router;