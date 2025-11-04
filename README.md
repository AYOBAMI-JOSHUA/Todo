Here's a comprehensive README.md for your Todo app:

```markdown
# 📱 Todo App with Theme Switcher

A sophisticated Todo List application built with React Native, Expo, and Convex backend featuring real-time synchronization and beautiful theme switching.

## 🚀 Features

### ✨ Core Functionality
- **Real-time Todo Management**: Full CRUD operations with Convex backend
- **Drag & Drop Reordering**: Intuitive drag-to-reorganize todos
- **Smart Filtering**: Filter by All, Active, or Completed todos
- **Items Counter**: Live count of remaining active items

### 🎨 Theme System
- **Light & Dark Themes**: Seamless theme switching
- **Persistent Preferences**: Theme choice saved across app restarts
- **Smooth Animations**: Beautiful transitions between themes
- **Adaptive Status Bar**: Automatic status bar color adjustment

### 📱 User Experience
- **Responsive Design**: Optimized for mobile and tablet
- **Empty States**: Helpful messages when no todos exist
- **Loading Indicators**: Smooth loading experience
- **Accessibility**: Screen reader support and proper contrast ratios

## 🛠️ Tech Stack

- **Frontend**: React Native with Expo
- **Backend**: Convex for real-time data
- **Navigation**: Expo Router (File-based routing)
- **State Management**: React Context + Convex Queries
- **Styling**: React Native StyleSheet + Dynamic Theming
- **Icons**: Custom icon system with theme support

## 📋 Requirements Met

✅ **Pixel-perfect implementation** from Figma design  
✅ **Smooth theme switching** with persistent preferences  
✅ **Full CRUD functionality** with real-time Convex backend  
✅ **Drag and sort functionality** with visual feedback  
✅ **Responsive design** for all screen sizes  
✅ **Clean, modular code structure**  
✅ **Accessibility compliance** with proper contrast and screen reader support  

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── shared/         # ThemeToggle, BackgroundImage
│   ├── todo/           # TodoItem, TodoList, TodoInput
│   └── theme/          # Theme-related components
├── hooks/              # Custom hooks (useTheme, etc.)
├── constants/          # Colors, themes, app constants
├── types/              # TypeScript type definitions
├── convex/             # Backend functions and queries
└── app/                # App screens and navigation
```

## 🎯 Key Features Implemented

### Theme System
- Dynamic color scheme switching
- Persistent storage using AsyncStorage
- Smooth color transitions
- Adaptive component styling

### Todo Management
- Add new todos with intuitive input
- Toggle completion status
- Delete todos with confirmation
- Real-time updates across devices
- Drag-to-reorder functionality

### Data Persistence
- Convex backend for real-time sync
- Offline-capable design
- Optimistic updates for smooth UX

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd todo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Convex**
   ```bash
   npx convex dev
   ```

4. **Start development server**
   ```bash
   npx expo start
   ```

## 🚀 Building

### Android APK
```bash
# Using EAS Build
eas build --platform android

# Or local build
npx expo prebuild --platform android
cd android && ./gradlew assembleDebug
```

### iOS Build
```bash
eas build --platform ios
```

## 🎨 Design Implementation

The app follows the provided Figma design with:
- Precise spacing and typography
- Accurate color schemes for both themes
- Proper shadow effects and elevations
- Consistent iconography and branding

## 🔧 Configuration

### Environment Setup
- Expo SDK 49+
- React Native 0.72+
- Convex for backend
- TypeScript for type safety

### Backend (Convex)
- Real-time todo synchronization
- Optimistic updates
- Offline support
- Automatic conflict resolution

## 📝 Usage

1. **Adding Todos**: Type in the input field and press enter
2. **Completing Todos**: Tap the circle next to any todo
3. **Filtering**: Use the bottom tabs to filter by status
4. **Reordering**: Long-press and drag todos to reorganize
5. **Theming**: Tap the theme toggle in the header to switch themes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Expo team for the amazing development experience
- Convex for the real-time backend solution
- React Native community for continuous improvements

---

**Built with ❤️ using React Native, Expo, and Convex**
```

This README covers all the requirements from your task instructions and provides comprehensive documentation for your GitHub repository! Let me know if you need any adjustments! 🚀