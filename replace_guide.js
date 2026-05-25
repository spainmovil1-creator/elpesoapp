const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
const startMatch = code.indexOf('function GuideTab({ onGoToWorkbook }: { onGoToWorkbook: () => void }) {');
const endMatch = code.indexOf('function AudiosTab() {');
if (startMatch !== -1 && endMatch !== -1) {
    const before = code.slice(0, startMatch);
    const after = code.slice(endMatch);
    const newContent = `function GuideTab({ onGoToWorkbook }: { onGoToWorkbook: () => void }) {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-16 mb-16 text-slate-50 relative overflow-hidden shadow-2xl border border-slate-800 text-center">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-indigo-500/20 to-purple-500/10 rounded-full blur-[120px] pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="relative z-10">
          <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-8 leading-[1.1] tracking-tight">
            El mapa de la carga invisible
          </h1>
          <div className="w-24 h-px bg-slate-700 mx-auto mb-8"></div>
          <div className="text-lg md:text-xl text-slate-300 font-light max-w-2xl mx-auto space-y-6 leading-relaxed">
            <p>Si has llegado hasta aquí, probablemente llevas demasiado tiempo funcionando.</p>
            <p>Funcionando para tu trabajo. Funcionando para tu familia. Funcionando para los problemas de los demás. Funcionando incluso cuando ya no puedes más.</p>
            <p>Y el problema de vivir así durante años… es que llega un momento en el que el agotamiento deja de parecerte extraño. Empieza a parecerte normal.</p>
            <p>Este libro no está escrito para enseñarte a ser más fuerte. Probablemente ya llevas demasiado tiempo siéndolo. Está escrito para ayudarte a entender por qué tu mente nunca descansa realmente.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] px-8 md:px-16 py-16 md:py-20 shadow-sm border border-neutral-200 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto space-y-16">
          
          <div className="text-center text-lg text-neutral-600 leading-relaxed font-serif">
            <p className="mb-6">Durante años has aprendido a:</p>
            <ul className="text-left max-w-sm mx-auto space-y-2 mb-8 bg-neutral-50 px-8 py-6 rounded-3xl border border-neutral-100">
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> anticipar,</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> resolver,</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> sostener,</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> organizar,</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> y contener emocionalmente a los demás.</li>
            </ul>
            <p>El problema es que tu mente nunca recibió permiso para dejar de hacerlo.</p>
            <p className="mt-8">Por eso incluso cuando descansas…<br/><span className="font-bold text-neutral-900">no sientes descanso.</span></p>
            <p className="mt-8 italic text-neutral-500 text-base">Este mapa no está diseñado para darte más tareas.<br/>Está diseñado para ayudarte a entender qué mantiene tu cabeza permanentemente en alerta.</p>
          </div>

          <div className="w-32 h-px bg-neutral-200 mx-auto my-16"></div>

          {/* Frases martillo */}
          <div className="space-y-12">
            <div className="bg-indigo-50/50 p-8 md:p-12 rounded-3xl border border-indigo-100 text-center transform transition-transform hover:scale-[1.02]">
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-indigo-900 leading-tight">
                Tu cuerpo se sienta.<br/>Tu mente no.
              </h3>
            </div>

            <div className="bg-neutral-50 p-8 md:p-12 rounded-3xl border border-neutral-200 text-center transform transition-transform hover:scale-[1.02]">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-neutral-800 leading-tight max-w-lg mx-auto">
                Hay mujeres tan acostumbradas a sostenerlo todo…<br/>
                <span className="text-neutral-500 block mt-2 font-normal">que ya no saben cómo parar.</span>
              </h3>
            </div>
            
            <div className="bg-rose-50/50 p-8 md:p-12 rounded-3xl border border-rose-100 text-center transform transition-transform hover:scale-[1.02]">
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-rose-900 leading-tight">
                El agotamiento invisible<br/>también rompe.
              </h3>
            </div>

            <div className="bg-slate-900 p-8 md:p-12 rounded-3xl border border-slate-800 text-center transform transition-transform hover:scale-[1.02]">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-100 leading-tight">
                Tu valor no debería depender de cuánto soportas.
              </h3>
            </div>

            <div className="bg-amber-50/50 p-8 md:p-12 rounded-3xl border border-amber-100 text-center transform transition-transform hover:scale-[1.02]">
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-amber-900 leading-tight">
                No era fortaleza.<br/>
                <span className="text-amber-700/80 font-normal italic block mt-2">Era supervivencia.</span>
              </h3>
            </div>
            
            <div className="bg-indigo-900 p-8 md:p-12 rounded-3xl border border-indigo-800 text-center transform transition-transform hover:scale-[1.02]">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-indigo-50 leading-tight max-w-lg mx-auto">
                El problema no es que hagas demasiado.<br/>
                <span className="text-indigo-300 font-light block mt-4">Es que nunca puedes dejar de pensar en ello.</span>
              </h3>
            </div>
          </div>
          
          <div className="mt-20 pt-16 border-t border-neutral-100 text-center">
             <button onClick={onGoToWorkbook} className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 mx-auto">
               Ir a la zona de descarga mental
               <ChevronRight className="w-5 h-5" />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Audios Tab ---
`;
    fs.writeFileSync('src/App.tsx', before + newContent + after.slice('function AudiosTab() {'.length));
    console.log('Success');
} else {
    console.log('Match not found');
}
