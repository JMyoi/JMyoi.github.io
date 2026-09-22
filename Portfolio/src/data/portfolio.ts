/* Page content, lifted from the Claude Design PortfolioPage source. */

import ai110Cert from '../assets/AI110.jpeg'
import ai201Cert from '../assets/AI201.png'
import web102Cert from '../assets/WEB102.png'
import tip102Cert from '../assets/tip102.png'
import battleshipShot from '../assets/battleship.png'
import jaylibCoding from '../assets/PengyCoding.gif'
import chitchatShot from '../assets/ChitchatDemo.png'
import sortingAlgos from '../assets/sortingAlgos.gif'
import librarianView1 from '../assets/librarianview1.png'
import librarianView2 from '../assets/librarianview2.png'
import librarianView3 from '../assets/librarianview3.png'
import memberView1 from '../assets/memberview1.png'
import memberView2 from '../assets/memberview2.png'
import memberView3 from '../assets/memberview3.png'

/* a note is plain text, or an optional bold label with text and/or sub-notes */
export type Note =
  | string
  | { label?: string; text?: string; items?: Note[] }

export type Project = {
  slug: string
  title: string
  blurb: string
  /* longer intro for the project page; falls back to blurb */
  description?: string
  tags: string[]
  repo: string | null
  /* files in Portfolio/public/docs/, shown as buttons beside View source */
  documents?: { label: string; file: string }[]
  stack: string[]
  /* heading over the notes list; defaults to "How it works" */
  notesHeading?: string
  notes: Note[]
  /* further headed lists shown after the notes, e.g. Features then How it works */
  moreNotes?: { heading: string; notes: Note[] }[]
  /* screenshot shown on the project page, imported from src/assets */
  image?: { src: string; alt: string }
  /* demo video embed URL (e.g. Loom's /embed/ link) shown on the project page */
  video?: { src: string; title: string }
  /* extra sections of screenshots shown after "How it works" */
  gallery?: {
    heading: string
    description: string
    images: { src: string; alt: string; caption: string }[]
  }[]
  pinned?: boolean
  tilt: number
}

