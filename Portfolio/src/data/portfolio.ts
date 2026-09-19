/* Page content, lifted from the Claude Design PortfolioPage source. */

export type Project = {
  slug: string
  title: string
  blurb: string
  tags: string[]
  repo: string | null
  stack: string[]
  notes: string[]
  pinned?: boolean
  tilt: number
}

/* tilt values are multiplied by the site-wide tilt amount at render time */
export const projects: Project[] = [
  {
    slug: 'dsa-library',
    pinned: true,
    tilt: -0.8,
    title: 'Jaylib: Interactive DSA Visualizer',
    blurb:
      'Work in progress — a C++ DSA library, with a Raylib visualizer being built on top.',
    tags: ['C++', 'Raylib', 'Work in progress'],
    repo: 'https://github.com/JMyoi/Jays_CPP_DSA_Library',
    stack: ['C++', 'Raylib', 'Git/GitHub'],
    notes: [
      'Work in progress, built in two stages. Right now the repo is the first stage: a data structures and algorithms library in C++, written to be reusable rather than one-off.',
      'The second stage is the visualizer. Raylib sits on top of the library so each structure and algorithm can be watched and driven directly — step through a traversal, insert into a tree, re-run a sort on your own input.',
      'Because the library and the rendering stay separate, a new structure only has to be written once to become interactive.',
    ],
  },
  {
    slug: 'budgetflow',
    pinned: true,
    tilt: -1.1,
    title: 'BudgetFlow',
    blurb:
      'Personal finance tracker that reads a receipt photo and files the expense for you.',
    tags: ['TypeScript', 'Next.js', 'PostgreSQL', 'OpenAI API'],
    repo: 'https://github.com/JMyoi/BudgetFlow',
    stack: [
      'TypeScript',
      'Next.js',
      'React',
      'Tailwind CSS',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Prisma',
      'OpenAI API',
      'Git/GitHub',
    ],
    notes: [
      'Expense onboarding runs through GPT-4o mini: it parses a transaction image straight into a structured expense entry, so there is no manual data entry step.',
      'The transactions dashboard has dynamic charts plus multi-field filtering and sorting by date, category and amount, so spending patterns surface across the whole history.',
      'Monthly budgeting does spend-vs-budget analysis, showing per-month over/under status and a category-level breakdown.',
    ],
  },
  {
    slug: 'battleship',
    pinned: true,
    tilt: 0.8,
    title: 'Battleship',
    blurb:
      'C++ Battleship with local PvP and three AI difficulties, drawn in Raylib.',
    tags: ['C++', 'Raylib'],
    repo: 'https://github.com/JMyoi/Battleship',
    stack: ['C++', 'Raylib', 'Git/GitHub'],
    notes: [
      'Core game logic (Game Controller, Player, Board, Ship) is kept separate from the Raylib GUI layer, so the rules can be tested without the window.',
      'The GUI covers ship placement with rotation, turn-based firing visualization, hit/miss rendering, winner screens and sound.',
      'Three AI modes live as distinct strategies inside one state machine: Easy fires at random, Medium hunts then targets with axis-locking, Hard has perfect knowledge.',
    ],
  },
  {
    slug: 'chitchat',
    tilt: -0.5,
    title: 'ChitChat',
    blurb: 'PERN social platform built with a team of four.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    repo: 'https://github.com/JMyoi/chitchat-capstone',
    stack: [
      'React',
      'JavaScript',
      'Tailwind CSS',
      'PostgreSQL',
      'Node.js',
      'Express.js',
      'Next.js',
      'Git/GitHub',
    ],
    notes: [
      'A responsive React and Tailwind front end over RESTful Node.js and Express.js endpoints.',
      'Data sits in PostgreSQL through Sequelize, with the relational schema shared across the team.',
      'Four of us coordinated the work on Git/GitHub; I worked across the front end and the API.',
    ],
  },
  {
    slug: 'library',
    tilt: 1.2,
    title: 'Library Management System',
    blurb:
      'Java GUI application that catalogs, circulates and tracks a library’s materials.',
    tags: ['Java', 'GUI'],
    repo: 'https://github.com/JMyoi/330LibraryManagementSystem_GUI_Version',
    stack: ['Java', 'GUI', 'Git/GitHub'],
    notes: [
      'A software application and platform designed to automate and streamline the tasks and processes involved in managing a library’s resources.',
      'Its primary purpose is to efficiently organize, catalog, circulate and track library materials while providing easy access to library users.',
      'Built for CSC 330 as the GUI version of the system.',
    ],
  },
  {
    slug: 'sorting-analysis',
    tilt: 0.6,
    title: 'Sorting algorithm analysis',
    blurb:
      'Analysis of sorting algorithms across datasets: running time and step counts.',
    tags: ['Algorithms', 'Analysis'],
    repo: 'https://github.com/JMyoi/Sorting_Algorithm_Analysis',
    stack: ['C++', 'Algorithms', 'Git/GitHub'],
    notes: [
      'Analysis of sorting algorithms to assess their running time and the number of steps required for sorting various datasets.',
    ],
  },
  {
    slug: 'p-vs-np',
    tilt: -1.4,
    title: 'P VS NP: implications to its solutions',
    blurb: 'A computer seminar talk on what solving P vs NP would mean.',
    tags: ['Theory', 'Talk'],
    repo: null,
    stack: ['Theory of computation', 'Presentation'],
    notes: [
      'A presentation for my computer seminar class talking about the implications of solving P vs NP.',
    ],
  },
]

