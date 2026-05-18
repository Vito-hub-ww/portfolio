export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  image: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'TaskFlow',
    description:
      'An offline-first task management app with swipe gestures, dark mode support, and local data persistence. Built with clean architecture and reusable component patterns.',
    tags: ['React Native', 'Redux', 'AsyncStorage'],
    githubUrl: '#',
    image: '/images/project-taskflow.jpg',
  },
  {
    id: 2,
    title: 'WeatherNow',
    description:
      'A location-based weather app delivering real-time conditions and a 5-day forecast with beautifully animated weather icons and pull-to-refresh.',
    tags: ['React Native', 'REST API', 'Geolocation'],
    githubUrl: '#',
    image: '/images/project-weathernow.jpg',
  },
  {
    id: 3,
    title: 'CryptoTracker',
    description:
      'A real-time cryptocurrency price tracker featuring interactive charts, portfolio tracking, and price alert notifications with a sleek dark UI.',
    tags: ['React Native', 'Charts API', 'Push Notifications'],
    githubUrl: '#',
    image: '/images/project-cryptotracker.jpg',
  },
  {
    id: 4,
    title: 'WeatherNow',
    description:
      'A weather companion app with hourly forecasts, severe weather alerts, and interactive radar maps. Features a beautiful dynamic background that changes based on current conditions.',
    tags: ['React Native', 'Maps API', 'Notifications'],
    githubUrl: '#',
    image: '/images/project-weathernow.jpg',
  },
  {
    id: 5,
    title: 'CryptoTracker',
    description:
      'An advanced crypto dashboard with multi-exchange price aggregation, custom watchlists, and detailed coin analytics with candlestick charts and market depth visualization.',
    tags: ['React Native', 'WebSocket', 'Charting'],
    githubUrl: '#',
    image: '/images/project-cryptotracker.jpg',
  },
];
