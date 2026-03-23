import { motion } from 'framer-motion';
import { Shield, Bell, Wifi, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

const DashboardHeader = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass-panel px-6 py-3 flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
          <Shield className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-foreground">
            Lesotho EMS Command Centre
          </h1>
          <p className="text-xs text-muted-foreground">
            Kingdom of Lesotho · Ministry of Health
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span className="font-mono">
            {time.toLocaleTimeString('en-ZA', { hour12: false })}
          </span>
          <span className="text-xs">
            {time.toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' })}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Wifi className="w-4 h-4 text-success" />
          <span className="text-xs text-success font-medium">LIVE</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
        >
          <Bell className="w-5 h-5 text-foreground" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-[10px] font-bold flex items-center justify-center text-destructive-foreground">
            3
          </span>
        </motion.button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center text-xs font-bold text-primary">
            ND
          </div>
          <div className="text-xs">
            <p className="font-medium text-foreground">Nat. Director</p>
            <p className="text-muted-foreground">Full Access</p>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;
