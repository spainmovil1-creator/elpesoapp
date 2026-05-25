import React, { useState } from "react";
import { signalsIntro, signalsData, signalsOutro } from "./signalsData";
import { Menu, ChevronRight } from "lucide-react";

export function SignalsTab() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const scrollToSignal = (id: string) => {
    setIsNavOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 10);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 md:px-8">
      {/* Intro Section */}
      <section className="mb-16 text-center max-w-2xl mx-auto">
        <h1 className="font-serif text-3xl md:text-5xl font-bold mt-2 text-slate-900 leading-tight mb-8">
          {signalsIntro.title}
        </h1>
        <div className="text-slate-600 text-lg leading-relaxed space-y-6 text-left bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="space-y-4">
            {signalsIntro.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <ul className="list-none space-y-3 pl-2 border-l-2 border-indigo-200">
            {signalsIntro.list.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-indigo-400 font-bold mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="pt-4 space-y-4 font-medium text-slate-700">
            {signalsIntro.closing.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Menú de Navegación Sticky Superior */}
      <div className="sticky top-4 md:top-8 z-40 mb-12">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-200">
          <button 
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="w-full flex items-center justify-between font-bold text-slate-800 text-lg md:text-xl"
          >
            <span className="flex items-center gap-3">
              <Menu className="w-5 h-5 text-indigo-600" />
              Índice de Señales
            </span>
            <ChevronRight className={`w-5 h-5 transition-transform ${isNavOpen ? 'rotate-90' : ''}`} />
          </button>
          
          <div className={`${isNavOpen ? 'block mt-6' : 'hidden'}`}>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 border-t border-slate-100 pt-4">
              {signalsData.map((signal) => (
                <li key={signal.id}>
                  <button
                    onClick={() => scrollToSignal(`signal-${signal.id}`)}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm md:text-base font-medium text-slate-600 hover:text-indigo-700 hover:bg-indigo-50 transition-colors flex items-center justify-between group"
                  >
                    <span><span className="font-bold mr-2 text-indigo-500">{signal.id}.</span> {signal.title}</span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500 shrink-0" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Signals Grid */}
      <div className="space-y-12">
        {signalsData.map((signal) => (
          <article 
            id={`signal-${signal.id}`}
            key={signal.id} 
            className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-neutral-200 relative overflow-hidden group hover:shadow-md transition-shadow scroll-m-24"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500/80 group-hover:bg-indigo-500 transition-colors"></div>
            
            <div className="mb-8 border-b border-slate-100 pb-6">
              <span className="text-indigo-500 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
                Señal {signal.id}
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 leading-tight">
                {signal.title}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-4">Lo que normalmente hay detrás</h3>
                  <div className="text-slate-700 space-y-3">
                    {signal.detras.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                    {signal.detrasList && (
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600">
                        {signal.detrasList.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}
                    {signal.detrasClosing && (
                      <p className="mt-3">{signal.detrasClosing}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-4">Cómo suele aparecer</h3>
                  <ul className="space-y-3">
                    {signal.como.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <span className="text-indigo-400 mt-1">✓</span>
                        <span className="text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-4">Lo que termina generando</h3>
                  <div className="text-slate-700 space-y-2 bg-rose-50/50 p-4 rounded-xl border border-rose-100">
                    {signal.generando.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 bg-slate-900 rounded-2xl p-8 text-center border border-slate-800 shadow-xl">
              <div className="max-w-2xl mx-auto space-y-2">
                {signal.quote.map((line, i) => (
                  <p key={i} className={`text-xl md:text-2xl font-serif italic ${i === signal.quote.length - 1 ? "text-indigo-300 font-bold" : "text-white"}`}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Outro Section */}
      <section className="mt-20 mb-12 text-center bg-indigo-900 rounded-[2.5rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
         <div className="relative z-10 max-w-2xl mx-auto space-y-6 text-lg md:text-xl font-light text-indigo-100">
           {signalsOutro.map((p, i) => (
             <p key={i} className={i >= signalsOutro.length - 2 ? "font-serif text-2xl text-white font-bold italic" : ""}>
               {p}
             </p>
           ))}
         </div>
      </section>
    </div>
  );
}
