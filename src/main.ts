class GenericTree<T> {
  value: T;

  children: Array<GenericTree<T>>;

  constructor(value: T) {
    this.value = value;
    this.children = [];
  }

  addChild(childNode: GenericTree<T>): void {
    this.children.push(childNode);
  }
}

interface TreeData {
  value: string;
  children: TreeData[];
}

async function fetchTreeData(): Promise<TreeData> {
  const response = await fetch('treeData.json');
  if (!response.ok) {
    throw new Error('Failed to fetch tree data');
  } else {
    return response.json();
  }
}

function createTreeFromData<T>(data: TreeData): GenericTree<T> {
  const tree = new GenericTree<T>(data.value as unknown as T);
  if (data.children && data.children.length > 0) {
    data.children.forEach((childData) => {
      const childTree = createTreeFromData<T>(childData);
      tree.addChild(childTree);
    });
  }
  return tree;
}

function drawTree<T>(
  ctx: CanvasRenderingContext2D,
  tree: GenericTree<T>,
  x: number,
  y: number,
  levelGap: number = 50,
  siblingGap: number = 50,
): void {
  // eslint-disable-next-line prettier/prettier
    ctx.fillStyle = 'black';
  ctx.fillText(`${tree.value}`, x, y);

  const childY = y + levelGap;
  let childX = x - ((tree.children.length - 1) * siblingGap) / 2;

  tree.children.forEach((child) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(childX, childY);
    ctx.stroke();

    drawTree<T>(ctx, child, childX, childY, levelGap, siblingGap);
    childX += siblingGap;
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const canvasElement = document.getElementById('treeCanvas') as HTMLCanvasElement;
  if (!canvasElement) {
    console.error('Canvas element not found!');
    return;
  }

  const ctx = canvasElement.getContext('2d');
  if (!ctx) {
    console.error('Canvas rendering context not found!');
    return;
  }

  try {
    const treeData = await fetchTreeData();
    const tree = createTreeFromData<string>(treeData);
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    drawTree(ctx, tree, canvasElement.width / 2, 50);
  } catch (error) {
    console.error(`Error loadind tree: ${error}`);
  }
});
