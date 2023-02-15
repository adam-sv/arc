import type { IARCProps, ISegmentCanvasSegmentLayer } from '@adam-sv/arc';

export interface ICabinViewSegmentLayer extends ISegmentCanvasSegmentLayer {
  shouldApplyClipPath?: boolean;
}

export interface ICabinViewAircraftDimensions {
  interior: {
    noseOffset: number;
    width: number;
    length: number;
  };
  exterior: {
    width: number;
    length: number;
  };
}

export type CabinViewAircraftHardcodedType = 'A320' | 'A350' | 'A321';
export type CabinViewAircraftType = CabinViewAircraftHardcodedType | 'Custom';
export type CabinViewDirection = 'left' | 'up' | 'right' | 'down';

export interface ICabinViewProps extends IARCProps {
  layers: ICabinViewSegmentLayer[];
  suppressBackground?: boolean;
  aircraftType?: CabinViewAircraftType;
  aircraftDimensions?: ICabinViewAircraftDimensions;
  direction?: CabinViewDirection; // default is 'left'; // does not work at the moment
  minZoom?: number; // default: 0.5
  maxZoom?: number; // default: 10
}
