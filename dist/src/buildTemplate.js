"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cbor_1 = __importDefault(require("cbor"));
// Build a data request template from a witnet's node format data request
function buildTemplateFromRequest(request) {
    var dr = request.params.dro.data_request;
    return {
        name: 'Data request',
        description: 'description',
        radRequest: {
            notBefore: dr.time_lock,
            retrieve: dr.retrieve.map(function (stage) {
                return __assign(__assign({}, stage), { script: cbor_1.default.decodeFirstSync(stage.script.map(function (op) { return op.toString(16); }).join('')) });
            }),
            aggregate: createTemplateAggregateTally(dr.aggregate),
            tally: createTemplateAggregateTally(dr.tally)
        }
    };
}
exports.buildTemplateFromRequest = buildTemplateFromRequest;
// Build aggregation / tally script readable for a template
function createTemplateAggregateTally(script) {
    return {
        filters: script.filters.map(function (filter) {
            return filter.args.length ||
                (filter.args.length === 1 && filter.args[0] !== 128)
                ? __spreadArrays([
                    filter.op
                ], (filter.args.length
                    ? cbor_1.default.decodeFirstSync(filter.args.map(function (arg) { return arg.toString(16); }).join(''))
                    : [])) : filter.op;
        }),
        reducer: script.reducer
    };
}
