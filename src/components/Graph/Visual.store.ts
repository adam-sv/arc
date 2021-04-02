import type { IGraphProps, IGraphStores, IDescribedBox } from './types';

export class VisualStore {
  props: IGraphProps;
  stores: IGraphStores;
  nodes: Map<string, any>;

  constructor(){
    this.props = null;
    this.stores = null;
    this.nodes = new Map();
  }

  initialize(props: IGraphProps, stores: IGraphStores) {
    this.props = props;
    this.stores = stores;
  }

  update(nextProps: IGraphProps) {
    this.props = nextProps;
  }

  get gridSize() {
    let { gridSize } = this.props;
    if (!gridSize || gridSize < 1) {
      gridSize = 20;
    }
    return gridSize;
  }

  get margin(): IDescribedBox {
    const margin = this.props.margin || {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    };

    (margin as IDescribedBox).horizontalSize = margin.left + margin.right;
    (margin as IDescribedBox).verticalSize = margin.top + margin.bottom;

    return (margin as IDescribedBox);
  }

  get padding(): IDescribedBox {
    const padding = this.props.padding || {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    };

    (padding as IDescribedBox).horizontalSize = padding.left + padding.right;
    (padding as IDescribedBox).verticalSize = padding.top + padding.bottom;

    return (padding as IDescribedBox);
  }
}