/* tilt values are multiplied by the site-wide tilt amount at render time */
export const projects: Project[] = [
  {
    slug: 'budgetflow',
    pinned: true,
    tilt: -1.1,
    title: 'BudgetFlow',
    blurb:
      'Expense tracker with AI receipt scanning, spending charts, and monthly budget tracking.',
    description:
      'A personal expense tracker that does the data entry for you. Snap a photo of a receipt or bank statement and it pulls out every purchase automatically, sorts it into a category, and shows you where your money is actually going each month.',
    tags: ['TypeScript', 'Next.js', 'PostgreSQL', 'OpenAI API'],
    repo: 'https://github.com/JMyoi/BudgetFlow',
    video: {
      src: 'https://www.loom.com/embed/4a2870ca3ea74b238e39327df3fa84c3',
      title: 'BudgetFlow demo',
    },
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
      {
        label: 'Scan instead of type',
        text: 'Upload a receipt, bank statement, or screenshot and BudgetFlow reads every transaction off it, including the amount, date, and store, then files each one under the right category.',
      },
      {
        label: 'See your spending',
        text: 'Charts break down where your money goes by category, how your spending moves month to month, and how you’re tracking against your budget.',
      },
      {
        label: 'Monthly budgets with a verdict',
        text: 'Set a limit for the month and get a clear score — from “outstanding” to “over budget” — instead of just a number.',
      },
      {
        label: 'Full control of your history',
        text: 'Search, filter by month, sort, and edit or delete any expense.',
      },
      {
        label: 'Built with',
        text: 'Next.js, Express, PostgreSQL, and TypeScript, with AI-powered image reading on the backend.',
      },
    ],
  },
  {
    slug: 'battleship',
    pinned: true,
    tilt: 0.8,
    title: 'Battleship',
    blurb:
      'A graphical Battleship game in C++ and Raylib with local multiplayer and a bot opponent at three difficulty levels, including a Hunt/Target algorithm. It uses object-oriented classes and a state machine to control the game flow, with animations and sound.',
    description:
      'A graphical version of the classic Battleship game, written from scratch in C++ with the Raylib graphics library. You can play a friend on the same computer or play against a computer opponent at one of three difficulty levels. The game has interactive ship placement, hit and miss animations, and sound effects. It started as a command-line game and was later rebuilt with a full graphical interface.',
    tags: ['C++', 'Raylib'],
    repo: 'https://github.com/JMyoi/Battleship',
    stack: ['C++', 'Raylib', 'Make', 'Git/GitHub'],
    image: {
      src: battleshipShot,
      alt: "Battleship mid-game: Player 1's board and target board, with hits, misses and sunk ships",
    },
    notesHeading: 'Features',
    notes: [
      {
        label: 'Two game modes',
        text: 'Local 1v1 on one device, or single-player against the computer.',
      },
      {
        label: 'Three bot difficulty levels',
        items: [
          'Easy fires at random squares.',
          'Medium uses a Hunt/Target algorithm. It fires at random until it hits a ship. Then it checks the squares around the hit to find which way the ship runs, follows that line until the ship sinks, and turns around if it passes the end of the ship.',
          'Hard always knows where your ships are.',
        ],
      },
      {
        label: 'Interactive ship placement',
        text: 'Click a ship to select it, press R to rotate it, and place it on the grid. Placements that go off the board or overlap another ship are rejected.',
      },
      {
        label: 'Custom fleet size',
        text: 'Choose 1 to 5 ships before each match.',
      },
      {
        label: 'Game feel',
        text: 'Explosion and splash animations, sound effects on hits and sinks, and a background music track.',
      },
    ],
    moreNotes: [
      {
        heading: 'How it works',
        notes: [
          {
            label: 'Object-oriented design',
            text: 'The code is split into four classes:',
            items: [
              'Game runs the match and the bot.',
              'Player holds each player’s board and ships.',
              'Board stores the 10×10 grid, checks ship placement and records shots.',
              'Ship tracks each ship’s size, position, hits and whether it has sunk.',
            ],
          },
          {
            label: 'State machine',
            text: 'A GameState enum moves the game through its stages: menu, setup, turns, screen hand-off between players, and game over. In bot mode the second player’s screens are skipped, so you stay on your own view the whole game.',
          },
          {
            label: 'Bot built on existing code',
            text: 'The bot controls an ordinary Player object. Adding it didn’t require any changes to Player or Board. It places its fleet at random, picking new spots whenever a placement collides or goes off the board, and it keeps a record of past shots so it never fires at the same square twice.',
          },
          'Builds on Windows, macOS and Linux with a Makefile.',
          {
            label: 'Tech',
            text: 'C++, Raylib, Make, object-oriented programming, game state machines',
          },
        ],
      },
    ],
  },
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
    image: {
      src: jaylibCoding,
      alt: 'Animated penguin coding at a computer — Jaylib is still being built',
    },
    notes: [
      'Work in progress, built in two stages. Right now the repo is the first stage: a data structures and algorithms library in C++, written to be reusable rather than one-off.',
      'The second stage is the visualizer. Raylib sits on top of the library so each structure and algorithm can be watched and driven directly — step through a traversal, insert into a tree, re-run a sort on your own input.',
      'Because the library and the rendering stay separate, a new structure only has to be written once to become interactive.',
    ],
  },
  {
    slug: 'chitchat',
    tilt: -0.5,
    title: 'ChitChat',
    blurb: 'PERN social platform built with a team of four.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    repo: 'https://github.com/JMyoi/chitchat-capstone',
    image: {
      src: chitchatShot,
      alt: 'ChitChat community page for a Cars chatroom, with the chatroom sidebar and a feed of member posts',
    },
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
    gallery: [
      {
        heading: 'Librarian view',
        description:
          'Librarians sign in to a dashboard with three areas: Users, Books and Transactions. From Books they add new titles to the catalog by title, author, number of copies and ISBN, with the full collection listed underneath. Transactions lists every book currently checked out, alongside the borrower’s name and member ID.',
        images: [
          {
            src: librarianView1,
            alt: 'Librarian dashboard welcoming the librarian by name and ID, with Users, Books, Transactions and Logout buttons',
            caption: 'Dashboard',
          },
          {
            src: librarianView2,
            alt: 'Add a book form with title, author, copies and ISBN fields above a table of the library catalog',
            caption: 'Adding a book',
          },
          {
            src: librarianView3,
            alt: 'Transactions table listing each borrower’s name, the book title, its ISBN and the member ID',
            caption: 'All transactions',
          },
        ],
      },
      {
        heading: 'Member view',
        description:
          'Members sign in to browse the catalog and manage their own loans. Browse Books lists every title with its available copies; selecting one and pressing Get Book checks it out and drops the copy count. My Transactions shows the books a member currently has out, and they return them from there.',
        images: [
          {
            src: memberView1,
            alt: 'Member dashboard welcoming the member by name and ID, with Browse Books, My Books and Log Out buttons',
            caption: 'Dashboard',
          },
          {
            src: memberView2,
            alt: 'Catalog table with The Great Gatsby selected and a Successfully Added message after pressing Get Book',
            caption: 'Checking out a book',
          },
          {
            src: memberView3,
            alt: 'My Transactions table listing the member’s three borrowed books, with a Return button',
            caption: 'My transactions',
          },
        ],
      },
    ],
  },
  {
    slug: 'sorting-analysis',
    tilt: 0.6,
    title: 'Sorting Algorithm Analysis',
    blurb:
      'A benchmarking tool that measures how eight sorting algorithms perform in practice.',
    description:
      'A benchmarking tool that measures how eight sorting algorithms perform in practice. It records both CPU time and an exact count of the operations each one runs, on sorted, reverse-sorted and random inputs from 100 to 50,000 elements.',
    tags: ['C++', 'Algorithms', 'Analysis'],
    repo: 'https://github.com/JMyoi/Sorting_Algorithm_Analysis',
    image: {
      src: sortingAlgos,
      alt: 'Animated grid of eight sorting algorithms, from insertion sort to quicksort, running on random, nearly sorted, reversed and few-unique data',
    },
    stack: ['C++', 'Algorithms', 'Git/GitHub'],
    notesHeading: 'Details',
    notes: [
      {
        label: 'What it is',
        text: 'A C++ project comparing what theory predicts about sorting speed with how the algorithms actually behave. Built with Jiahong Li.',
      },
      {
        label: 'Algorithms',
        items: [
          'Simple sorts: Insertion, Selection, Bubble, and Bubble with early exit',
          'Faster sorts: Merge, Heap, Quick (Lomuto partition, recursing into the smaller side first)',
          'Improved Quick: random pivot choice, plus a switch to insertion sort for sections under 10 elements',
        ],
      },
      {
        label: 'Datasets',
        text: 'Sorted, reverse-sorted and randomly shuffled arrays (Fisher–Yates shuffle). Sizes are 100, 300, 500, 1K, 3K, 5K, 10K and 50K elements.',
      },
      {
        label: 'How it works',
        items: [
          'Each algorithm adds to a shared counter for every comparison, assignment and swap, so the step count doesn’t depend on the machine.',
          'Each run is also timed with clock().',
          {
            text: 'Two test phases:',
            items: [
              'Phase 1 runs every algorithm on all three input types at each size.',
              'Phase 2 averages steps and clock ticks over 50 random arrays per size. Every algorithm gets a copy of the same array, so the comparison is fair.',
            ],
          },
        ],
      },
      {
        label: 'What it shows',
        text: 'O(n²) sorts blow up on large or reverse-sorted inputs, O(n log n) sorts scale smoothly, and Improved Quick holds up on sorted data where plain Quick falls to its worst case.',
      },
    ],
  },
  {
    slug: 'p-vs-np',
    tilt: -1.4,
    title: 'P VS NP: implications to its solutions',
    blurb: 'A computer seminar talk on what solving P vs NP would mean.',
    tags: ['Theory', 'Talk'],
    repo: null,
    documents: [
      { label: 'Read the paper', file: 'p-vs-np-paper.pdf' },
      { label: 'View the slides', file: 'p-vs-np-slides.pdf' },
    ],
    stack: ['Theory of computation', 'Presentation'],
    notesHeading: 'What It’s about',
    notes: [
      'A research and Presentation for my Computer Seminar Class discussing what P vs NP is and the implications for solving this million dollar question.',
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
  /* image URL imported from src/assets — null shows an empty frame until the
     certificate image is dropped in */
  image: string | null
}

export const certs: Cert[] = [
  { code: 'AI 110', title: 'Foundations of AI Engineering', image: ai110Cert },
  { code: 'AI 201', title: 'Advanced AI Engineering', image: ai201Cert },
  { code: 'WEB 102', title: 'Intermediate Web Development', image: web102Cert },
  { code: 'TIP 102', title: 'Technical Interview Prep', image: tip102Cert },
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
