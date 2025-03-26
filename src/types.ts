export interface Theme {
  id: string;
  name: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  previewImage?: string;
}

export interface LogoSettings {
  expanded: string | null; // Base64 or URL for the 300x100 logo
  collapsed: string | null; // Base64 or URL for the 100x100 logo mark
}

export interface DashboardSettings {
  selectedTheme: string;
  logoSettings: LogoSettings;
} 