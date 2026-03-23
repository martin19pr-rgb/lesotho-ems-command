import { motion } from 'framer-motion';
import { Bot, Search, Sparkles } from 'lucide-react';
import { useState } from 'react';

const suggestions = [
  'Show all high-severity crashes near Maseru',
  'Find nearest hospital with ICU beds',
  'Auto-dispatch to INC-003',
  'Response time report for today',
];

const AITriageAssistant = () => {
  const [query, setQuery] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.25 }}
      className="glass-panel p-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <Bot className="w-4 h-4 text-primary" />
        <h2 className="text-sm font-semibold text-foreground">AI Triage Assistant</h2>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">Beta</span>
      </div>

      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Ask: 'Find nearest hospital with neurosurgery'"
          className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-muted/50 border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
        />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {suggestions.map(s => (
          <button
            key={s}
            onClick={() => setQuery(s)}
            className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
          >
            <Sparkles className="w-2.5 h-2.5" />
            {s}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default AITriageAssistant;
