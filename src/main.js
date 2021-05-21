"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs_1 = require("fs");
var jimp_1 = require("jimp");
var path_1 = require("path");
function getRandomItem(type, variant) {
    var res = fs_1["default"].readdirSync(path_1["default"].join(__dirname, "../assets/" + type));
    var source;
    if (Array.isArray(variant))
        variant = variant[Math.floor(Math.random() * variant.length)];
    if (variant != null && res[0].includes(".png")) {
        console.log("REE");
    }
    /* Determines if asset includes variants */
    if (!res[0].includes(".png")) {
        if (variant == null)
            variant = Number(res[Math.floor(Math.random() * res.length)]);
        res = fs_1["default"].readdirSync(path_1["default"].join(__dirname, "../assets/" + type + "/" + variant));
        source = path_1["default"].join(__dirname, "../assets/" + type + "/" + variant + "/" + res[Math.floor(Math.random() * res.length)]);
    }
    else {
        var item = res[Math.floor(Math.random() * res.length)];
        variant = Number(item.replace(".png", ""));
        source = path_1["default"].join(__dirname, "../assets/" + type + "/" + item);
    }
    return {
        path: source,
        type: type,
        variant: variant
    };
}
/*
    # Skin
    0 = Asian
    1 = White
    2 = Light skin
    3 = Black

    # Hair
    0 = Black
    1 = Blonde
    2 = Brown
    3 = Ginger
    4 = Gray

*/
function CharacterCompositor(data) {
    return __awaiter(this, void 0, void 0, function () {
        var skin, hair, shirt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, jimp_1["default"].read(data.skin.path)];
                case 1:
                    skin = _a.sent();
                    return [4 /*yield*/, jimp_1["default"].read(data.hair.path)];
                case 2:
                    hair = _a.sent();
                    return [4 /*yield*/, jimp_1["default"].read(data.shirt.path)];
                case 3:
                    shirt = _a.sent();
                    /* Programatically set the color of the shirt */
                    shirt.color([
                        { apply: 'hue', params: [(Math.random() * 360) - 360] },
                    ]);
                    skin.composite(shirt, 0, 0);
                    skin.composite(hair, 0, 0);
                    return [4 /*yield*/, skin];
                case 4: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function GenerateAvatar() {
    return __awaiter(this, void 0, void 0, function () {
        var skinData, hairVariant, hairData, shirtData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    skinData = getRandomItem("skin");
                    switch (skinData.variant) {
                        case 0:
                            hairVariant = [0, 1];
                            break;
                        case 2:
                            hairVariant = 0;
                            break;
                        case 3:
                            hairVariant = 0;
                            break;
                    }
                    hairData = getRandomItem("hair", hairVariant);
                    shirtData = getRandomItem("shirts");
                    return [4 /*yield*/, CharacterCompositor({
                            hair: hairData,
                            skin: skinData,
                            shirt: shirtData
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports["default"] = GenerateAvatar;
