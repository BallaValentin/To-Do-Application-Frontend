import { GenericTree } from "./tree";

async function fetchTreeData(): Promise<any> {
    const response = await fetch('treeData.json');
    if(!response.ok) {
        throw new Error('Failed to fetch tree data');
    } else {
        return response.json();
    }
}

function createTreeFromData<T>(data: any): GenericTree<T> {
    const tree = new GenericTree<T>(data.value);
    if (data.children && data.children.length > 0) {
        for (const childData in data.children) {
            const childTree = createTreeFromData<T>(childData);
            tree.addChild(childTree);
        }
    }
    return tree;
}

document.addEventListener('DOMContentLoaded', async () => {
    const canvasElement = document.getElementById('treeCanvas');
    if (!canvasElement) {
        console.error('Canvas element not found!');
    }

    try {
        const treeData = await fetchTreeData();
        const tree = createTreeFromData<string>(treeData);
    } catch (error) {
        console.error(`Error loadind tree: ${error}`)
    }
})