// NewsForgeApp.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import PreviewCanvas from './PreviewCanvas';
import { AI_SUGGESTIONS, TEMPLATES } from './constants';

export default function NewsForgeApp() {
  const [activeTab, setActiveTab] = useState('content');
  const [isExporting, setIsExporting] = useState(false);
  const [showSafeZones, setShowSafeZones] = useState(false);

  const [config, setConfig] = useState({
    templateId: 'breaking',
    headline: 'BREAKING NEWS TITLE HERE',
    subheadline: 'Reporting live from the scene with updates as they happen.',
    ticker: 'Follow us @NewsForge • Updates coming in every minute • Stay tuned for more coverage • ',
    bgImage: null,
    logo: null,
    showLogo: true,
    showTicker: true,
    showLiveBadge: true,
    showTime: true,
    customColor: TEMPLATES.breaking.primaryColor,
    positionY: 0,
    positionX: 0,
    overlayOpacity: 30,
    fontSize: 'normal', 
    fontFamily: 'sans-serif',
    logoSize: 64,
    logoOpacity: 100
  });

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setConfig(prev => ({ ...prev, [type]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAIHeadline = () => {
    const random = AI_SUGGESTIONS[Math.floor(Math.random() * AI_SUGGESTIONS.length)];
    setConfig(prev => ({ ...prev, headline: random }));
  };

  const resetProject = () => {
    if (window.confirm("Reset all changes?")) {
      setConfig({
        templateId: 'breaking',
        headline: 'BREAKING NEWS TITLE HERE',
        subheadline: 'Reporting live from the scene with updates as they happen.',
        ticker: 'Follow us @NewsForge • Updates coming in every minute • Stay tuned for more coverage • ',
        bgImage: null,
        logo: null,
        showLogo: true,
        showTicker: true,
        showLiveBadge: true,
        showTime: true,
        customColor: TEMPLATES.breaking.primaryColor,
        positionY: 0,
        positionX: 0,
        overlayOpacity: 30,
        fontSize: 'normal',
        fontFamily: 'sans-serif',
        logoSize: 64,
        logoOpacity: 100
      });
    }
  };

  const saveProject = () => {
    try {
      localStorage.setItem('newsforge_project', JSON.stringify(config));
      alert('Project saved successfully!');
    } catch (e) {
      alert('Failed to save project. Storage might be full.');
    }
  };

  const loadProject = () => {
    const saved = localStorage.getItem('newsforge_project');
    if (saved) {
      if (window.confirm("Load saved project? This will overwrite current changes.")) {
        setConfig(JSON.parse(saved));
      }
    } else {
      alert('No saved project found.');
    }
  };

  const handleDirectDownload = async () => {
    setIsExporting(true);

    setTimeout(async () => {
      const element = document.getElementById('high-res-export-container');
      
      if (element && window.htmlToImage) {
        try {
          const dataUrl = await window.htmlToImage.toPng(element, {
             quality: 1.0,
             pixelRatio: 1,
             backgroundColor: '#000000',
             cacheBust: true,
             style: { 
               transform: 'scale(1)',
               visibility: 'visible',
               display: 'block' 
             }
          });
          
          const link = document.createElement('a');
          link.download = `newsforge-graphic-${Date.now()}.png`;
          link.href = dataUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (err) {
          console.error("Export Error:", err);
          alert("Failed to generate image. Please check console for details.");
        }
      } else {
        alert("Export library not loaded yet. Please try again in a moment.");
      }
      setIsExporting(false);
    }, 1000);
  };

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      .live-pulse {
        animation: pulse-red 2s infinite;
      }
      @keyframes pulse-red {
        0% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7); }
        70% { box-shadow: 0 0 0 10px rgba(220, 38, 38, 0); }
        100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); }
      }
      .clip-path-slant-right {
        clip-path: polygon(0 0, 100% 0, 95% 100%, 0% 100%);
      }
      .glitch-effect {
        text-shadow: 2px 0 #ff00c1, -2px 0 #00fff9;
      }
      ::-webkit-scrollbar { width: 6px; height: 6px; }
      ::-webkit-scrollbar-track { background: #f3f4f6; }
      ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
      ::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
    `;
    document.head.appendChild(styleSheet);

    const script = document.createElement('script');
    script.src = "https://unpkg.com/html-to-image@1.11.11/dist/html-to-image.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(styleSheet);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-gray-50 text-gray-900 overflow-hidden font-sans">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        config={config}
        setConfig={setConfig}
        isExporting={isExporting}
        onExport={handleDirectDownload}
        onSave={saveProject}
        onLoad={loadProject}
        onReset={resetProject}
        onGenerateHeadline={generateAIHeadline}
        onImageUpload={handleImageUpload}
      />
      <PreviewCanvas
        config={config}
        showSafeZones={showSafeZones}
        setShowSafeZones={setShowSafeZones}
        isExporting={isExporting}
      />
    </div>
  );
}
