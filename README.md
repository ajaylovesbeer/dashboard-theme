# Dashboard Customization Page

This project provides a fully functional Dashboard Customization interface where clients can personalize their experience by selecting from predefined themes and uploading their company logo. The uploaded logo is automatically resized and displayed in both collapsed and expanded side panels.

## Features

1. **Theme Selection**
   - Five predefined themes with visual previews
   - Dynamic theme switching
   - Color previews for each theme

2. **Logo Upload**
   - Drag & drop logo upload functionality
   - Automatic resizing for both collapsed (100x100px) and expanded (300x100px) views
   - Live preview of how logos will appear in different panel states
   - Supports SVG, PNG, and EPS file formats

3. **Settings Management**
   - Auto-save to local storage
   - Reset to default option
   - Save changes confirmation

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```
git clone <repository-url>
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Select a theme by clicking on one of the theme cards
2. Upload your logo using the drag & drop interface or file browser
3. Preview how your logo will appear in both collapsed and expanded states
4. Click "Save changes" to persist your customizations

## Technical Details

- Built with React and TypeScript
- Responsive design for all device sizes
- Local storage integration for settings persistence
- Image processing for automatic logo resizing 