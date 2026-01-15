"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DonationController_1 = require("../controllers/DonationController");
const router = (0, express_1.Router)();
router.post('/', DonationController_1.DonationController.createDonation);
router.get('/', DonationController_1.DonationController.getDonations);
router.get('/stats', DonationController_1.DonationController.getDonationStats);
exports.default = router;
//# sourceMappingURL=donations.js.map