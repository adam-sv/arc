import { render, screen, waitFor } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { Tree } from '.';
import { ITreeNode } from '@adam-sv/arc';

const nodeContentClass = 'ArcTree-Node-content';
const expandedClass = 'ArcTree-Node-content-expanded';
const collapsedClass = 'ArcTree-Node-content-collapsed';
const pendingCollapseClass = 'ArcTree-Node-pendingCollapse';
const childColumnClass = 'ArcTree-Node-childColumn';

const nodes: ITreeNode<never, number>[] = [
  {
    id: 1,
    label: 'Node One',
  },
  {
    id: 2,
    label: 'Node Two',
    parentId: 1,
  },
  {
    id: 3,
    parentId: 2,
    label: 'Node Three',
  },
  {
    id: 4,
    parentId: 3,
    label: 'Node Four',
  },
  {
    id: 5,
    label: 'Node Five',
  },
  {
    id: 6,
    label: 'Node Six',
    parentId: 5,
  },
];

// helper to check icon, label, and column collapsing/expanding
const clickAndCheckHasClass = async (
  element: Element,
  className: string
): Promise<void> => {
  const nodeContent = document.getElementsByClassName(nodeContentClass)[0];

  await userEvent.click(element);

  expect(nodeContent).toHaveClass(className);
};

describe('Default Tree', () => {
  let container: HTMLElement;

  beforeEach(() => {
    const { container: renderedContainer } = render(<Tree nodes={nodes} />);
    container = renderedContainer;
  });
  /*
    Default Tree Structure
    v Node One         => expanded
      > Node Two       => visible
        > Node Three   => not rendered
          * Node Four  => not rendered
    v Node Five        => expanded
      * Node Six       => visible
  */
  it('has all top-level nodes expanded', async () => {
    const nodeOne = container.getElementsByClassName(nodeContentClass)[0];
    const nodeTwo = container.getElementsByClassName(nodeContentClass)[1];
    const nodeFive = container.getElementsByClassName(nodeContentClass)[2];
    const nodeSix = container.getElementsByClassName(nodeContentClass)[3];

    expect(nodeOne).toHaveTextContent('Node One');
    expect(nodeOne).toHaveClass(expandedClass);
    expect(nodeFive).toHaveTextContent('Node Five');
    expect(nodeFive).toHaveClass(expandedClass);

    expect(nodeTwo).toBeVisible();
    expect(nodeTwo).toHaveTextContent('Node Two');
    expect(nodeSix).toBeVisible();
    expect(nodeSix).toHaveTextContent('Node Six');
  });

  it('does not render child node unless parent node is expanded', async () => {
    const parent = container.getElementsByClassName(nodeContentClass)[1];

    expect(parent).toHaveClass(collapsedClass);
    expect(screen.queryByText('Node Three')).not.toBeInTheDocument();

    await userEvent.click(parent);

    const child = container.getElementsByClassName(nodeContentClass)[2];
    expect(child).toHaveTextContent('Node Three');
    expect(child).toBeVisible();
    expect(child).toHaveClass(collapsedClass);
    expect(screen.queryByText('Node Four')).not.toBeInTheDocument();

    await userEvent.click(child);

    expect(screen.getByText('Node Four')).toBeVisible();
  });

  describe('Expanding and collapsing nodes', () => {
    const clickableElements = [
      { type: 'label', className: 'ArcTree-Node-label' },
      { type: 'icon', className: 'ArcTree-Node-expansionIcon' },
    ];

    test.each(clickableElements)(
      'expands/collapses when user clicks $type',
      async ({ className }) => {
        const element = container.getElementsByClassName(className)[0];

        await clickAndCheckHasClass(element, collapsedClass);
        await clickAndCheckHasClass(element, expandedClass);
      }
    );

    it('collapses when user clicks column', async () => {
      const column = container.getElementsByClassName(childColumnClass)[0];

      await clickAndCheckHasClass(column, collapsedClass);
    });
  });

  describe('Hovering over column', () => {
    let user: UserEvent;
    let node: Element;
    let column: Element;

    beforeEach(() => {
      user = userEvent.setup();
      node = container.getElementsByClassName('ArcTree-Node')[0];
      column = container.getElementsByClassName(childColumnClass)[0];

      user.hover(column);
    });

    it('adds pendingCollapse to parent node', () => {
      waitFor(() => {
        expect(node).toHaveClass(pendingCollapseClass);
      });
    });

    it('removes pendingCollapse on mouseout', async () => {
      await user.unhover(column);
      expect(node).not.toHaveClass(pendingCollapseClass);
    });

    it('removes pendingCollapse on click/collapse', async () => {
      await user.click(column);
      expect(node).not.toHaveClass(pendingCollapseClass);
    });
  });
});

describe('Tree with initiallyExpandedDepth prop', () => {
  /*
    initiallyExpandedDepth = 0
    > Node One
    > Node Five
  */
  describe('when 0', () => {
    it('has all nodes collapsed', () => {
      const { container } = render(
        <Tree nodes={nodes} initiallyExpandedDepth={0} />
      );

      const nodeOne = container.getElementsByClassName(nodeContentClass)[0];
      const nodeFive = container.getElementsByClassName(nodeContentClass)[1];

      expect(nodeOne).toHaveClass(collapsedClass);
      expect(nodeFive).toHaveClass(collapsedClass);

      expect(screen.queryByText('Node Two')).not.toBeInTheDocument();
      expect(screen.queryByText('Node Six')).not.toBeInTheDocument();
    });
    /*
      initiallyExpandedDepth = 0, selectedNodeId = 5
      > Node One
      v Node Five
        * Node Six
    */
    describe('with selectedNodeId prop', () => {
      it('minimally expands node with selectedNodeId', () => {
        Element.prototype.scrollIntoView = jest.fn();

        const { container } = render(
          <Tree
            nodes={nodes}
            initiallyExpandedDepth={0}
            selectedNodeId={nodes[4].id}
          />
        );

        const nodeOne = container.getElementsByClassName(nodeContentClass)[0];
        const nodeFive = container.getElementsByClassName(nodeContentClass)[1];
        const nodeSix = container.getElementsByClassName(nodeContentClass)[2];

        expect(nodeOne).toHaveClass(collapsedClass);
        expect(nodeFive).toHaveClass(expandedClass);
        expect(nodeSix).toBeVisible();
      });
    });
  });
  /*
    initiallyExpandedDepth = 2
    v Node One
      v Node Two
        > Node Three
    v Node Five
      * Node Six
  */
  it('has nodes expanded up to specified depth', () => {
    const { container } = render(
      <Tree nodes={nodes} initiallyExpandedDepth={2} />
    );

    const nodeOne = container.getElementsByClassName(nodeContentClass)[0];
    const nodeTwo = container.getElementsByClassName(nodeContentClass)[1];
    const nodeThree = container.getElementsByClassName(nodeContentClass)[2];
    const nodeFive = container.getElementsByClassName(nodeContentClass)[3];
    const nodeSix = container.getElementsByClassName(nodeContentClass)[4];

    expect(nodeOne).toHaveTextContent('Node One');
    expect(nodeOne).toHaveClass(expandedClass);
    expect(nodeTwo).toHaveTextContent('Node Two');
    expect(nodeTwo).toHaveClass(expandedClass);
    expect(nodeFive).toHaveTextContent('Node Five');
    expect(nodeFive).toHaveClass(expandedClass);
    expect(nodeThree).toBeVisible();
    expect(nodeSix).toBeVisible();
  });
});
