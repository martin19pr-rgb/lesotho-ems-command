export interface Incident {
  id: string;
  type: 'accident' | 'medical' | 'fire' | 'crime';
  location: string;
  coords: [number, number];
  severity: number;
  status: 'new' | 'dispatched' | 'enroute' | 'on-scene' | 'resolved';
  timestamp: Date;
  description: string;
  assignedUnit?: string;
  eta?: number;
  hasVideo: boolean;
}

export interface Ambulance {
  id: string;
  callsign: string;
  coords: [number, number];
  status: 'standby' | 'enroute' | 'at-scene' | 'returning';
  crew: string[];
  lastHeartbeat: Date;
  currentIncident?: string;
  eta?: number;
}

export interface Hospital {
  id: string;
  name: string;
  coords: [number, number];
  district: string;
  beds: { icu: { total: number; available: number }; emergency: { total: number; available: number }; general: { total: number; available: number } };
  incomingPatients: number;
}

export const mockIncidents: Incident[] = [
  { id: 'INC-001', type: 'accident', location: 'Kingsway Rd, Maseru', coords: [-29.3167, 27.4833], severity: 87, status: 'dispatched', timestamp: new Date(Date.now() - 180000), description: 'Multi-vehicle collision, 3 casualties reported', assignedUnit: 'AMB-04', eta: 6, hasVideo: true },
  { id: 'INC-002', type: 'medical', location: 'Ha Thetsane, Maseru', coords: [-29.3350, 27.4500], severity: 72, status: 'enroute', timestamp: new Date(Date.now() - 420000), description: 'Cardiac arrest, elderly patient', assignedUnit: 'AMB-01', eta: 3, hasVideo: true },
  { id: 'INC-003', type: 'accident', location: 'Main South Rd, Mafeteng', coords: [-29.8167, 27.2333], severity: 65, status: 'new', timestamp: new Date(Date.now() - 60000), description: 'Pedestrian struck by vehicle', hasVideo: false },
  { id: 'INC-004', type: 'fire', location: 'Industrial Area, Maputsoe', coords: [-28.8833, 27.9000], severity: 91, status: 'dispatched', timestamp: new Date(Date.now() - 300000), description: 'Factory fire with trapped workers', assignedUnit: 'AMB-07', eta: 8, hasVideo: true },
  { id: 'INC-005', type: 'medical', location: 'Leribe Town Center', coords: [-28.8667, 28.0500], severity: 45, status: 'enroute', timestamp: new Date(Date.now() - 900000), description: 'Allergic reaction, moderate', assignedUnit: 'AMB-09', eta: 11, hasVideo: false },
  { id: 'INC-006', type: 'accident', location: 'Mountain Road, Mokhotlong', coords: [-29.2833, 29.0667], severity: 78, status: 'new', timestamp: new Date(Date.now() - 120000), description: 'Bus rollover on mountain pass, multiple injuries', hasVideo: true },
];

export const mockAmbulances: Ambulance[] = [
  { id: 'AMB-01', callsign: 'Maseru-Alpha', coords: [-29.3250, 27.4600], status: 'enroute', crew: ['P. Mokhele', 'T. Ramohlanka'], lastHeartbeat: new Date(), currentIncident: 'INC-002', eta: 3 },
  { id: 'AMB-02', callsign: 'Maseru-Bravo', coords: [-29.3100, 27.4900], status: 'standby', crew: ['M. Letsie', 'R. Thabane'], lastHeartbeat: new Date() },
  { id: 'AMB-04', callsign: 'Maseru-Delta', coords: [-29.3200, 27.4750], status: 'enroute', crew: ['S. Moshoeshoe', 'K. Lerotholi'], lastHeartbeat: new Date(), currentIncident: 'INC-001', eta: 6 },
  { id: 'AMB-05', callsign: 'Berea-Alpha', coords: [-29.1500, 27.7500], status: 'standby', crew: ['J. Molefe', 'N. Phakisi'], lastHeartbeat: new Date() },
  { id: 'AMB-07', callsign: 'Leribe-Alpha', coords: [-28.9000, 27.9200], status: 'enroute', crew: ['L. Sekake', 'D. Masopha'], lastHeartbeat: new Date(), currentIncident: 'INC-004', eta: 8 },
  { id: 'AMB-09', callsign: 'Leribe-Charlie', coords: [-28.8800, 28.0300], status: 'enroute', crew: ['E. Ntsane', 'B. Molapo'], lastHeartbeat: new Date(), currentIncident: 'INC-005', eta: 11 },
  { id: 'AMB-11', callsign: 'Mohales-Alpha', coords: [-30.1500, 27.4700], status: 'at-scene', crew: ['A. Griffith', 'C. Mothibi'], lastHeartbeat: new Date(Date.now() - 60000) },
  { id: 'AMB-12', callsign: 'Qacha-Alpha', coords: [-30.1167, 28.6833], status: 'returning', crew: ['F. Peete', 'G. Bereng'], lastHeartbeat: new Date() },
];

