"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const StatisticsController_1 = require("../controllers/StatisticsController");
const router = (0, express_1.Router)();
router.get('/', StatisticsController_1.StatisticsController.getStatistics);
router.put('/', StatisticsController_1.StatisticsController.updateStatistics);
exports.default = router;
//# sourceMappingURL=statistics.js.map