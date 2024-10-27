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
  levelGap: number = 150,
  siblingGap: number = 200,
  nodeRadius: number = 40,
): void {
  ctx.beginPath();
  ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${tree.value}`, x, y);

  const childY = y + levelGap;
  let childX = x - ((tree.children.length - 1) * siblingGap) / 2;

  tree.children.forEach((child) => {
    ctx.beginPath();
    ctx.moveTo(x, y + nodeRadius);
    ctx.lineTo(childX, childY - nodeRadius);
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

  const dpi = window.devicePixelRatio || 1;
  canvasElement.width = window.innerWidth * dpi;
  canvasElement.height = window.innerHeight * dpi;
  canvasElement.style.width = `${window.innerWidth}px`;
  canvasElement.style.height = `${window.innerHeight * 0.9}px`;

  const ctx = canvasElement.getContext('2d');
  if (!ctx) {
    console.error('Canvas rendering context not found!');
    return;
  }

  ctx.scale(dpi, dpi);

  try {
    const treeData = await fetchTreeData();
    const tree = createTreeFromData<string>(treeData);
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    drawTree(ctx, tree, window.innerWidth / 2, 50);
  } catch (error) {
    console.error(`Error loadind tree: ${error}`);
  }
});
