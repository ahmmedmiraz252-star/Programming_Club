
export interface Member {
  id: string;
  name: string;
  role: string;
  roll?: string;
  category: 'Executive' | 'Core' | 'Volunteer';
  image: string;
  github?: string;
  linkedin?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  type: 'Upcoming' | 'Past';
  image: string;
  location: string;
}

export interface Achievement {
  id: string;
  title: string;
  result: string;
  date: string;
  description: string;
  icon: string;
}

export interface Resource {
  id: string;
  category: string;
  title: string;
  link: string;
  description: string;
  language?: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  icon: string;
}