import { MIcon, Panel } from '@adam-sv/arc';
import './style.scss';

export const NewMatIcon = () => {
  return (
    <Panel style={{ minHeight: 40, minWidth: 400, gap: 20 }}>
      <span>
        Import{' '}
        <a href='https://fonts.google.com/icons'>
          Material Symbols Outlined icons
        </a>{' '}
        and variants in MatIcon style.scss file and render with{' '}
        <code>{`<MIcon />`}</code>
      </span>

      <div style={{ display: 'flex', gap: 10 }}>
        <MIcon name='bolt' />
        <code>{`<MIcon name='bolt'/>`}</code>
        <span>wght@400</span>
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <MIcon name='bolt' weight='light' />
        <code>{`<MIcon name='bolt' weight='light'/>`}</code>
        <span>wght@300</span>
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <MIcon name='bolt' weight='light' />
        <code>{`<MIcon name='bolt' weight='lighter'/>`}</code>
        <span>wght@200</span>
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <MIcon name='bolt' filled />
        <code>{`<MIcon name='bolt' filled/>`}</code>
        <span>FILL@1</span>
      </div>
    </Panel>
  );
};
