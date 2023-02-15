import { ApplicationBanner, AdamLogoWhite } from '@adam-sv/arc';
import { CSSProperties } from 'react';

export default (
  <div
    style={
      {
        '--ArcApplicationBanner-background-color': 'purple',
        '--ArcApplicationBanner-color': 'white',
      } as CSSProperties
    }
  >
    <ApplicationBanner logo={<AdamLogoWhite />} className='purple-example' />
  </div>
);
