export class GenericTree<T> {
    value: T;
    children: Array<GenericTree<T>>;

    constructor(value: T) {
        this.value = value;
        this.children = [];
    }

    addChild(childNode: GenericTree<T>): void{
        this.children.push(childNode);
    }
}