"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericTree = void 0;
var GenericTree = /** @class */ (function () {
    function GenericTree(value) {
        this.value = value;
        this.children = [];
    }
    GenericTree.prototype.addChild = function (childNode) {
        this.children.push(childNode);
    };
    return GenericTree;
}());
exports.GenericTree = GenericTree;
