import { ITreeNode } from '@adam-sv/arc';

const treeNodes: ITreeNode<undefined>[] = [
  {
    id: 1,
    label: 'Node One',
    parentId: null,
  },
  {
    id: 2,
    label: 'Node Two',
    parentId: 1,
  },
  {
    id: 3,
    label: 'Node Three',
    parentId: 1,
    disabled: true,
  },
  {
    id: 4,
    label: 'Node Four',
    parentId: null,
  },
  {
    id: 5,
    label: 'Node Five',
    parentId: 4,
  },
  {
    id: 6,
    label: 'Node Six',
    parentId: 5,
  },
  {
    id: 7,
    label: 'Node Seven',
    parentId: 6,
  },
  {
    id: 8,
    label: 'Node Eight',
    parentId: 4,
  },
  {
    id: 9,
    label: 'Node Nine',
    parentId: 8,
  },
  {
    id: 10,
    label: 'Node Ten',
    parentId: 9,
  },
  {
    id: 11,
    label: 'Node Eleven',
    parentId: 10,
  },
  {
    id: 12,
    label: 'Node Twelve',
    parentId: 11,
  },
  {
    id: 13,
    label: 'Node Thirteen',
    parentId: 12,
  },
  {
    id: 14,
    label: 'Node Fourteen',
    parentId: 13,
  },
  {
    id: 15,
    label: 'Node Fifteen',
    parentId: 14,
  },
];

export default treeNodes;
