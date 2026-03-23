import { motion } from 'framer-motion';
import { BarChart3, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { responseTimeData, demandForecast } from '@/data/mockData';

const tickStyle = { fontSize: 9, fill: 'hsl(220, 10%, 50%)' };
const tooltipStyle = {
  background: 'rgba(255,255,255,0.97)',
  border: '1px solid rgba(0,0,0,0.08)',
  borderRadius: '8px',
  fontSize: '11px',
  color: 'hsl(220,20%,12%)',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
};

const AnalyticsPanel = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.4 }}
    className="glass-panel p-4"
  >
    <div className="flex items-center gap-2 mb-4">
      <BarChart3 className="w-4 h-4 text-primary" />
      <h2 className="text-sm font-semibold text-foreground">Predictive Analytics</h2>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <TrendingUp className="w-3 h-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Response Time (Urban vs Rural)</span>
        </div>
        <div className="h-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={responseTimeData}>
              <defs>
                <linearGradient id="urbanGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(0, 72%, 46%)" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="hsl(0, 72%, 46%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="ruralGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(145, 55%, 38%)" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="hsl(145, 55%, 38%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="hour" tick={tickStyle} axisLine={false} tickLine={false} />
              <YAxis tick={tickStyle} axisLine={false} tickLine={false} width={25} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="urban" stroke="hsl(0, 72%, 46%)" fill="url(#urbanGrad)" strokeWidth={2} name="Urban" />
              <Area type="monotone" dataKey="rural" stroke="hsl(145, 55%, 38%)" fill="url(#ruralGrad)" strokeWidth={2} name="Rural" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-4 mt-1 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary" /> Urban target: &lt;5 min</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-accent" /> Rural target: &lt;12 min</span>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <BarChart3 className="w-3 h-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">24h Demand Forecast</span>
        </div>
        <div className="h-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={demandForecast}>
              <XAxis dataKey="hour" tick={tickStyle} axisLine={false} tickLine={false} />
              <YAxis tick={tickStyle} axisLine={false} tickLine={false} width={20} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="predicted" fill="hsl(0, 72%, 46%)" opacity={0.25} radius={[3, 3, 0, 0]} name="Predicted" />
              <Bar dataKey="actual" fill="hsl(145, 55%, 38%)" radius={[3, 3, 0, 0]} name="Actual" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </motion.div>
);

export default AnalyticsPanel;
