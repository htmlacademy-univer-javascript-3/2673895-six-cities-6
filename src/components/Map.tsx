import { memo, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Offer } from '../types/offer';

type MapProps = {
  offers: Offer[];
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  activeOfferId?: string | null;
};

// Create custom icons for markers
const defaultIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

const activeIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

function MapComponent({ offers, city, activeOfferId }: MapProps) {
  const center = useMemo(() => [city.location.latitude, city.location.longitude] as [number, number], [city.location.latitude, city.location.longitude]);
  return (
    <MapContainer
      center={center}
      zoom={city.location.zoom}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {offers.map((offer) => (
        <Marker
          key={offer.id}
          position={[offer.location.latitude, offer.location.longitude]}
          icon={offer.id === activeOfferId ? activeIcon : defaultIcon}
        >
          <Popup>
            {offer.title}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export const Map = memo(MapComponent);