export type TimelineItem = {
  period: string
  title: string
  org: string
  current?: boolean
}

export const timeline: TimelineItem[] = [
  {
    period: 'Feb 2026 — present',
    title: 'Computer Science Tutor',
    org: 'College of Staten Island',
    current: true,
  },
  {
    period: 'Jan 2026 — May 2027',
    title: 'M.S. Computer Science',
    org: 'College of Staten Island',
    current: true,
  },
  {
    period: 'Jun — Aug 2024',
    title: 'Data Science / Machine Learning Intern',
    org: 'MyLua Health',
  },
  {
    period: 'Jun — Aug 2023',
    title: 'Full Stack Web Development Student',
    org: 'Tech Talent Pipeline Residency, CSI',
  },
  {
    period: 'Aug 2021 — Dec 2025',
    title: 'B.S. Computer Science',
    org: 'College of Staten Island',
  },
]

export const skillGroups = [
  {
    group: 'Languages',
    items: ['C++', 'Python', 'JavaScript', 'TypeScript', 'HTML', 'CSS'],
  },
  {
    group: 'Frameworks & libraries',
    items: [
      'React.js',
      'Next.js',
      'Node.js',
      'Express.js',
      'Tailwind CSS',
      'Raylib',
      'Sequelize',
    ],
  },
  {
    group: 'Developer tools',
    items: [
      'Git/GitHub',
      'Postman',
      'PostgreSQL',
      'AWS Lambda',
      'Glide',
      'Zapier',
      'OpenAI API',
    ],
  },
]

export type Cert = {
  code: string
  title: string
  /* file placed in Portfolio/public/certs/, e.g. 'ai-110.png' — null shows an
     empty frame until the certificate image is dropped in */
  image: string | null
}

export const certs: Cert[] = [
  { code: 'AI 110', title: 'Foundations of AI Engineering', image: null },
  { code: 'AI 201', title: 'Advanced AI Engineering', image: null },
  { code: 'WEB 102', title: 'Intermediate Web Development', image: null },
  { code: 'TIP 102', title: 'Technical Interview Prep', image: null },
  {
    code: 'TIP 103',
    title: 'Technical Interview Prep · in progress',
    image: null,
  },
]

export const contact = {
  email: 'jaychenjjc@gmail.com',
  github: 'https://github.com/JMyoi',
  linkedin: 'https://www.linkedin.com/in/jaychen09/',
}

export const footerWords = [
  'loading…',
  'building…',
  'debugging…',
  'shipping…',
]

/* chip colouring matches the design's chip() helper */
export function chip(name: string, i: number) {
  return {
    name,
    color: ['yellow', 'mint', 'pink'][i % 3],
    tilt: [-1.5, 1, -0.5, 1.8][i % 4],
  }
}
