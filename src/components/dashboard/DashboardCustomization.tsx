import React, { useState, useEffect } from 'react';
import ThemeSelector from './ThemeSelector';
import LogoUploader from './LogoUploader';
import { DashboardSettings, LogoSettings } from '../../types';
import { THEMES } from '../../data/themes';
import '../../styles/themes.css';

interface DashboardCustomizationProps {
  onLogoChange?: (logoSettings: LogoSettings) => void;
}

const DashboardCustomization: React.FC<DashboardCustomizationProps> = ({ onLogoChange }) => {
  // Initialize with default settings or load from localStorage if available
  const [settings, setSettings] = useState<DashboardSettings>(() => {
    const savedSettings = localStorage.getItem('dashboardSettings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
    return {
      selectedTheme: 'navy', // Default theme
      logoSettings: {
        expanded: null,
        collapsed: null
      }
    };
  });
  
  const [hasChanges, setHasChanges] = useState(false);

  // Keep track of any changes for save button activation
  useEffect(() => {
    const savedSettings = localStorage.getItem('dashboardSettings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      // Compare current settings with saved settings
      if (
        parsedSettings.selectedTheme !== settings.selectedTheme ||
        parsedSettings.logoSettings.expanded !== settings.logoSettings.expanded ||
        parsedSettings.logoSettings.collapsed !== settings.logoSettings.collapsed
      ) {
        setHasChanges(true);
      } else {
        setHasChanges(false);
      }
    } else {
      // If no saved settings exist, there are changes by default
      setHasChanges(true);
    }
  }, [settings]);

  const handleThemeSelect = (themeId: string) => {
    setSettings(prev => ({
      ...prev,
      selectedTheme: themeId
    }));
  };

  const handleLogoChange = (logoSettings: LogoSettings) => {
    setSettings(prev => ({
      ...prev,
      logoSettings
    }));

    // If external onLogoChange callback is provided, call it
    if (onLogoChange) {
      onLogoChange(logoSettings);
    }
  };

  const handleSaveChanges = () => {
    // Save to localStorage
    localStorage.setItem('dashboardSettings', JSON.stringify(settings));
    setHasChanges(false);
  };

  const handleResetToDefault = () => {
    const defaultSettings: DashboardSettings = {
      selectedTheme: 'navy',
      logoSettings: {
        expanded: null,
        collapsed: null
      }
    };
    
    setSettings(defaultSettings);
    
    // If external onLogoChange callback is provided, call it with default values
    if (onLogoChange) {
      onLogoChange(defaultSettings.logoSettings);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="customization-header" data-testid="customization-header">
        <div>
          <h1>Dashboard Customisation</h1>
          <p className="text-muted">Customise your dashboard appearance and logo display</p>
        </div>
        <div className="action-buttons">
          <button 
            className="btn btn-secondary" 
            onClick={handleResetToDefault}
            data-testid="reset-button"
          >
            Reset to default
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handleSaveChanges}
            disabled={!hasChanges}
            data-testid="save-button"
          >
            Save changes
          </button>
        </div>
      </div>
      
      <div className="dashboard-customization">
        <div className="customization-content">
          <ThemeSelector 
            themes={THEMES}
            selectedTheme={settings.selectedTheme}
            onSelectTheme={handleThemeSelect}
          />
          
          <LogoUploader 
            logoSettings={settings.logoSettings}
            selectedTheme={settings.selectedTheme}
            onLogoChange={handleLogoChange}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardCustomization;
