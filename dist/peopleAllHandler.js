"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAllPeopleHandler = void 0;
// peopleAllHandler.ts
const serverless_http_1 = __importDefault(require("serverless-http"));
const express_1 = __importDefault(require("express"));
const peopleController_1 = require("./controllers/peopleController");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/all', peopleController_1.listAllPeople);
app.use((req, res) => {
    res.status(404).send('No Encontrado');
});
exports.listAllPeopleHandler = (0, serverless_http_1.default)(app);
