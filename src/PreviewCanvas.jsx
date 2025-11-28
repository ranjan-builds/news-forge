// PreviewCanvas.jsx
import React from 'react';
import {
  Cloud,
  Cpu,
  Quote,
  Grid,
  Loader,
  Monitor
} from 'lucide-react';

import { FONTS, TEMPLATES } from './constants';

export default function PreviewCanvas({
  config,
  showSafeZones,
  setShowSafeZones,
  isExporting
}) {
  const tmpl = TEMPLATES[config.templateId];
  const containerClass = 'w-full aspect-video';

  const getHeadlineSize = () => {
    switch(config.fontSize) {
      case 'small': return 'text-2xl';
      case 'large': return 'text-6xl';
      case 'xl': return 'text-7xl';
      default: return 'text-4xl';
    }
  };

  const fontStyle = { fontFamily: FONTS[config.fontFamily] };

  const renderContent = (isExport = false) => (
    <div
      className="w-full h-full relative bg-gray-800"
      style={{
        backgroundImage: config.bgImage ? `url(${config.bgImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        ...fontStyle
      }}
    >
      {!config.bgImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
           {!isExport && (
             <div className="text-gray-700 flex flex-col items-center">
                <Cloud size={64} opacity={0.2} />
                <span className="mt-4 font-mono text-xs opacity-50">NO SIGNAL INPUT</span>
             </div>
           )}
        </div>
      )}

      {/* Overlay Gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to top, rgba(0,0,0,${config.overlayOpacity / 100 + 0.2}), transparent)`,
        }}
      />

      {/* Layout container */}
      <div 
        className={`absolute inset-0 flex flex-col justify-end ${isExport ? 'pb-24' : 'pb-16'} transition-transform duration-200 ease-out`}
        style={{ transform: `translate(${config.positionX}px, ${config.positionY}px)` }}
      >
        {/* BREAKING */}
        {config.templateId === 'breaking' && (
          <div className="w-full">
            <div className="flex items-end">
              <div 
                className={`px-6 py-2 text-white font-bold ${isExport ? 'text-2xl' : 'text-lg'} tracking-wider shadow-lg flex items-center gap-2`}
                style={{ backgroundColor: config.customColor }}
              >
                {config.showLiveBadge && (
                   <span className="flex items-center gap-2 text-xs bg-white text-black px-2 py-0.5 rounded font-black tracking-widest live-pulse">
                     <span className="w-2 h-2 rounded-full bg-red-600"></span>
                     LIVE
                   </span>
                )}
                {TEMPLATES.breaking.badges[0]}
              </div>
            </div>
            <div className="bg-white/95 backdrop-blur-sm p-6 border-l-8 shadow-xl" style={{ borderLeftColor: config.customColor }}>
              <h1 className={`${isExport ? 'text-6xl' : getHeadlineSize()} font-black text-black leading-tight uppercase`}>
                {config.headline}
              </h1>
              <p className={`text-gray-800 mt-2 font-medium ${isExport ? 'text-3xl' : 'text-lg'} border-l-4 border-gray-300 pl-3`}>
                {config.subheadline}
              </p>
            </div>
          </div>
        )}

        {/* STANDARD */}
        {config.templateId === 'standard' && (
          <div className="w-full px-8 mb-4">
            <div className="bg-gradient-to-r from-blue-900/90 to-blue-900/60 backdrop-blur-md rounded-t-xl p-6 border-b-4" style={{ borderColor: config.customColor }}>
              <div className="flex items-center gap-3 mb-2">
                 {config.showLiveBadge && (
                   <span className="text-xs font-bold text-red-500 bg-red-100 px-2 py-0.5 rounded uppercase tracking-wider">
                     Live Feed
                   </span>
                 )}
                 <span className="text-blue-200 text-xs font-bold uppercase tracking-widest">
                   {TEMPLATES.standard.badges[0]}
                 </span>
              </div>
              <h1 className={`${isExport ? 'text-6xl' : getHeadlineSize()} font-bold text-white leading-tight drop-shadow-md`}>
                {config.headline}
              </h1>
              <p className={`text-blue-100 mt-2 font-light ${isExport ? 'text-3xl' : 'text-lg'}`}>
                {config.subheadline}
              </p>
            </div>
          </div>
        )}

        {/* FINANCE */}
        {config.templateId === 'finance' && (
          <div className="w-full flex items-end">
            <div className="bg-emerald-900/95 text-white p-6 w-3/4 clip-path-slant-right relative">
              <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500" />
              <div className="flex items-center gap-4 mb-1 opacity-70">
                 <span className="font-serif italic">Global Markets</span>
                 <div className="h-px bg-white flex-1" />
              </div>
              <h1 className={`${isExport ? 'text-6xl' : getHeadlineSize()} font-serif font-bold text-white leading-tight`}>
                  {config.headline}
              </h1>
              <div className="mt-2 flex items-center gap-2 text-emerald-200">
                 <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-emerald-400" />
                 <span className={`font-mono ${isExport ? 'text-2xl' : ''}`}>{config.subheadline}</span>
              </div>
            </div>
          </div>
        )}

        {/* SPORTS */}
        {config.templateId === 'sports' && (
          <div className="w-full flex flex-col items-end px-4 mb-2">
            <div className="bg-orange-600 text-white font-black text-6xl italic -skew-x-12 px-6 py-2 shadow-lg origin-bottom-right transform translate-y-2 z-10 mr-8">
               {TEMPLATES.sports.badges[0]}
            </div>
            <div className="w-full bg-gray-900/90 -skew-x-12 p-6 border-r-8 border-orange-500 shadow-xl transform origin-bottom-left">
               <div className="skew-x-12">
                  <h1 className={`${isExport ? 'text-7xl' : getHeadlineSize()} font-black text-white uppercase italic`}>
                      {config.headline}
                  </h1>
                  <p className={`text-gray-300 italic font-bold mt-1 ${isExport ? 'text-3xl' : 'text-xl'}`}>
                    {config.subheadline}
                  </p>
               </div>
            </div>
          </div>
        )}

        {/* WEATHER */}
        {config.templateId === 'weather' && (
          <div className="w-full px-6 pb-4">
            <div className="flex bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20">
               <div
                 className="bg-blue-500/80 p-6 flex flex-col justify-center items-center min-w-[120px]"
                 style={{ backgroundColor: config.customColor }}
               >
                   <Cloud size={isExport ? 80 : 48} className="text-white mb-2" />
                   <span className={`${isExport ? 'text-6xl' : 'text-3xl'} font-bold`}>72°</span>
                   <span className="text-xs uppercase font-bold opacity-80">Sunny</span>
               </div>
               <div className="p-6 flex-1 bg-gradient-to-r from-gray-900/80 to-transparent">
                  <h1 className={`${isExport ? 'text-6xl' : getHeadlineSize()} font-bold text-white mb-2`}>
                    {config.headline}
                  </h1>
                  <div className={`flex gap-4 text-blue-200 ${isExport ? 'text-2xl' : 'text-sm'}`}>
                     <span>H: 75° L: 65°</span>
                     <span>•</span>
                     <span>Humidity: 45%</span>
                     <span>•</span>
                     <span>Wind: NW 10mph</span>
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* TECH */}
        {config.templateId === 'tech' && (
          <div className="w-full px-4 mb-4 font-mono">
             <div className="border border-purple-500 bg-black/80 p-1 relative">
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-purple-500" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-500" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-purple-500" />
                
                <div className="bg-purple-900/20 p-6 border border-purple-500/30">
                  <div className="flex items-center gap-2 text-purple-400 mb-2 text-xs tracking-[0.2em]">
                     <Cpu size={14} /> SYSTEM_ALERT // {TEMPLATES.tech.badges[0]}
                  </div>
                  <h1 className={`${isExport ? 'text-6xl' : getHeadlineSize()} text-white uppercase tracking-tighter glitch-effect`}>
                     <span className="text-purple-500 mr-2">{'>'}</span>
                     {config.headline}
                  </h1>
                  <p className={`text-purple-200 mt-2 border-l border-purple-500 pl-3 ${isExport ? 'text-2xl' : 'text-sm'}`}>
                     {config.subheadline}
                  </p>
                </div>
             </div>
          </div>
        )}

        {/* QUOTE */}
        {config.templateId === 'quote' && (
          <div className="w-full flex justify-center mb-8 px-12">
            <div className="bg-white/90 backdrop-blur text-gray-900 p-8 rounded-xl relative shadow-2xl text-center max-w-4xl">
               <Quote
                 size={isExport ? 80 : 48}
                 className="absolute -top-6 -left-4 text-pink-500 fill-current"
                 style={{ color: config.customColor }}
               />
               <h1 className={`${isExport ? 'text-6xl' : getHeadlineSize()} font-serif italic font-bold leading-tight mb-4`}>
                  "{config.headline}"
               </h1>
               <div className="flex items-center justify-center gap-3">
                  <div className="h-px w-12 bg-gray-400" />
                  <p className={`font-bold uppercase tracking-wider text-gray-600 ${isExport ? 'text-2xl' : 'text-lg'}`}>
                    {config.subheadline}
                  </p>
                  <div className="h-px w-12 bg-gray-400" />
               </div>
            </div>
          </div>
        )}
      </div>

      {/* LOGO */}
      {config.showLogo && config.logo && (
        <div 
          className="absolute top-8 right-8 z-20 drop-shadow-lg transition-all duration-200"
          style={{ 
            width: `${isExport ? config.logoSize * 1.5 : config.logoSize}px`,
            opacity: config.logoOpacity / 100
          }}
        >
          <img src={config.logo} alt="Channel Logo" className="w-full h-auto object-contain" />
        </div>
      )}
      
      {/* TIME */}
      {config.showTime && (
        <div
          className="absolute top-8 left-8 z-20 flex flex-col bg-black/50 backdrop-blur px-3 py-1 rounded text-white font-mono text-sm border-l-2"
          style={{
            borderColor: config.customColor,
            transform: isExport ? 'scale(1.5)' : 'none',
            transformOrigin: 'top left'
          }}
        >
          <span className="font-bold">LIVE</span>
          <span className="text-xs opacity-80">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      )}

      {/* TICKER */}
      {config.showTicker && (
        <div 
          className={`absolute left-0 right-0 bottom-0 bg-gray-900 text-white flex items-center border-t-4 z-30 shadow-2xl ${isExport ? 'h-24' : 'h-14'}`} 
          style={{ borderColor: config.customColor, ...fontStyle }}
        >
          <div 
            className={`h-full flex items-center justify-center font-black z-10 shadow-lg ${isExport ? 'px-10 text-4xl' : 'px-6 text-xl'}`}
            style={{ backgroundColor: config.customColor }}
          >
            NEWS
          </div>
          <div className="flex-1 overflow-hidden relative h-full flex items-center">
            <div className={`font-medium uppercase tracking-wide text-gray-100 pl-4 overflow-hidden text-ellipsis whitespace-nowrap ${isExport ? 'text-3xl' : 'text-lg'}`}>
               {config.ticker}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex-1 bg-gray-100 flex flex-col h-full relative overflow-hidden">
      {/* Toolbar */}
      <div className="bg-white h-12 flex items-center justify-between px-4 z-10 border-b border-gray-200 shrink-0 shadow-sm">
         <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-2">
           <Monitor size={14} /> 1920x1080 Broadcast
         </div>
        <div className="flex items-center gap-2">
           <button
             onClick={() => setShowSafeZones(!showSafeZones)}
             className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
               showSafeZones ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
             }`}
             title="Toggle Safe Zones"
           >
             <Grid size={14} /> Safe Zones
           </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 relative flex items-center justify-center bg-gray-100 p-8 overflow-hidden select-none">
        <div className={`${containerClass} bg-gray-800 relative overflow-hidden shadow-2xl transition-all duration-300 ring-1 ring-black/5`}>
          {renderContent(false)}

          {showSafeZones && !isExporting && (
            <>
               <div className="absolute inset-[10%] border border-green-500/30 pointer-events-none flex items-start justify-start">
                  <span className="text-green-500/50 text-[10px] p-1 bg-black/50">Title Safe</span>
               </div>
               <div className="absolute inset-[5%] border border-red-500/30 pointer-events-none flex items-start justify-start">
                  <span className="text-red-500/50 text-[10px] p-1 bg-black/50">Action Safe</span>
               </div>
               <div className="absolute inset-x-1/2 inset-y-0 border-l border-white/10 pointer-events-none" />
               <div className="absolute inset-y-1/2 inset-x-0 border-t border-white/10 pointer-events-none" />
            </>
          )}
        </div>
      </div>

      {/* High-res export overlay */}
      {isExporting && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center">
          <div className="text-white flex flex-col items-center gap-4 mb-8">
            <Loader size={48} className="animate-spin text-blue-500" />
            <div className="text-xl font-bold">Rendering High-Resolution Graphic...</div>
            <div className="text-sm text-gray-400">Please wait while we process the image.</div>
          </div>
          
          <div 
            id="high-res-export-container" 
            className="overflow-hidden shadow-2xl"
            style={{
              width: '1920px',
              height: '1080px',
              transform: 'scale(1)', 
              background: '#000',
              position: 'fixed',
              left: '0px', 
              top: '0px',
              zIndex: -9999
            }}
          >
            {renderContent(true)}
          </div>
        </div>
      )}
    </div>
  );
}
