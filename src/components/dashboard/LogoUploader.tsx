import React, { useState, useRef } from 'react';
import { LogoSettings } from '../../types';
import '../../styles/themes.css';

interface LogoUploaderProps {
  logoSettings: LogoSettings;
  selectedTheme: string;
  onLogoChange: (logos: LogoSettings) => void;
}

const LogoUploader: React.FC<LogoUploaderProps> = ({
  logoSettings,
  selectedTheme,
  onLogoChange,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const processFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Create expanded logo (300x100)
        const expandedCanvas = document.createElement('canvas');
        expandedCanvas.width = 300;
        expandedCanvas.height = 100;
        const expandedCtx = expandedCanvas.getContext('2d');
        
        if (expandedCtx) {
          // Calculate scaling to fit height at 100px while maintaining aspect ratio
          const scale = Math.min(300 / img.width, 100 / img.height);
          const x = (300 - img.width * scale) / 2;
          const y = (100 - img.height * scale) / 2;
          
          expandedCtx.drawImage(img, x, y, img.width * scale, img.height * scale);
          const expandedLogo = expandedCanvas.toDataURL('image/png');
          
          // Create collapsed logo (100x100)
          const collapsedCanvas = document.createElement('canvas');
          collapsedCanvas.width = 100;
          collapsedCanvas.height = 100;
          const collapsedCtx = collapsedCanvas.getContext('2d');
          
          if (collapsedCtx) {
            // Scale to fit in 100x100 square while maintaining aspect ratio
            const collapsedScale = Math.min(100 / img.width, 100 / img.height);
            const cx = (100 - img.width * collapsedScale) / 2;
            const cy = (100 - img.height * collapsedScale) / 2;
            
            collapsedCtx.drawImage(img, cx, cy, img.width * collapsedScale, img.height * collapsedScale);
            const collapsedLogo = collapsedCanvas.toDataURL('image/png');
            
            onLogoChange({
              expanded: expandedLogo,
              collapsed: collapsedLogo
            });
          }
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveLogo = () => {
    onLogoChange({
      expanded: null,
      collapsed: null
    });
  };

  // Get theme class for preview backgrounds
  const themeClass = `side-panel-${selectedTheme}`;

  return (
    <div className="logo-section">
      <h2>Upload Logo</h2>
      
      <div className="logo-upload-container">
        {!logoSettings.expanded ? (
          <div 
            className={`logo-dropzone ${isDragging ? 'active' : ''}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleUploadClick}
          >
            <div>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16V8M9 11L12 8L15 11" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 16H8" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#6B7280" strokeWidth="2"/>
              </svg>
              <h3>Drag and drop your logos here</h3>
              <p className="text-muted">or Click here to upload SVG, PNG, or EPS files.</p>
              <p className="text-muted">Recommended dimensions: 300x100 for expanded view, 100x100 for collapsed view.</p>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept="image/*" 
              onChange={handleFileSelect}
            />
          </div>
        ) : (
          <div>
            <div className="logo-preview-header">
              <h3>Logo Preview</h3>
              <p className="text-muted">See how your logo will appear in the expanded and collapsed views.</p>
            </div>
            
            <div className="logo-preview-container-wrapper">
              <div className="logo-preview-box">
                <div className="logo-preview-label">
                  <div>Expanded View</div>
                  <div className="logo-preview-dimensions">300x100 pixels</div>
                </div>
                <div className={`logo-preview-container ${themeClass}`}>
                  <div className="expanded-view">
                    {logoSettings.expanded && (
                      <img 
                        src={logoSettings.expanded} 
                        alt="Expanded Logo" 
                        style={{ maxHeight: '100%', maxWidth: '100%' }}
                      />
                    )}
                  </div>
                </div>
              </div>
              
              <div className="logo-preview-box">
                <div className="logo-preview-label">
                  <div>Collapsed View</div>
                  <div className="logo-preview-dimensions">100x100 pixels</div>
                </div>
                <div className={`logo-preview-container ${themeClass}`}>
                  <div className="collapsed-view">
                    {logoSettings.collapsed && (
                      <img 
                        src={logoSettings.collapsed} 
                        alt="Collapsed Logo" 
                        style={{ maxHeight: '100%', maxWidth: '100%' }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="logo-actions">
              <button 
                className="btn btn-secondary"
                onClick={handleRemoveLogo}
              >
                Remove Logo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogoUploader;
