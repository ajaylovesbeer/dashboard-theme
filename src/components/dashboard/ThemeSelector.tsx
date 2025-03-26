import React from 'react';
import { Theme } from '../../types';
import '../../styles/themes.css';

interface ThemeSelectorProps {
  themes: Theme[];
  selectedTheme: string;
  onSelectTheme: (themeId: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  themes,
  selectedTheme,
  onSelectTheme,
}) => {
  return (
    <div className="theme-selector">
      <h2>Theme Selection</h2>
      <div className="themes-grid">
        {themes.map((theme) => (
          <div
            key={theme.id}
            className={`theme-card ${selectedTheme === theme.id ? 'selected' : ''}`}
            onClick={() => onSelectTheme(theme.id)}
          >
            <div
              className="theme-preview"
              style={{ backgroundColor: theme.primaryColor }}
            ></div>
            <div className="theme-info">
              <div className="d-flex justify-content-between align-items-center">
                <h3>{theme.name}</h3>
              </div>
              <p className="text-muted">{theme.description}</p>
              <div className="theme-color-dots">
                <div
                  className="color-dot"
                  style={{ backgroundColor: theme.primaryColor }}
                ></div>
                <div
                  className="color-dot"
                  style={{ backgroundColor: theme.secondaryColor }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
