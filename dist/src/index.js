#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var colors_1 = __importDefault(require("colors"));
var buildTemplate_1 = require("./buildTemplate");
function main() {
    var entryPath = process.argv[2];
    var outputPath = process.argv[3];
    if (!(entryPath && outputPath)) {
        console.log(colors_1.default.red('You must provide an entry path and an output path'));
        return;
    }
    var raw = fs_1.default.readFileSync(entryPath);
    var dataRequest = JSON.parse(raw.toString());
    var template = buildTemplate_1.buildTemplateFromRequest(dataRequest);
    fs_1.default.writeFileSync(outputPath, JSON.stringify(template));
}
main();
