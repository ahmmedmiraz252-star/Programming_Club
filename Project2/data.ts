
import { Member, Event, Achievement, Resource, Activity } from './types';

export const CLUB_INFO = {
  name: 'Programming Club',
  logo: 'https://cdn-icons-png.flaticon.com/512/3242/3242257.png', 
  institute: 'Tech Institute of Excellence',
  slogan: 'Where Logic Meets Creativity.',
  heroTitle: 'Think. \nCode. \nTriumph.',
  heroSubtitle: 'Join a community of thousands, from beginners to ICPC finalists. We empower students to become world-class developers through collaborative learning and competitive rigor.',
  heroCode: `class ProgrammingClub {
  constructor() {
    this.name = "Programming Club";
    this.level = "EXPERT";
  }

  async solveLife() {
    while (true) {
      const problem = await World.getProblem();
      const solution = this.optimize(problem);
      await solution.deploy();
      this.impact++;
    }
  }
}

const coder = new ProgrammingClub();
coder.solveLife();`,
  mission: 'To cultivate a robust ecosystem for algorithmic excellence and software innovation within our institute.',
  vision: 'To empower students to become world-class developers through collaborative learning and competitive rigor.',
  history: 'Established in 2018, the Programming Club (PC) began as a small initiative to bridge the gap between academic theory and industry practice, now serving over 500 active student developers.',
  aboutImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop',
  address: 'Block C, Dept. of CSE, Tech Institute of Excellence, Innovation Road, City - 123456',
  email: 'contact@programmingclub.edu',
  socials: {
    github: 'https://github.com/programmingclub',
    linkedin: 'https://linkedin.com/company/programmingclub',
    discord: 'https://discord.gg/programmingclub'
  }
};

export const ACTIVITIES: Activity[] = [
  {
    id: '1',
    title: 'Competitive Programming',
    description: 'Weekly contests on platforms like Codeforces and VJudge, ranging from beginner Div. 3 to advanced ICPC-style rounds.',
    icon: 'Terminal'
  },
  {
    id: '2',
    title: 'Dev Workshops',
    description: 'Hands-on sessions on Full-stack development, DevOps, and Open Source contribution led by experienced seniors.',
    icon: 'Users'
  },
  {
    id: '3',
    title: 'Coding Bootcamps',
    description: 'Intensive weekend marathons for freshmen to master C++ and Python fundamentals in a collaborative environment.',
    icon: 'Zap'
  },
  {
    id: '4',
    title: 'Algorithm Design',
    description: 'In-depth problem-solving sessions focusing on advanced data structures, dynamic programming, and graph theory.',
    icon: 'Brain'
  }
];

export const MEMBERS: Member[] = [
  { id: '1', name: 'Dr. Sarah Mitchell', role: 'Faculty Advisor', category: 'Executive', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
  { id: '2', name: 'Alex Johnson', role: 'President', category: 'Executive', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', github: '#', linkedin: '#' },
  { id: '3', name: 'Elena Rodriguez', role: 'Vice President', category: 'Executive', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop', github: '#', linkedin: '#' },
  { id: '4', name: 'David Kim', role: 'Technical Lead', category: 'Core', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', github: '#', linkedin: '#' },
  { id: '5', name: 'Sophie Turner', role: 'Events Coordinator', category: 'Core', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop', linkedin: '#' },
  { id: '6', name: 'Michael Chen', role: 'CP Head', category: 'Core', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop', github: '#' },
  { id: '7', name: 'Arjun Verma', role: 'Full Stack Dev', category: 'Core', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop', github: '#' },
  { id: '8', name: 'Lila Thorne', role: 'UI/UX Designer', category: 'Core', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop', linkedin: '#' },
];

export const EVENTS: Event[] = [
  {
    id: '1',
    title: 'Code-a-thon 2024',
    date: 'March 15, 2024',
    description: 'Our annual 24-hour hackathon where students build products that solve real campus problems.',
    type: 'Upcoming',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=500&fit=crop',
    location: 'Central Lab Hall'
  },
  {
    id: '2',
    title: 'Data Structures Mastery',
    date: 'April 2, 2024',
    description: 'A deep-dive workshop into trees and graphs for technical interview preparation.',
    type: 'Upcoming',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=500&fit=crop',
    location: 'Seminar Room 1'
  },
  {
    id: '3',
    title: 'Fall Contest 2023',
    date: 'Oct 20, 2023',
    description: 'Intra-institute competitive programming contest with over 200 participants.',
    type: 'Past',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=500&fit=crop',
    location: 'Online'
  },
  {
    id: '4',
    title: 'Web Dev 101',
    date: 'Sep 12, 2023',
    description: 'Beginner-friendly session on HTML, CSS, and basic JavaScript reactivity.',
    type: 'Past',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop',
    location: 'Lab Room 302'
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: '1',
    title: 'ICPC Regional Finalists',
    result: 'Rank 12',
    date: '2023',
    description: 'Our flagship team "LogicLovers" secured 12th position at the ICPC Dhaka Regionals.',
    icon: 'Trophy'
  },
  {
    id: '2',
    title: 'Google Solution Challenge',
    result: 'Global Top 50',
    date: '2022',
    description: 'Built an AI-driven educational tool that was recognized globally by Google Developers.',
    icon: 'Award'
  },
  {
    id: '3',
    title: 'Inter-University Coding Cup',
    result: 'Champions',
    date: '2023',
    description: 'Won the first prize among 50 competing universities in the National Coding Cup.',
    icon: 'Trophy'
  }
];

export const RESOURCES: Resource[] = [
  { id: '1', category: 'Languages', title: 'C++ STL Reference', link: '#', description: 'Comprehensive guide to standard template library for CP.', language: 'C++' },
  { id: '2', category: 'Algorithms', title: 'DP Mastery', link: '#', description: 'Understanding overlapping subproblems and optimal substructure.' },
  { id: '3', category: 'Tutorials', title: 'Docker for Beginners', link: '#', description: 'Learn containerization basics in 30 minutes.' },
  { id: '4', category: 'Languages', title: 'Pythonic Code', link: '#', description: 'Writing efficient and clean Python for automation.', language: 'Python' },
  { id: '5', category: 'Platforms', title: 'Codeforces Training Kit', link: '#', description: 'A roadmap from Newbie to Specialist on Codeforces.' },
  { id: '6', category: 'DevOps', title: 'Git and GitHub Flow', link: '#', description: 'Collaborate effectively using feature branches and pull requests.' }
];

export const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1528901166007-3784c7dd3653?w=800&h=800&fit=crop',
];
