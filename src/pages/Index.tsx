import DashboardHeader from '@/components/DashboardHeader';
import StatsBar from '@/components/StatsBar';
import SmartLesothoMap from '@/components/SmartLesothoMap';
import IncidentQueue from '@/components/IncidentQueue';
import HospitalCapacityGrid from '@/components/HospitalCapacityGrid';
import FleetMonitor from '@/components/FleetMonitor';
import AnalyticsPanel from '@/components/AnalyticsPanel';
import AITriageAssistant from '@/components/AITriageAssistant';

const Index = () => (
  <div className="gradient-bg min-h-screen p-4 space-y-4">
    <DashboardHeader />
    <StatsBar />

    <div className="grid grid-cols-12 gap-4" style={{ height: 'calc(100vh - 220px)' }}>
      {/* Main map area */}
      <div className="col-span-8 flex flex-col gap-4">
        <div className="flex-1 min-h-0">
          <SmartLesothoMap />
        </div>
        <AITriageAssistant />
      </div>

      {/* Right sidebar */}
      <div className="col-span-4 flex flex-col gap-4 overflow-y-auto">
        <IncidentQueue />
        <FleetMonitor />
      </div>
    </div>

    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-8">
        <AnalyticsPanel />
      </div>
      <div className="col-span-4">
        <HospitalCapacityGrid />
      </div>
    </div>
  </div>
);

export default Index;
