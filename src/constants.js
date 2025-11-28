// constants.js

export const AI_SUGGESTIONS = [
  "BREAKING: Major Policy Shift Announced at Capitol",
  "LIVE: Historic Event Unfolding Downtown",
  "UPDATE: Global Markets Rally After Unexpected News",
  "EXCLUSIVE: Local Hero Saves Family from Fire",
  "WEATHER ALERT: Severe Storms Approaching Coast",
  "SPORTS: Championship Finals Date Confirmed",
  "TECH: Revolutionary AI Model Released Today",
  "COMMUNITY: City Council Votes on New Park Project",
  "QUOTE: 'Innovation is the ability to see change as an opportunity.'",
  "CYBER: Data Breach Affects Millions, Experts Warn"
];

export const FONTS = {
  'sans-serif': 'Inter, system-ui, sans-serif',
  'serif': 'Merriweather, Georgia, serif',
  'mono': 'JetBrains Mono, monospace',
  'slab': 'Rockwell, "Courier New", serif',
  'impact': 'Impact, Anton, sans-serif'
};

export const TEMPLATES = {
  breaking: {
    id: 'breaking',
    name: 'Breaking News',
    primaryColor: '#dc2626',
    secondaryColor: '#fca5a5',
    badges: ['BREAKING NEWS', 'LIVE'],
    defaultFont: 'sans-serif'
  },
  standard: {
    id: 'standard',
    name: 'Standard Broadcast',
    primaryColor: '#2563eb',
    secondaryColor: '#93c5fd',
    badges: ['EVENING REPORT', 'LIVE'],
    defaultFont: 'sans-serif'
  },
  finance: {
    id: 'finance',
    name: 'Market Watch',
    primaryColor: '#059669',
    secondaryColor: '#6ee7b7',
    badges: ['MARKET WATCH', 'NYC'],
    defaultFont: 'serif'
  },
  sports: {
    id: 'sports',
    name: 'Sports Center',
    primaryColor: '#ea580c',
    secondaryColor: '#fdba74',
    badges: ['HIGHLIGHTS', 'REPLAY'],
    defaultFont: 'impact'
  },
  weather: {
    id: 'weather',
    name: 'Weather Update',
    primaryColor: '#0ea5e9',
    secondaryColor: '#bae6fd',
    badges: ['FORECAST', 'NOW'],
    defaultFont: 'sans-serif'
  },
  tech: {
    id: 'tech',
    name: 'Tech/Cyber',
    primaryColor: '#7c3aed',
    secondaryColor: '#a78bfa',
    badges: ['SYSTEM UPDATE', 'V 2.0'],
    defaultFont: 'mono'
  },
  quote: {
    id: 'quote',
    name: 'Quote / Interview',
    primaryColor: '#db2777',
    secondaryColor: '#fbcfe8',
    badges: ['QUOTABLE', 'VOICE'],
    defaultFont: 'serif'
  }
};
