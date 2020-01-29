"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var buildTemplate_1 = require("../src/buildTemplate");
var request_json_1 = __importDefault(require("./request.json"));
var template_json_1 = __importDefault(require("./template.json"));
test('lifeguard', function () {
    expect(true).toBe(true);
});
test('test', function () {
    expect(buildTemplate_1.buildTemplateFromRequest(request_json_1.default)).toStrictEqual(template_json_1.default);
});
