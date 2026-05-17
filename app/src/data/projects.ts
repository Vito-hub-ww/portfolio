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
    githubUrl: 'https://github.com',
    image: '/images/project-taskflow.jpg',
  },
  {
    id: 2,
    title: 'WeatherNow',
    description:
      'A location-based weather app delivering real-time conditions and a 5-day forecast with beautifully animated weather icons and pull-to-refresh.',
    tags: ['React Native', 'REST API', 'Geolocation'],
    githubUrl: 'https://github.com',
    image: '/images/project-weathernow.jpg',
  },
  {
    id: 3,
    title: 'CryptoTracker',
    description:
      'A real-time cryptocurrency price tracker featuring interactive charts, portfolio tracking, and price alert notifications with a sleek dark UI.',
    tags: ['React Native', 'Charts API', 'Push Notifications'],
    githubUrl: 'https://github.com',
    image: '/images/project-cryptotracker.jpg',
  },
];