export const mockHospitals: Hospital[] = [
  { id: 'H-01', name: 'Queen Mamohato Memorial', coords: [-29.3100, 27.5100], district: 'Maseru', beds: { icu: { total: 20, available: 3 }, emergency: { total: 40, available: 8 }, general: { total: 200, available: 45 } }, incomingPatients: 2 },
  { id: 'H-02', name: 'Motebang Hospital', coords: [-28.8700, 28.0500], district: 'Leribe', beds: { icu: { total: 8, available: 2 }, emergency: { total: 20, available: 5 }, general: { total: 100, available: 22 } }, incomingPatients: 1 },
  { id: 'H-03', name: 'Mafeteng Hospital', coords: [-29.8200, 27.2400], district: 'Mafeteng', beds: { icu: { total: 6, available: 1 }, emergency: { total: 15, available: 3 }, general: { total: 80, available: 18 } }, incomingPatients: 0 },
  { id: 'H-04', name: 'Mohale\'s Hoek Hospital', coords: [-30.1500, 27.4800], district: "Mohale's Hoek", beds: { icu: { total: 5, available: 2 }, emergency: { total: 12, available: 4 }, general: { total: 60, available: 15 } }, incomingPatients: 1 },
  { id: 'H-05', name: 'Mokhotlong Hospital', coords: [-29.2900, 29.0700], district: 'Mokhotlong', beds: { icu: { total: 4, available: 0 }, emergency: { total: 10, available: 2 }, general: { total: 50, available: 12 } }, incomingPatients: 0 },
  { id: 'H-06', name: 'Ntsekhe Hospital', coords: [-30.1200, 28.6900], district: "Qacha's Nek", beds: { icu: { total: 4, available: 1 }, emergency: { total: 10, available: 3 }, general: { total: 40, available: 10 } }, incomingPatients: 0 },
];

export const responseTimeData = [
  { hour: '00:00', urban: 4.2, rural: 10.5 },
  { hour: '02:00', urban: 3.8, rural: 9.8 },
  { hour: '04:00', urban: 3.5, rural: 9.2 },
  { hour: '06:00', urban: 4.8, rural: 11.2 },
  { hour: '08:00', urban: 5.5, rural: 12.8 },
  { hour: '10:00', urban: 5.1, rural: 11.5 },
  { hour: '12:00', urban: 4.9, rural: 11.0 },
  { hour: '14:00', urban: 5.3, rural: 12.2 },
  { hour: '16:00', urban: 5.8, rural: 13.0 },
  { hour: '18:00', urban: 5.2, rural: 12.5 },
  { hour: '20:00', urban: 4.5, rural: 11.0 },
  { hour: '22:00', urban: 4.0, rural: 10.2 },
];

export const demandForecast = [
  { hour: '00:00', predicted: 3, actual: 2 },
  { hour: '02:00', predicted: 2, actual: 1 },
  { hour: '04:00', predicted: 2, actual: 3 },
  { hour: '06:00', predicted: 5, actual: 4 },
  { hour: '08:00', predicted: 8, actual: 9 },
  { hour: '10:00', predicted: 7, actual: 7 },
  { hour: '12:00', predicted: 6, actual: null },
  { hour: '14:00', predicted: 8, actual: null },
  { hour: '16:00', predicted: 10, actual: null },
  { hour: '18:00', predicted: 9, actual: null },
  { hour: '20:00', predicted: 6, actual: null },
  { hour: '22:00', predicted: 4, actual: null },
];
