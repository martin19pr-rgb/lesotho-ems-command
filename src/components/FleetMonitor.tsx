import { motion } from 'framer-motion';
import { Ambulance, Heart, RotateCcw, Navigation } from 'lucide-react';
import { mockAmbulances } from '@/data/mockData';

const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
  standby: { color: 'text-muted-foreground', bg: 'bg-muted/50', label: 'Standby' },
  enroute: { color: 'text-primary', bg: 'bg-primary/10', label: 'En Route' },
  'at-scene': { color: 'text-warning', bg: 'bg-warning/10', label: 'At Scene' },
  returning: { color: 'text-success', bg: 'bg-success/10', label: 'Returning' },
};

const FleetMonitor = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.35 }}
    className="glass-panel p-4"
  >
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <Ambulance className="w-4 h-4 text-primary" />
        <h2 className="text-sm font-semibold text-foreground">Fleet Monitor</h2>
      </div>
      <div className="flex gap-2 text-[10px]">
        {Object.entries(
          mockAmbulances.reduce((acc, a) => { acc[a.status] = (acc[a.status] || 0) + 1; return acc; }, {} as Record<string, number>)
        ).map(([status, count]) => (
          <span key={status} className={`px-2 py-0.5 rounded-full ${statusConfig[status]?.bg} ${statusConfig[status]?.color}`}>
            {count} {statusConfig[status]?.label}
          </span>
        ))}
      </div>
    </div>

    <div className="space-y-2">
      {mockAmbulances.map((amb, i) => {
        const cfg = statusConfig[amb.status];
        return (
          <motion.div
            key={amb.id}
            initial={{ x: -15, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.35 + i * 0.04 }}
            className={`flex items-center justify-between p-2.5 rounded-lg border border-border ${cfg.bg}`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${cfg.color === 'text-primary' ? 'bg-primary' : cfg.color === 'text-warning' ? 'bg-warning' : cfg.color === 'text-success' ? 'bg-success' : 'bg-muted-foreground'} ${amb.status === 'enroute' ? 'animate-pulse-glow' : ''}`} />
              <div>
                <p className="text-xs font-medium text-foreground">{amb.callsign}</p>
                <p className="text-[10px] text-muted-foreground">{amb.crew.join(' · ')}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {amb.eta && (
                <span className="text-xs text-primary font-mono">{amb.eta} min</span>
              )}
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color} font-medium`}>
                {cfg.label}
              </span>
              <div className="flex gap-1">
                <button className="p-1 rounded hover:bg-muted/50 transition-colors" title="Heartbeat">
                  <Heart className="w-3 h-3 text-destructive" />
                </button>
                <button className="p-1 rounded hover:bg-muted/50 transition-colors" title="Reroute">
                  <Navigation className="w-3 h-3 text-muted-foreground" />
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  </motion.div>
);

export default FleetMonitor;
