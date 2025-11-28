// Sidebar.jsx
import React from 'react';
import { 
  Type, 
  Image as ImageIcon, 
  Download, 
  Palette, 
  Sparkles, 
  Upload,
  Move,
  Save,
  Trash2,
  RefreshCw,
  FolderOpen,
  Maximize,
  Sun,
  Loader,
  LayoutTemplate,
} from 'lucide-react';

import SliderControl from './SliderControl';
import { TEMPLATES } from './constants';

export default function Sidebar({
  activeTab,
  setActiveTab,
  config,
  setConfig,
  isExporting,
  onExport,
  onSave,
  onLoad,
  onReset,
  onGenerateHeadline,
  onImageUpload
}) {
  return (
    <div className="w-full md:w-80 bg-white border-r border-gray-200 flex flex-col h-full overflow-hidden text-sm z-50 shadow-xl relative text-gray-900 font-sans">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between shrink-0 bg-white">
        <div className="flex items-center gap-2 font-bold text-gray-900 text-lg">
          <div className="bg-red-600 text-white p-1 rounded">
             <LayoutTemplate size={18} />
          </div>
          NewsForge
        </div>
        <div className="flex gap-1">
          <button
            onClick={onSave}
            className="p-2 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-900 transition-colors"
            title="Save Project"
          >
            <Save size={16} />
          </button>
          <button
            onClick={onLoad}
            className="p-2 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-900 transition-colors"
            title="Load Project"
          >
            <FolderOpen size={16} />
          </button>
          <button
            onClick={onReset}
            className="p-2 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-900 transition-colors"
            title="Reset"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-gray-50 shrink-0">
        {[
          { id: 'content', icon: Type, label: 'Content' },
          { id: 'design', icon: Palette, label: 'Design' },
          { id: 'assets', icon: ImageIcon, label: 'Media' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 p-3 flex flex-col items-center gap-1 transition-all ${
              activeTab === tab.id 
              ? 'text-blue-600 border-b-2 border-blue-600 bg-white font-semibold' 
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <tab.icon size={16} />
            <span className="text-xs">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin">
        {/* CONTENT TAB */}
        {activeTab === 'content' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="space-y-2">
              <label className="text-gray-600 text-xs uppercase font-bold flex justify-between">
                Headline
                <button
                  onClick={onGenerateHeadline}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-[10px] normal-case transition-colors font-medium"
                >
                  <Sparkles size={12} /> AI Suggest
                </button>
              </label>
              <textarea 
                value={config.headline}
                onChange={(e) => setConfig({ ...config, headline: e.target.value })}
                className="w-full bg-white text-gray-900 p-3 rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-lg font-bold transition-all shadow-sm"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-600 text-xs uppercase font-bold">Sub-Headline</label>
              <textarea 
                value={config.subheadline}
                onChange={(e) => setConfig({ ...config, subheadline: e.target.value })}
                className="w-full bg-white text-gray-900 p-3 rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-sm"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-600 text-xs uppercase font-bold">Ticker Text</label>
              <input 
                type="text"
                value={config.ticker}
                onChange={(e) => setConfig({ ...config, ticker: e.target.value })}
                className="w-full bg-white text-gray-900 p-3 rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none font-mono text-sm transition-all shadow-sm"
              />
            </div>

            <div className="pt-4 border-t border-gray-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Show Time</span>
                <input
                  type="checkbox"
                  checked={config.showTime}
                  onChange={e => setConfig({ ...config, showTime: e.target.checked })}
                  className="accent-blue-600 h-4 w-4"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Show Live Badge</span>
                <input
                  type="checkbox"
                  checked={config.showLiveBadge}
                  onChange={e => setConfig({ ...config, showLiveBadge: e.target.checked })}
                  className="accent-blue-600 h-4 w-4"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Show Ticker</span>
                <input
                  type="checkbox"
                  checked={config.showTicker}
                  onChange={e => setConfig({ ...config, showTicker: e.target.checked })}
                  className="accent-blue-600 h-4 w-4"
                />
              </div>
            </div>
          </div>
        )}

        {/* DESIGN TAB */}
        {activeTab === 'design' && (
          <div className="space-y-6 animate-fadeIn">
             <div className="space-y-2">
              <label className="text-gray-600 text-xs uppercase font-bold">Template Style</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.values(TEMPLATES).map(t => (
                  <button
                    key={t.id}
                    onClick={() => setConfig({
                      ...config,
                      templateId: t.id,
                      customColor: t.primaryColor,
                      fontFamily: t.defaultFont
                    })}
                    className={`p-2 text-left rounded border text-xs font-bold transition-all ${
                      config.templateId === t.id 
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-200' 
                      : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-600 text-xs uppercase font-bold">Font Family</label>
              <select 
                value={config.fontFamily}
                onChange={(e) => setConfig({ ...config, fontFamily: e.target.value })}
                className="w-full bg-white text-gray-900 p-2 rounded border border-gray-300 focus:border-blue-500 outline-none text-xs shadow-sm"
              >
                <option value="sans-serif">Modern Sans (Inter)</option>
                <option value="serif">Classic Serif (Merriweather)</option>
                <option value="mono">Tech Mono (JetBrains)</option>
                <option value="slab">Bold Slab (Rockwell)</option>
                <option value="impact">Heavy Impact (Anton)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-gray-600 text-xs uppercase font-bold">Theme Color</label>
              <div className="flex gap-2">
                <input 
                  type="color" 
                  value={config.customColor}
                  onChange={(e) => setConfig({ ...config, customColor: e.target.value })}
                  className="w-10 h-10 rounded cursor-pointer border-none bg-transparent"
                />
                <div className="flex-1 flex gap-1 flex-wrap">
                   {['#dc2626', '#2563eb', '#059669', '#ea580c', '#7c3aed', '#db2777', '#0ea5e9'].map(c => (
                     <button 
                      key={c}
                      onClick={() => setConfig({ ...config, customColor: c })}
                      className="w-8 h-8 rounded-full border border-gray-200 hover:scale-110 transition-transform shadow-sm"
                      style={{ backgroundColor: c }}
                     />
                   ))}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-4">
              <SliderControl 
                label="Vertical Position" 
                icon={Move} 
                value={config.positionY} 
                onChange={(v) => setConfig({ ...config, positionY: v })}
                min={-300} max={300}
              />
              <SliderControl 
                label="Horizontal Position" 
                icon={Move} 
                value={config.positionX} 
                onChange={(v) => setConfig({ ...config, positionX: v })}
                min={-300} max={300}
              />
              <SliderControl 
                label="Overlay Opacity" 
                icon={Sun} 
                value={config.overlayOpacity} 
                onChange={(v) => setConfig({ ...config, overlayOpacity: v })}
                min={0} max={100}
              />
            </div>

             <div className="space-y-2">
              <label className="text-gray-600 text-xs uppercase font-bold">Text Size</label>
              <div className="flex rounded bg-gray-100 p-1 border border-gray-200">
                {['small', 'normal', 'large', 'xl'].map(s => (
                  <button
                    key={s}
                    onClick={() => setConfig({ ...config, fontSize: s })}
                    className={`flex-1 py-1 rounded text-xs capitalize transition-all ${
                      config.fontSize === s ? 'bg-white text-blue-700 shadow-sm font-semibold' : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {s === 'xl' ? 'XL' : s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ASSETS TAB */}
        {activeTab === 'assets' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="space-y-2">
              <label className="text-gray-600 text-xs uppercase font-bold">Background Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:bg-blue-50 transition-colors relative cursor-pointer group bg-gray-50">
                <ImageIcon size={32} className="mb-2 group-hover:text-blue-500 transition-colors" />
                <span className="text-xs font-medium text-gray-500 group-hover:text-blue-600">
                  Click to Upload Image
                </span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => onImageUpload(e, 'bgImage')}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              {config.bgImage && (
                <button 
                  onClick={() => setConfig({ ...config, bgImage: null })}
                  className="text-xs text-red-500 flex items-center gap-1 hover:underline mt-2 font-medium"
                >
                  <Trash2 size={12}/> Remove Background
                </button>
              )}
            </div>

            <div className="space-y-2 border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-gray-600 text-xs uppercase font-bold">Channel Logo</label>
                 <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-[10px] uppercase">Show</span>
                    <input
                      type="checkbox"
                      checked={config.showLogo}
                      onChange={e => setConfig({ ...config, showLogo: e.target.checked })}
                      className="accent-blue-600 h-4 w-4"
                    />
                 </div>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:bg-blue-50 transition-colors relative cursor-pointer group bg-gray-50">
                <Upload size={24} className="mb-2 group-hover:text-blue-500 transition-colors" />
                <span className="text-xs font-medium text-gray-500 group-hover:text-blue-600">
                  Upload Logo (PNG)
                </span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => onImageUpload(e, 'logo')}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              {config.logo && (
                <div className="space-y-3 mt-4">
                  <div className="flex items-center gap-2 bg-gray-100 p-2 rounded border border-gray-200">
                    <img src={config.logo} alt="Logo Preview" className="h-8 w-auto object-contain" />
                    <button 
                      onClick={() => setConfig({ ...config, logo: null })}
                      className="ml-auto text-xs text-red-500 hover:underline font-medium"
                    >
                      Remove
                    </button>
                  </div>
                  
                  {config.showLogo && (
                    <>
                      <SliderControl 
                        label="Logo Size" 
                        icon={Maximize} 
                        value={config.logoSize} 
                        onChange={(v) => setConfig({ ...config, logoSize: v })}
                        min={20} max={200}
                      />
                      <SliderControl 
                        label="Logo Opacity" 
                        icon={Sun} 
                        value={config.logoOpacity} 
                        onChange={(v) => setConfig({ ...config, logoOpacity: v })}
                        min={0} max={100}
                      />
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200 shrink-0 bg-gray-50">
         <button 
          onClick={onExport}
          disabled={isExporting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
         >
           {isExporting ? <Loader className="animate-spin" size={18} /> : <Download size={18} />}
           {isExporting ? 'Generating...' : 'Export Graphic'}
         </button>
      </div>
    </div>
  );
}
