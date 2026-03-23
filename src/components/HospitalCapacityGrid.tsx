import { motion } from 'framer-motion';
import { Building2, Users } from 'lucide-react';
import { mockHospitals } from '@/data/mockData';

const capacityColor = (available: number, total: number) => {
  const pct = (available / total) * 100;
  if (pct <= 10) return 'text-destructive';
  if (pct <= 30) return 'text-warning';
  return 'text-success';
};

const capacityBarColor = (available: number, total: number) => {
  const pct = (available / total) * 100;
  if (pct <= 10) return 'bg-destructive';
  if (pct <= 30) return 'bg-warning';
  return 'bg-success';
};

const BedBar = ({ label, available, total }: { label: string; available: number; total: number }) => {
  const pct = ((total - available) / total) * 100;
  const isCritical = available / total <= 0.1;

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px]">
        <span className="text-muted-foreground">{label}</span>
        <span className={capacityColor(available, total)}>
          {available}/{total}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full rounded-full ${capacityBarColor(available, total)} ${isCritical ? 'animate-pulse-glow' : ''}`}
        />
      </div>
    </div>
  );
};

const HospitalCapacityGrid = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.3 }}
    className="glass-panel p-4"
  >
    <div className="flex items-center gap-2 mb-3">
      <Building2 className="w-4 h-4 text-success" />
      <h2 className="text-sm font-semibold text-foreground">Hospital Capacity</h2>
    </div>

    <div className="grid grid-cols-2 gap-3">
      {mockHospitals.map((h, i) => {
        const totalBeds = h.beds.icu.total + h.beds.emergency.total + h.beds.general.total;
        const availBeds = h.beds.icu.available + h.beds.emergency.available + h.beds.general.available;
        const occupancy = Math.round(((totalBeds - availBeds) / totalBeds) * 100);

        return (
          <motion.div
            key={h.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            className={`p-3 rounded-lg border ${
              occupancy >= 90 ? 'border-destructive/30 glow-danger' : 'border-border'
            } bg-muted/30`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs font-medium text-foreground line-clamp-1">{h.name}</p>
                <p className="text-[10px] text-muted-foreground">{h.district}</p>
              </div>
              <span className={`text-lg font-bold font-mono ${
                occupancy >= 90 ? 'text-destructive' : occupancy >= 70 ? 'text-warning' : 'text-success'
              }`}>
                {occupancy}%
              </span>
            </div>

            <div className="space-y-1.5">
              <BedBar label="ICU" available={h.beds.icu.available} total={h.beds.icu.total} />
              <BedBar label="Emergency" available={h.beds.emergency.available} total={h.beds.emergency.total} />
              <BedBar label="General" available={h.beds.general.available} total={h.beds.general.total} />
            </div>

            {h.incomingPatients > 0 && (
              <div className="mt-2 flex items-center gap-1 text-[10px] text-warning">
                <Users className="w-3 h-3" />
                {h.incomingPatients} incoming
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  </motion.div>
);

export default HospitalCapacityGrid;
