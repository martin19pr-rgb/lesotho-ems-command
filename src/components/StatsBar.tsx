import { motion } from 'framer-motion';
import { AlertTriangle, Ambulance, Building2, Clock } from 'lucide-react';

const stats = [
  { label: 'Active Incidents', value: '6', icon: AlertTriangle, color: 'text-warning', bgColor: 'bg-warning/10', borderColor: 'border-warning/20' },
  { label: 'Ambulances Deployed', value: '4 / 8', icon: Ambulance, color: 'text-primary', bgColor: 'bg-primary/10', borderColor: 'border-primary/20' },
  { label: 'Avg Response Time', value: '4.8 min', icon: Clock, color: 'text-success', bgColor: 'bg-success/10', borderColor: 'border-success/20' },
  { label: 'Hospital Capacity', value: '78%', icon: Building2, color: 'text-info', bgColor: 'bg-info/10', borderColor: 'border-info/20' },
];

const StatsBar = () => (
  <div className="grid grid-cols-4 gap-4">
    {stats.map((stat, i) => (
      <motion.div
        key={stat.label}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: i * 0.1, type: 'spring', stiffness: 300, damping: 25 }}
        className={`glass-panel p-4 flex items-center gap-3 border ${stat.borderColor}`}
      >
        <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
          <stat.icon className={`w-5 h-5 ${stat.color}`} />
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          <p className="text-xs text-muted-foreground">{stat.label}</p>
        </div>
      </motion.div>
    ))}
  </div>
);

export default StatsBar;
