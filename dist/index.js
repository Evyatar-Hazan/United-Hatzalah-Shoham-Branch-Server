"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';
const server = app_1.default.listen(PORT, () => {
    console.log(`✅ Server is running on http://${HOST}:${PORT}`);
    console.log(`📝 API documentation available at http://${HOST}:${PORT}/api`);
    console.log(`🏥 Health check at http://${HOST}:${PORT}/api/health`);
});
// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});
process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});
exports.default = server;
//# sourceMappingURL=index.js.map