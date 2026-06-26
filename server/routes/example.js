const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({data:['dolphins', 'manatees', 'sea turtles']})
})


module.exports = router;