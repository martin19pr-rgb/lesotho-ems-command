import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Video, Clock, Send } from 'lucide-react';
import { mockIncidents } from '@/data/mockData';

const severityColor = (s: number) =>
  s >= 80 ? 'text-destructive' : s >= 50 ? 'text-warning' : 'text-success';

const severityBg = (s: number) =>
  s >= 80 ? 'bg-destructive/10 border-destructive/20' : s >= 50 ? 'bg-warning/10 border-warning/20' : 'bg-success/10 border-success/20';

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    new: 'bg-destructive/15 text-destructive font-semibold',
    dispatched: 'bg-slate-100 text-slate-600',
    enroute: 'bg-success/15 text-success',
    'on-scene': 'bg-warning/15 text-warning',
    resolved: 'bg-success/15 text-success',
  };
  return map[status] || '';
};

const IncidentQueue = () => {
  const sorted = [...mockIncidents].sort((a, b) => b.severity - a.severity);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.2 }}
      className="glass-panel p-4 h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-warning" />
          <h2 className="text-sm font-semibold text-foreground">Live Incident Queue</h2>
        </div>
        <span className="text-xs px-2 py-0.5 rounded-full bg-destructive/20 text-destructive font-medium">
          {sorted.length} active
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        <AnimatePresence>
          {sorted.map((inc, i) => (
            <motion.div
              key={inc.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`p-3 rounded-lg border ${severityBg(inc.severity)} cursor-pointer hover:border-primary/30 transition-colors`}
            >
              <div className="flex items-start justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className={`text-lg font-bold ${severityColor(inc.severity)} font-mono`}>
                    {inc.severity}
                  </span>
                  <div>
                    <p className="text-xs font-medium text-foreground">{inc.id}</p>
                    <p className="text-[10px] text-muted-foreground">{inc.type.toUpperCase()}</p>
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusBadge(inc.status)}`}>
                  {inc.status}
                </span>
              </div>

              <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{inc.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {inc.eta ? `${inc.eta} min` : 'Pending'}
                  </span>
                  {inc.hasVideo && (
                    <span className="flex items-center gap-1 text-primary">
                      <Video className="w-3 h-3" /> Video
                    </span>
                  )}
                </div>
                {inc.status === 'new' && (
                  <button className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-md bg-primary/20 text-primary hover:bg-primary/30 transition-colors">
                    <Send className="w-3 h-3" /> Dispatch
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default IncidentQueue;
