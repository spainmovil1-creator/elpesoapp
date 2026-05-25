import React, { useState, useEffect } from "react";
import { workbookIntro, workbookData } from "./workbookData";
import { Menu, ChevronRight, PenLine, Save } from "lucide-react";

export function WorkbookTab() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem("workbookAnswers");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    localStorage.setItem("workbookAnswers", JSON.stringify(answers));
  }, [answers]);

  const handleChange = (id: number, val: string) => {
    setAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const handleSave = () => {
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  const scrollToExercise = (id: string) => {
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
          {workbookIntro.title}
        </h1>
        <div className="text-slate-600 text-lg leading-relaxed space-y-4 text-left bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          {workbookIntro.paragraphs.map((p, i) => (
            <p key={i} className="font-medium">{p}</p>
          ))}
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
              Índice de Ejercicios
            </span>
            <ChevronRight className={`w-5 h-5 transition-transform ${isNavOpen ? 'rotate-90' : ''}`} />
          </button>
          
          <div className={`${isNavOpen ? 'block mt-6' : 'hidden'}`}>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 border-t border-slate-100 pt-4">
              {workbookData.map((exercise) => (
                <li key={exercise.id}>
                  <button
                    onClick={() => scrollToExercise(`exercise-${exercise.id}`)}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm md:text-base font-medium text-slate-600 hover:text-indigo-700 hover:bg-indigo-50 transition-colors flex items-center justify-between group"
                  >
                    <span><span className="font-bold mr-2 text-indigo-500">Ejercicio {exercise.id}</span></span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500 shrink-0" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Exercises Layout */}
      <div className="space-y-16">
        {workbookData.map((exercise) => (
          <article 
            id={`exercise-${exercise.id}`}
            key={exercise.id} 
            className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-neutral-200 relative overflow-hidden group hover:shadow-md transition-shadow scroll-m-24"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-slate-300 group-hover:bg-indigo-500 transition-colors"></div>
            
            <div className="mb-10 border-b border-slate-100 pb-8">
              <span className="text-indigo-500 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
                Ejercicio {exercise.id}
              </span>
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-slate-900 leading-tight">
                {exercise.title}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left Column: Context (Intro) */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-4">Introducción</h3>
                  <div className="text-slate-700 space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    {exercise.intro.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                    {exercise.intro.list && (
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600">
                        {exercise.intro.list.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}
                    {exercise.intro.closing && (
                      <p className="mt-3 whitespace-pre-line">{exercise.intro.closing}</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-4">Lo que quizá empieces a notar</h3>
                  <div className="text-slate-700 space-y-2">
                    {exercise.notar.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-4">Por qué esto importa</h3>
                  <div className="text-slate-700 space-y-2">
                    {exercise.importa.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-4">Qué hacer ahora</h3>
                  <div className="text-slate-700 space-y-2 bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                    {exercise.hacer.map((p, i) => (
                      <p key={i} className={i === 0 ? "font-bold text-indigo-900" : ""}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Right Column: Interaction (Exercise Textbox) */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="mb-6">
                   <h3 className="text-xs uppercase tracking-widest font-bold text-indigo-500 mb-4 flex items-center gap-2">
                     <PenLine className="w-4 h-4" /> Instrucciones del ejercicio
                   </h3>
                   <div className="text-slate-700 space-y-3 font-medium">
                     {exercise.exercise.paragraphs.map((p, i) => (
                       <p key={i}>{p}</p>
                     ))}
                     {exercise.exercise.list && (
                       <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
                         {exercise.exercise.list.map((item, i) => (
                           <li key={i} className="flex items-start gap-2">
                             <span className="text-indigo-400 mt-0.5">•</span>
                             <span>{item}</span>
                           </li>
                         ))}
                       </ul>
                     )}
                   </div>
                </div>

                <div className="flex-1 min-h-[300px] relative">
                  <textarea
                    value={answers[exercise.id] || ""}
                    onChange={(e) => handleChange(exercise.id, e.target.value)}
                    placeholder="Escribe aquí..."
                    className="w-full h-full min-h-[300px] border border-slate-200 rounded-2xl p-6 text-base md:text-lg resize-y focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none bg-slate-50/50 relative z-10 leading-relaxed text-slate-800 placeholder-slate-400"
                  />
                  <div className="absolute top-4 right-4 pointer-events-none opacity-10">
                    <PenLine className="w-12 h-12" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 bg-slate-900 rounded-2xl p-8 text-center border border-slate-800 shadow-xl">
              <div className="max-w-2xl mx-auto space-y-2">
                {exercise.quote.map((line, i) => (
                  <p key={i} className={`text-xl md:text-2xl font-serif italic ${i === exercise.quote.length - 1 ? "text-indigo-300 font-bold" : "text-white"}`}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </article>
        ))}

        <div className="flex justify-center mt-12 pb-24">
          <button
            onClick={handleSave}
            className="bg-indigo-600 text-white px-8 py-5 rounded-full text-sm uppercase tracking-[0.2em] font-bold hover:bg-indigo-700 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3 min-w-[280px]"
          >
            {showSaved ? (
              <>
                <svg className="w-5 h-5 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                 </svg>
                Guardado en tu dispositivo
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Guardar mis apuntes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
