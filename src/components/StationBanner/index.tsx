// dependencies
import React, { useState, useMemo } from 'react';
// internals
import { cn } from '@adam-sv/arc';
// style
import './style.css';

interface IViewProps {
  className?: string;
  stations: number[];
  selectedIndex: number;
  onStationClick: (MouseEvent) => void;
}

export const StationBannerView = ({
  className = '',
  stations = [],
  selectedIndex,
  onStationClick,
}: IViewProps) => (
  <div className={cn('StationBanner', className)}>
    <div className="StationBanner-title">
      STATION {stations[selectedIndex]} Progress
    </div>
    {stations.map((station, index) => (
      <div
        key={station}
        className={cn(
          'StationBanner-station',
          selectedIndex === index && 'is-selected'
        )}
        onClick={onStationClick}
        data-index={index}
      >
        {station}
      </div>
    ))}
  </div>
);

export const StationBanner = ({
  stations = [],
  onStationSelected = (stationId: any) => undefined,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0); // first index by default

  const handleStationClick = useMemo(
    () => (event) => {
      const index = Number(event.target.dataset.index);
      setSelectedIndex(index);
      onStationSelected(stations[index]);
    },
    []
  );

  return (
    <StationBannerView
      stations={stations}
      selectedIndex={selectedIndex}
      onStationClick={handleStationClick}
    />
  );
};
