import { storiesOf } from '@storybook/react';
import { Button } from '@adam-sv/arc';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { PositioningPixel } from '.';

storiesOf('General/PositioningPixel', module).add('Shows', () => {
  @observer
  class MyStatefulStory extends React.Component<any, any> {
    @observable $state = {
      showing: false,
    };

    render() {
      return (
        <div className="flex-column">
          <PositioningPixel>
            {this.$state.showing ? (
              <div
                style={{
                  position: 'absolute',
                  top: '50px',
                  background: 'orange',
                  opacity: 0.5,
                  padding: 10,
                  borderRadius: 4,
                }}
              >
                I AM ABSOLUTELY POSITIONED RELATIVE TO THE PARENT
              </div>
            ) : null}
          </PositioningPixel>
          <Button
            type="success"
            text={this.$state.showing ? 'Hide the Thing' : 'Show the Thing'}
            onClick={action(e => {
              this.$state.showing = !this.$state.showing;
            })}
          />
        </div>
      );
    }
  }

  return <MyStatefulStory />;
});
