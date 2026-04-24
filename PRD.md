# Product Requirements Document — Personal Site

## Overview
Personal portfolio site for Jay Chen, built from scratch as a learning project. Deployed on GitHub Pages.

---

## Tech Stack
- **Build tool:** Vite
- **Framework:** React + TypeScript
- **Styling:** TailwindCSS
- **Deployment:** GitHub Pages

---

## Theme & Visuals

### Color Scheme
- Paper/parchment-like aesthetic — warm off-whites, aged tones
- Background must complement the video/animation on load
- TBD: specific palette

### Load Animation
- Script-writing animation on page load for headers (text appears as if being hand-written)
- Accompanied by scribbling/writing audio synced to the animation
- Background video plays on load — options to explore:
  - AI-generated video
  - Self-recorded footage
  - Must match the paper theme visually

### Page Transitions
- Page-flipping animation when navigating to a project's dedicated page

---

## Sections

### 1. Top Navigation Bar
- Fixed or sticky nav
- Links to major sections (smooth scroll or routing TBD)

### 2. Hero / Heading Section
- Name: **Jay Chen**
- Subtitle: M.S. CS at CSI
- Role: Software Engineering

### 3. Experience & Education — "Journey" Section
- Timeline-style layout
- Consider overlapping process/pipeline visual
- Entries:
  - CSI — Bachelor's
  - CSI — Master's
  - My Lua *(role/context TBD)*
  - NYC TTP *(role/context TBD)*

### 4. Projects Section
- Each project is clickable and opens a dedicated page
- Page-flip transition on click
- Projects:
  - Chit Chat
  - LMS
  - Sorting Algorithm Analysis
  - Jay's C++ DSA Library
  - P vs NP
  - Battleship
  - J*b Finder
  - Cash Flow

### 5. Skills Section *(optional / TBD)*
- May include languages, frameworks, tools

### 6. Footer
- TBD content

---

## Open Questions
- Video: AI-generated vs. self-recorded?
- Nav behavior: smooth scroll (single page) vs. React Router (multi-page)?
- Journey section: exact timeline layout and overlapping process visual?
- Skills section: include or skip?
- Footer content?
