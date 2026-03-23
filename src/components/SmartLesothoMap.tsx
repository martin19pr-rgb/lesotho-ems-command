import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from 'react-leaflet';
import L from 'leaflet';
import { motion } from 'framer-motion';
import { mockIncidents, mockAmbulances, mockHospitals } from '@/data/mockData';
import { Layers, AlertTriangle, Truck, Building2 } from 'lucide-react';
import { useState } from 'react';

const createIcon = (color: string, size: number = 13, ring: string = 'rgba(255,255,255,0.9)') =>
  L.divIcon({
    className: '',
    html: `<div style="width:${size}px;height:${size}px;background:${color};border-radius:50%;border:2.5px solid ${ring};box-shadow:0 2px 8px ${color}55, 0 0 0 4px ${color}18;"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });

const incidentIcon = createIcon('#dc2626', 15, 'rgba(255,255,255,0.95)');
const ambulanceIcon = createIcon('#64748b', 12, 'rgba(255,255,255,0.9)');
const hospitalIcon = createIcon('#16a34a', 14, 'rgba(255,255,255,0.95)');

const layerConfig = [
  { key: 'Incidents', icon: AlertTriangle, color: 'text-red-600', activeBg: 'bg-red-50 border-red-200 text-red-700' },
  { key: 'Ambulances', icon: Truck, color: 'text-slate-500', activeBg: 'bg-slate-100 border-slate-300 text-slate-700' },
  { key: 'Hospitals', icon: Building2, color: 'text-emerald-600', activeBg: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
] as const;

const MapContent = ({ activeLayers }: { activeLayers: Set<string> }) => {
  const routes = mockAmbulances
    .filter(a => a.currentIncident)
    .map(a => {
      const inc = mockIncidents.find(i => i.id === a.currentIncident);
      return inc ? { from: a.coords, to: inc.coords, id: a.id } : null;
    })
    .filter(Boolean) as { from: [number, number]; to: [number, number]; id: string }[];

  return (
    <>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      />

      {activeLayers.has('Incidents') &&
        mockIncidents.map(inc => (
          <Marker key={inc.id} position={inc.coords} icon={incidentIcon}>
            <Popup className="text-xs">
              <div>
                <p className="font-bold text-red-600">{inc.id}: {inc.type.toUpperCase()}</p>
                <p className="text-gray-600">{inc.location}</p>
                <p>Severity: <strong className="text-red-500">{inc.severity}/100</strong></p>
                <p>Status: <span className="capitalize">{inc.status}</span></p>
              </div>
            </Popup>
          </Marker>
        ))}

      {activeLayers.has('Ambulances') && (
        <>
          {mockAmbulances.map(amb => (
            <Marker key={amb.id} position={amb.coords} icon={ambulanceIcon}>
              <Popup>
                <div className="text-xs">
                  <p className="font-bold">{amb.callsign}</p>
                  <p>Status: {amb.status}</p>
                  <p>Crew: {amb.crew.join(', ')}</p>
                  {amb.eta && <p>ETA: <strong>{amb.eta} min</strong></p>}
                </div>
              </Popup>
            </Marker>
          ))}
          {routes.map(r => (
            <Polyline
              key={r.id}
              positions={[r.from, r.to]}
              pathOptions={{ color: '#dc2626', weight: 2.5, dashArray: '6 5', opacity: 0.65 }}
            />
          ))}
        </>
      )}

      {activeLayers.has('Hospitals') &&
        mockHospitals.map(h => (
          <Marker key={h.id} position={h.coords} icon={hospitalIcon}>
            <Popup>
              <div className="text-xs">
                <p className="font-bold text-emerald-700">{h.name}</p>
                <p>ICU: {h.beds.icu.available}/{h.beds.icu.total}</p>
                <p>Emergency: {h.beds.emergency.available}/{h.beds.emergency.total}</p>
                <p>General: {h.beds.general.available}/{h.beds.general.total}</p>
              </div>
            </Popup>
          </Marker>
        ))}
    </>
  );
};

const SmartLesothoMap = () => {
  const [activeLayers, setActiveLayers] = useState<Set<string>>(new Set(layerConfig.map(l => l.key)));

  const toggleLayer = (layer: string) => {
    setActiveLayers(prev => {
      const next = new Set(prev);
      next.has(layer) ? next.delete(layer) : next.add(layer);
      return next;
    });
  };

  const activeCount = activeLayers.size;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className="glass-panel-active overflow-hidden relative h-full"
    >
      <div className="absolute top-3 left-3 z-[1000] flex gap-1.5">
        {layerConfig.map(({ key, icon: Icon }) => {
          const active = activeLayers.has(key);
          return (
            <button
              key={key}
              onClick={() => toggleLayer(key)}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border font-medium shadow-sm transition-all ${
                active
                  ? key === 'Incidents'
                    ? 'bg-red-600 border-red-600 text-white shadow-red-200'
                    : key === 'Hospitals'
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-emerald-200'
                    : 'bg-slate-700 border-slate-700 text-white shadow-slate-200'
                  : 'bg-white/90 border-gray-200 text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-3 h-3" />
              {key}
            </button>
          );
        })}
      </div>

      <div className="absolute top-3 right-3 z-[1000] bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-200 shadow-sm flex items-center gap-2">
        <Layers className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-xs text-gray-500 font-medium">{activeCount} layer{activeCount !== 1 ? 's' : ''}</span>
      </div>

      <MapContainer
        center={[-29.5, 28.5]}
        zoom={8}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <MapContent activeLayers={activeLayers} />
      </MapContainer>
    </motion.div>
  );
};

export default SmartLesothoMap;
