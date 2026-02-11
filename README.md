# Modern Company Calendar Web App

A Outlook-inspired calendar application built with React, TypeScript, and Tailwind CSS.

## ✨ Features

### 📅 Calendar Views
- **Month View**: Overview of all events in a month
- **Week View**: Hourly timeline for 7-day week  
- **Day View**: Detailed hourly breakdown with full event details

### ✅ Task & Event Management (CRUD)
- Create, read, update, and delete tasks/events
- Set task title, description, start/end times
- Assign team members to tasks
- Mark tasks as completed
- Color-coded events for quick visual identification

### 👥 Team Member Management
- Add/edit/delete team members with name and role
- Upload and manage avatar photos (base64 or blob)
- Display fallback initials when no photo
- Track tasks assigned to each member
- Color-coded member profiles

### 🎨 User Experience
- Clean, modern SaaS-style dashboard layout
- Responsive design (Desktop, Tablet, Mobile)
- Smooth transitions and animations
- Card-based event display with member avatars

### 💾 Data Persistence
- All data persists in browser LocalStorage
- No backend required
- Data syncs across browser tabs

## 🛠 Tech Stack

- **Frontend Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with dark mode
- **Icons**: Lucide React
- **UI Components**: Custom React components
- **State Management**: React Hooks
- **Data Persistence**: Browser LocalStorage

## 📁 Project Structure

```
src/
├── components/              # React components
│   ├── MainLayout.tsx      # Main layout container
│   ├── MonthCalendar.tsx   # Month view component
│   ├── WeekCalendar.tsx    # Week view component
│   ├── DayCalendar.tsx     # Day view component
│   ├── TaskModal.tsx       # Task creation/edit modal
│   ├── TeamMemberModal.tsx # Member creation/edit modal
│   ├── TeamMemberSidebar.tsx # Team members panel
│   └── index.ts            # Component exports
├── hooks/                   # Custom React hooks
│   └── useCalendar.ts      # Calendar state management
├── types/                   # TypeScript types
│   └── index.ts
├── utils/                   # Utility functions
│   ├── storage.ts          # LocalStorage operations
│   ├── dateHelpers.ts      # Date manipulation
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css               # Tailwind CSS directives
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at **http://localhost:5174/**

## 📖 Usage Guide

### Creating a Task/Event
1. Click **"Add task"** on any calendar day (Month view)
2. Or click **"Add Task"** button (Day view)
3. Fill in:
   - Title (required)
   - Description (optional)
   - Start/End times
   - Assigned team member
   - Color
4. Click **"Save"**

### Managing Team Members
1. Open **Team Members** sidebar (left side on desktop)
2. Click **"+ Add Member"**
3. Enter name, role, and optionally upload photo
4. Click **"Save"**
5. Hover over member to Edit or Delete

### Switch Calendar Views
- Click **Month** | **Week** | **Day** buttons in top bar

### Dark Mode
- Click **Moon/Sun** icon in top-right
- Preference auto-saves

### Mobile/Tablet
- Hamburger menu for team members
- Full-width calendar view
- Bottom navigation for view switching

## 💾 Data Storage

**LocalStorage Keys:**
- `calendar_tasks` - Task array
- `calendar_members` - Team members array
- `calendar_dark_mode` - Dark mode preference

**Clear all data:**
```javascript
localStorage.clear() // or selectively:
localStorage.removeItem('calendar_tasks');
localStorage.removeItem('calendar_members');
localStorage.removeItem('calendar_dark_mode');
```

## 🎯 Type Definitions

```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  assignedMemberId: string | null;
  color: string;
  completed: boolean;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string | null; // base64 data URL
  color: string;
}
```

## 🎨 Customization

### Add More Colors
Edit [src/utils/index.ts](src/utils/index.ts):
```typescript
export const colors = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#45B7D1', // Blue
  // Add yours...
];
```

### Dark Mode
Tailwind dark mode uses class strategy. The root div gets `dark` class when enabled.

```html
<div class={darkMode ? 'dark' : ''}>
  <!-- Your content here -->
</div>
```

## 📦 Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## ⚡ Performance

- Bundle size: ~230 KB minified (production)
- Lazy rendering: Only visible cells render
- Optimized re-renders: React hooks minimize updates

## 🔮 Future Enhancements

- Drag & drop events between days
- Recurring tasks/events
- Event notifications/reminders
- Google Calendar / Outlook integration
- Shared calendars
- Event categories/tags
- Time zone support
- PDF export

## 🐛 Troubleshooting

**App won't start?**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Styles not loading?**
- Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)
- Check that `index.css` has Tailwind directives

**Dark mode issues?**
- Verify `dark` class on root div
- Check Tailwind config has `darkMode: 'class'`

## 📄 License

MIT

---

**Ready to use! Start creating tasks and managing your team's schedule. 📅✨**
