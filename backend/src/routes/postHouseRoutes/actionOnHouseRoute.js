// routes.js

router.post('/houses/:houseId/rating', houseController.rateHouse);
router.get('/:id', houseController.getHouseById);
router.post('/:id/record-view', houseController.recordView);
router.post('/:id/record-satisfaction', houseController.recordSatisfaction);
router.post('/:id/rate', houseController.rateHouse);
router.post('/:id/toggle-like', houseController.toggleLike);