import { cn, RenderableContent } from '@adam-sv/arc';
import CodeBlock from './codeblocks/CodeBlock';
import { IExampleData } from './types';

const Component = ({
  exampleData,
}: {
  exampleData: IExampleData;
}): React.JSX.Element => {
  const { codeBlocks, title, exampleClassName } = exampleData;
  const codeBlockElements = codeBlocks?.map((cb) => (
    <CodeBlock key={cb} fileName={cb} />
  ));

  const component =
    typeof exampleData.component === 'function'
      ? (exampleData.component as () => RenderableContent)()
      : exampleData.component;
  return (
    <div className={cn('Example', exampleClassName)}>
      <header className='example-header'>
        <h2>{title}</h2>
      </header>
      <div
        className={`content-${exampleData.renderVertically ? 'column' : 'row'}`}
      >
        <div className='component-container'>{component}</div>
        <div className='code-container'>{codeBlockElements}</div>
      </div>
    </div>
  );
};

export default Component;
