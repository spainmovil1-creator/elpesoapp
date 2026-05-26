import React, { useState, useRef, useEffect } from "react";
import mentalLoadImg from "./assets/images/mental_load_illustration_1779094609209.png";
import mentalLoadCover from "./assets/images/mental_load_cover_1779545781195.png";
import {
  Home,
  ClipboardList,
  BookOpen,
  Headphones,
  CheckSquare,
  ListChecks,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  RefreshCcw,
  Menu,
  X,
  Layers,
  Edit3,
  Share2,
  Printer,
  CheckCircle2,
  Moon,
  Sun,
  Lock,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SignalsTab } from "./SignalsTab";

const PinterestIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0a12 12 0 0 0-4.37 23.17c-.07-.85-.13-2.14.03-3.07.14-.84.93-3.95.93-3.95s-.24-.48-.24-1.18c0-1.1.64-1.93 1.44-1.93.68 0 1.01.5 1.01 1.1 0 .68-.43 1.7-.65 2.65-.18.8.4 1.45 1.18 1.45 1.42 0 2.51-1.49 2.51-3.66 0-1.92-1.38-3.26-3.34-3.26-2.27 0-3.6 1.7-3.6 3.46 0 .68.26 1.41.59 1.8.06.07.07.14.05.21l-.19.8c-.02.1-.09.12-.17.08-1.22-.57-1.98-2.35-1.98-3.79 0-3.08 2.24-5.91 6.46-5.91 3.4 0 6.04 2.42 6.04 5.65 0 3.37-2.12 6.09-5.07 6.09-1 0-1.93-.52-2.25-1.13l-.61 2.33c-.22.84-.82 1.89-1.22 2.53A12 12 0 1 0 12 0z"/>
  </svg>
);

type Tab =
  | "home"
  | "test"
  | "cards"
  | "guide"
  | "audios"
  | "workbook"
  | "checklist"
  | "checkout";

const UNLOCK_PASSWORD = "cargacero2024";
const HOTMART_URL = "https://landingelpeso.pages.dev/";

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    try {
      return localStorage.getItem("protocolUnlocked_prod") === "true";
    } catch {
      return false;
    }
  });
  const [activeTab, setActiveTab] = useState<Tab>(() => {
    try {
      return localStorage.getItem("protocolUnlocked_prod") === "true"
        ? "guide"
        : "home";
    } catch {
      return "home";
    }
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasEmail, setHasEmail] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const navigateTo = (tab: Tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const mainContainer = document.getElementById("main-scroll-container");
      if (mainContainer) {
        mainContainer.scrollTo({ top: 0, behavior: "auto" });
      } else {
        window.scrollTo(0, 0);
      }
    }, 10);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans flex transition-colors duration-300 overflow-hidden">
      {/* Mobile Header & Menu */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-neutral-200 z-50 flex items-center justify-between px-4 transition-colors duration-300">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-serif italic text-sm shadow-sm border border-indigo-700">
            EV
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm leading-tight tracking-tight text-slate-900">
              El Peso que no se Ve
            </span>
            <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium">
              Dra. Elena Vargas
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 text-neutral-600 hover:text-indigo-600 transition-colors"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-neutral-600 hover:text-indigo-600 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed top-16 left-0 right-0 bg-white border-b border-neutral-200 shadow-xl z-40 flex flex-col p-4 gap-2 transition-colors duration-300"
          >
            <NavLinks
              activeTab={activeTab}
              navigateTo={navigateTo}
              isUnlocked={isUnlocked}
              hasEmail={hasEmail}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 shrink-0 bg-white border-r border-neutral-200 flex-col h-screen sticky top-0 transition-colors duration-300">
        <div className="h-20 flex items-center justify-between px-8 border-b border-neutral-100">
          <div className="font-bold tracking-tight text-slate-900 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-serif italic text-lg shrink-0">
              PV
            </div>
            El Peso que no se Ve
          </div>
        </div>
        <div className="flex flex-col gap-2 p-4 flex-1 overflow-y-auto">
          <NavLinks
            activeTab={activeTab}
            navigateTo={navigateTo}
            isUnlocked={isUnlocked}
            hasEmail={hasEmail}
          />
        </div>
        <div className="p-4 border-t border-neutral-100 flex flex-col items-center justify-center gap-4 shrink-0">
          <div className="flex items-center justify-center w-full gap-2">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900 transition-colors w-full justify-center"
            >
              {isDarkMode ? (
                <Sun className="w-3.5 h-3.5" />
              ) : (
                <Moon className="w-3.5 h-3.5" />
              )}
              {isDarkMode ? "Modo Claro" : "Modo Oscuro"}
            </button>
          </div>
          <div className="text-xs text-neutral-400 text-center flex flex-col gap-1 w-full">
            <span className="font-medium text-neutral-500">
              Dra. Elena Vargas
            </span>
            <span>Versión {isUnlocked ? "Premium" : "Básica"}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        id="main-scroll-container"
        className="flex-1 h-screen overflow-y-auto flex flex-col pt-16 md:pt-0 bg-neutral-50/50 relative transition-colors duration-300"
      >
        <div className="hidden lg:flex absolute top-6 right-8 items-center gap-3 z-10">
          <div className="text-right">
            <span className="block text-sm font-bold text-neutral-800 leading-none mb-1">
              Dra. Elena Vargas
            </span>
            <span className="block text-xs text-neutral-500 font-medium">
              Autora & Especialista
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-serif italic text-lg shadow-md border-2 border-slate-50">
            EV
          </div>
        </div>
        <div className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8 lg:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {activeTab === "home" && (
                <HomeTab
                  onStart={() => navigateTo("test")}
                  onSuccess={() => {
                    setIsUnlocked(true);
                    localStorage.setItem("protocolUnlocked_prod", "true");
                    navigateTo("guide");
                  }}
                />
              )}
              {activeTab === "test" && (
                <TestTab
                  onUnlock={() => navigateTo("checkout")}
                  onSuccess={() => {
                    setIsUnlocked(true);
                    localStorage.setItem("protocolUnlocked_prod", "true");
                    navigateTo("guide");
                  }}
                  isUnlocked={isUnlocked}
                  hasEmail={hasEmail}
                  setHasEmail={(val) => {
                    setHasEmail(val);
                  }}
                  onGoToGuide={() => navigateTo("guide")}
                />
              )}
              {activeTab === "cards" && <CardsTab />}
              {activeTab === "guide" && (
                <GuideTab onGoToWorkbook={() => navigateTo("workbook")} />
              )}
              {activeTab === "checklist" && <SignalsTab />}
              {activeTab === "workbook" && <WorkbookTab />}
              {activeTab === "audios" && <AudiosTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// --- Navigation Component ---
function NavLinks({
  activeTab,
  navigateTo,
  isUnlocked,
  hasEmail,
}: {
  activeTab: Tab;
  navigateTo: (tab: Tab) => void;
  isUnlocked: boolean;
  hasEmail: boolean;
}) {
  const links = [
    { id: "home", label: "Bienvenida", icon: Home, premium: false },
    { id: "test", label: "Diagnóstico", icon: ClipboardList, premium: false },
    { id: "guide", label: "El Mapa", icon: BookOpen, premium: true },
    { id: "cards", label: "La parte que nadie ve", icon: Layers, premium: true },
    { id: "checklist", label: "Señales", icon: ListChecks, premium: true },
    { id: "workbook", label: "Descarga mental", icon: Edit3, premium: true },
    { id: "audios", label: "Silencio mental", icon: Headphones, premium: true },
  ] as const;

  const visibleLinks = links.filter((l) => !l.premium || isUnlocked);

  return (
    <>
      <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 px-4 mt-4">
        Tu Programa
      </div>
      {visibleLinks.map((link) => {
        const Icon = link.icon;
        const isActive = activeTab === link.id;
        const isLocked = link.premium && !isUnlocked;

        return (
          <button
            key={link.id}
            onClick={() => {
              if (isLocked) {
                navigateTo("test");
              } else {
                navigateTo(link.id);
              }
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm w-full text-left ${
              isActive
                ? "bg-indigo-50 text-indigo-700 shadow-sm"
                : isLocked
                  ? "text-neutral-400 opacity-70 hover:bg-neutral-50"
                  : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
            }`}
          >
            <Icon
              className={`w-5 h-5 ${
                isActive
                  ? "text-indigo-600"
                  : isLocked
                    ? "text-neutral-300"
                    : "text-neutral-400"
              }`}
            />
            <span className="flex-1">{link.label}</span>
            {isLocked && <Lock className="w-4 h-4 text-neutral-300" />}
          </button>
        );
      })}
    </>
  );
}

// --- Home Tab ---
function HomeTab({
  onStart,
  onSuccess,
}: {
  onStart: () => void;
  onSuccess: () => void;
}) {
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerifyPassword = () => {
    if (!passwordInput.trim()) return;
    setIsVerifying(true);
    setPasswordError(false);
    setTimeout(() => {
      if (
        passwordInput.trim().toLowerCase() === UNLOCK_PASSWORD.toLowerCase()
      ) {
        onSuccess();
      } else {
        setPasswordError(true);
        setIsVerifying(false);
      }
    }, 800);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="bg-indigo-900 rounded-[2.5rem] text-white shadow-2xl overflow-hidden relative border border-indigo-800/50">
        {/* Banner Image */}
        <div className="w-full h-64 md:h-80 relative">
          <img
            src={mentalLoadImg}
            alt="Ilustración de la Carga Mental"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/40 to-indigo-900"></div>
        </div>

        <div className="px-8 pb-12 md:px-12 md:pb-14 relative z-10 mt-[-3rem]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-30 -mr-20 -mt-20 pointer-events-none"></div>

          <div className="relative z-10 mb-4 flex justify-start">
            <span className="inline-block py-1.5 px-4 bg-indigo-800/80 backdrop-blur-sm text-indigo-100 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-full border border-indigo-700/50 shadow-sm">
              Bienvenida a la Consulta
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight relative z-10 text-white max-w-2xl drop-shadow-sm">
            Hay un tipo de cansancio que no desaparece durmiendo.
          </h1>

          <div className="text-indigo-100 text-lg md:text-xl mb-10 max-w-xl relative z-10 leading-relaxed font-light drop-shadow-sm space-y-4">
            <p>
              El que aparece cuando tu mente lleva demasiado tiempo sosteniendo,
              anticipando y resolviendo cosas para todo el mundo.
            </p>
            <p>
              Puede que desde fuera tu vida parezca normal. Pero por dentro
              llevas años funcionando en estado de alerta.
            </p>
            <p>
              Esta experiencia no está diseñada para motivarte. Está diseñada
              para ayudarte a entender por qué nunca consigues descansar del
              todo.
            </p>
          </div>

          {!showPasswordInput ? (
            <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 group">
              <button
                onClick={onStart}
                className="w-full sm:w-auto bg-white text-indigo-900 px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-base md:text-lg shadow-xl hover:shadow-2xl hover:bg-neutral-50 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3"
              >
                Empezar
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setShowPasswordInput(true)}
                className="text-sm font-medium text-indigo-200 hover:text-white transition-colors underline underline-offset-4 mt-2 sm:mt-0"
              >
                Tengo una clave de acceso
              </button>
            </div>
          ) : (
            <div className="mt-6 max-w-sm relative z-10 text-left bg-indigo-950/60 p-6 rounded-2xl border border-indigo-800/60 backdrop-blur-sm">
              <label className="block text-sm font-bold text-indigo-100 mb-2">
                Introduzca la clave
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setPasswordError(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleVerifyPassword();
                }}
                className={`w-full p-3 rounded-xl border mb-3 focus:outline-none transition-colors ${
                  passwordError
                    ? "border-red-400/50 focus:border-red-400 bg-red-900/20 text-red-100"
                    : "border-indigo-700 focus:border-indigo-400 bg-indigo-900/50 text-white"
                }`}
                autoFocus
              />
              <button
                onClick={handleVerifyPassword}
                disabled={isVerifying || !passwordInput.trim()}
                className="w-full bg-indigo-500 text-white font-bold py-3 rounded-xl hover:bg-indigo-400 transition disabled:bg-indigo-800 disabled:text-indigo-400 disabled:cursor-not-allowed flex justify-center items-center gap-2 text-sm"
              >
                {isVerifying ? "Verificando..." : "Desbloquear"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- TestTab Data ---
const testQuestions = [
  {
    id: "q1",
    text: "Cuando por fin tienes un momento libre… ¿tu cabeza sigue repasando cosas pendientes?",
    options: ["Constantemente", "Muy a menudo", "Algunas veces", "Casi nunca"],
  },
  {
    id: "q2",
    text: "¿Sientes que si tú no estás pendiente, muchas cosas dejan de funcionar?",
    options: [
      "Todo depende de mí",
      "Demasiadas cosas",
      "Algunas cosas",
      "Muy pocas",
    ],
  },
  {
    id: "q3",
    text: "¿Te cuesta descansar sin sentir culpa?",
    options: ["Sí, muchísimo", "Bastante", "A veces", "No realmente"],
  },
  {
    id: "q4",
    text: "¿Tu mente sigue activa incluso en momentos tranquilos?",
    options: [
      "Nunca se detiene",
      "Cuesta mucho apagarla",
      "A veces ocurre",
      "Normalmente consigo desconectar",
    ],
  },
  {
    id: "q5",
    text: "¿Sientes que llevas demasiado tiempo sosteniendo emocionalmente a los demás?",
    options: ["Sí", "Bastante", "Algunas veces", "No"],
  },
  {
    id: "q6",
    text: "¿Hace cuánto que no sientes descanso mental real?",
    options: [
      "No lo recuerdo",
      "Meses",
      "Algunas semanas",
      "Descanso con normalidad",
    ],
  },
];

function TestTab({
  onUnlock,
  onSuccess,
  isUnlocked,
  hasEmail,
  setHasEmail,
  onGoToGuide,
}: {
  onUnlock: () => void;
  onSuccess?: () => void;
  isUnlocked: boolean;
  hasEmail?: boolean;
  setHasEmail?: (val: boolean) => void;
  onGoToGuide?: () => void;
}) {
  const [answers, setAnswers] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem("testAnswers");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [isTestComplete, setIsTestComplete] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const [showOffer, setShowOffer] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerifyPassword = () => {
    if (!passwordInput.trim()) return;
    setIsVerifying(true);
    setPasswordError(false);
    setTimeout(() => {
      if (
        passwordInput.trim().toLowerCase() === UNLOCK_PASSWORD.toLowerCase()
      ) {
        if (onSuccess) onSuccess();
      } else {
        setPasswordError(true);
        setIsVerifying(false);
      }
    }, 800);
  };

  useEffect(() => {
    localStorage.setItem("testAnswers", JSON.stringify(answers));
  }, [answers]);

  const selectAnswer = (qId: string, optIndex: number) => {
    setAnswers((prev) => {
      if (prev[qId] === optIndex) {
        const next = { ...prev };
        delete next[qId];
        return next;
      }
      return { ...prev, [qId]: optIndex };
    });
  };

  const allAnswered = testQuestions.every((q) => answers[q.id] !== undefined);

  const calculateScore = () => {
    let total = 0;
    for (const qId in answers) {
      const val = answers[qId];
      if (val === 0) total += 4;
      else if (val === 1) total += 3;
      else if (val === 2) total += 2;
      else if (val === 3) total += 1;
    }
    return total;
  };

  const getDiagnosis = () => {
    const score = calculateScore();
    if (score >= 21) {
      return {
        title: "Has sostenido demasiado durante demasiado tiempo.",
        cta: "Necesito empezar a soltar esta carga",
        text: (
          <>
            <p>
              Tu resultado indica un nivel muy alto de sobrecarga emocional y
              saturación cognitiva sostenida.
            </p>
            <p>
              Tu mente probablemente lleva años funcionando como sistema de
              soporte invisible para todo lo que ocurre a tu alrededor.
            </p>
            <p>
              Cuando una persona vive demasiado tiempo así, deja de existir una
              diferencia clara entre:
            </p>
            <ul className="list-disc list-inside ml-2 space-y-2 mt-4 mb-4 text-indigo-50/80">
              <li>descanso y vigilancia,</li>
              <li>responsabilidad y agotamiento,</li>
              <li>fortaleza y supervivencia.</li>
            </ul>
            <p className="mt-4">Es posible que:</p>
            <ul className="list-disc list-inside ml-2 space-y-2 mt-4 mb-4 text-indigo-50/80">
              <li>sientas que nunca puedes bajar la guardia,</li>
              <li>vivas mentalmente pendiente de todo,</li>
              <li>tengas dificultades para sentir calma real,</li>
              <li>
                o hayas normalizado un nivel de agotamiento que en realidad ya
                no es sostenible.
              </li>
            </ul>
            <p className="mt-4">
              Y lo más peligroso de este estado es que muchas veces desde fuera
              nadie lo nota. Porque sigues funcionando. Pero funcionar no
              significa estar bien.
            </p>
          </>
        ),
      };
    } else if (score >= 16) {
      return {
        title:
          "Tu mente lleva demasiado tiempo sobreviviendo en modo vigilancia.",
        cta: "Empezar a salir del estado de alerta constante",
        text: (
          <>
            <p>
              Tu resultado refleja un nivel elevado de carga mental invisible.
            </p>
            <p>
              Es probable que hayas pasado tanto tiempo sosteniendo necesidades,
              problemas y responsabilidades ajenas… que tu cerebro ya no sabe
              cómo salir completamente del estado de alerta.
            </p>
            <p className="mt-4">Incluso en momentos tranquilos:</p>
            <ul className="list-disc list-inside ml-2 space-y-2 mt-4 mb-4 text-indigo-50/80">
              <li>tu cabeza sigue funcionando,</li>
              <li>anticipando,</li>
              <li>organizando,</li>
              <li>resolviendo,</li>
              <li>o preparándose para lo siguiente.</li>
            </ul>
            <p className="mt-4">
              Y cuando esto se mantiene durante demasiado tiempo, ocurre algo
              importante: el agotamiento deja de sentirse excepcional. Empieza a
              convertirse en identidad.
            </p>
            <p className="mt-4">
              Muchas personas en este punto ya no saben diferenciar entre:
            </p>
            <ul className="list-disc list-inside ml-2 space-y-2 mt-4 mb-4 text-indigo-50/80">
              <li>responsabilidad,</li>
              <li>hipercontrol,</li>
              <li>supervivencia emocional,</li>
              <li>y miedo constante a que todo se desborde.</li>
            </ul>
          </>
        ),
      };
    } else if (score >= 11) {
      return {
        title:
          "Llevas demasiado tiempo funcionando sin verdadero descanso mental.",
        cta: "Entender por qué nunca consigo desconectar del todo",
        text: (
          <>
            <p>Tu resultado muestra un patrón claro de saturación funcional.</p>
            <p>
              Probablemente llevas mucho tiempo resolviendo, anticipando y
              sosteniendo responsabilidades sin darte cuenta de cuánto espacio
              mental ocupan realmente.
            </p>
            <p>
              Desde fuera puede parecer que todo funciona. Pero internamente tu
              mente rara vez deja de estar activa.
            </p>
            <p className="mt-4">Es posible que:</p>
            <ul className="list-disc list-inside ml-2 space-y-2 mt-4 mb-4 text-indigo-50/80">
              <li>descanses sin sentir alivio real,</li>
              <li>te cueste delegar,</li>
              <li>sientas culpa al parar,</li>
              <li>
                o vivas con la sensación constante de que algo depende de ti.
              </li>
            </ul>
            <p className="mt-4">
              El problema no es únicamente el cansancio. Es que poco a poco el
              estado de alerta empieza a sentirse normal.
            </p>
          </>
        ),
      };
    } else {
      return {
        title: "Tu mente todavía conserva espacios de descanso.",
        cta: "Comprender lo que mi mente empieza a sostener",
        text: (
          <>
            <p>
              Aunque existen señales de sobrecarga emocional, tu mente todavía
              consigue alternar momentos de tensión con espacios relativamente
              funcionales de descanso y desconexión.
            </p>
            <p>
              Eso no significa que no estés sosteniendo cosas. Significa que, de
              momento, tu sistema mental todavía conserva cierta capacidad de
              recuperación.
            </p>
            <p className="mt-4">
              Aun así, algunas dinámicas empiezan a aparecer:
            </p>
            <ul className="list-disc list-inside ml-2 space-y-2 mt-4 mb-4 text-indigo-50/80">
              <li>anticipación constante,</li>
              <li>sensación de responsabilidad excesiva,</li>
              <li>dificultad para desconectar completamente,</li>
              <li>y cansancio mental acumulativo.</li>
            </ul>
            <p className="mt-4">
              Este es el momento ideal para intervenir antes de que el estado de
              alerta se convierta en tu forma habitual de vivir.
            </p>
          </>
        ),
      };
    }
  };

  const diagnosis = getDiagnosis();

  if (showOffer) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 relative text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 mb-6 leading-tight">
          Ya has reconocido el peso.
        </h2>
        <p className="text-lg text-neutral-600 mb-8 max-w-xl mx-auto leading-relaxed">
          Ahora necesitas entender por qué llevas tanto tiempo sobreviviendo
          emocionalmente en automático.
        </p>

        <div className="bg-white border border-neutral-200 rounded-3xl p-8 md:p-10 mb-10 shadow-sm text-left mx-auto max-w-lg">
          <p className="font-bold text-neutral-900 mb-6 text-lg">
            La experiencia completa de La Consulta incluye:
          </p>
          <ul className="space-y-4 text-neutral-700">
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>{" "}
              el recorrido guiado completo,
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>{" "}
              audios de regulación emocional,
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>{" "}
              ejercicios de descarga mental,
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>{" "}
              espacios de reflexión íntima,
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>{" "}
              y herramientas para empezar a salir del estado de alerta
              constante.
            </li>
          </ul>
        </div>

        <a
          href="https://continuar.elpeso.elenavargas.group/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-indigo-600 text-white font-bold py-4 px-10 rounded-full shadow-xl hover:bg-indigo-700 hover:-translate-y-1 transition-all mb-16 text-lg"
        >
          Entrar en La Consulta completa
        </a>

        <div className="w-24 h-px bg-neutral-200 mx-auto mb-16"></div>

        <div className="max-w-xl mx-auto mb-10 space-y-6 text-lg text-neutral-700 leading-relaxed font-serif italic">
          <p>Hay un momento en el que sostenerlo todo deja de ser fortaleza.</p>
          <p>
            Y empieza a convertirse en una forma silenciosa de desaparecer de tu
            propia vida.
          </p>
          <p>Quizá por eso has llegado hasta aquí.</p>
          <p>
            Y quizá también por eso ya es momento de dejar de vivir
            permanentemente en modo supervivencia.
          </p>
        </div>

        <a
          href="https://continuar.elpeso.elenavargas.group/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-slate-900 text-white font-bold py-4 px-10 rounded-full shadow-xl hover:bg-slate-800 hover:-translate-y-1 transition-all mb-12"
        >
          Empezar a salir de este estado
        </a>

        <div className="mt-8 border-t border-neutral-200 pt-8 max-w-sm mx-auto">
          {!showPasswordInput ? (
            <button
              onClick={() => setShowPasswordInput(true)}
              className="text-xs font-bold text-neutral-400 hover:text-indigo-600 uppercase tracking-widest transition-colors"
            >
              Tengo una clave de acceso
            </button>
          ) : (
            <div className="text-left bg-neutral-50 p-6 rounded-2xl border border-neutral-200 shadow-inner">
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Introduzca la clave
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setPasswordError(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleVerifyPassword();
                }}
                className={`w-full p-3 rounded-xl border mb-3 focus:outline-none transition-colors ${
                  passwordError
                    ? "border-red-300 focus:border-red-500 bg-red-50"
                    : "border-slate-300 focus:border-indigo-500 bg-white"
                }`}
                autoFocus
              />
              <button
                onClick={handleVerifyPassword}
                disabled={isVerifying || !passwordInput.trim()}
                className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition disabled:bg-neutral-300 disabled:cursor-not-allowed flex justify-center items-center gap-2 text-sm"
              >
                {isVerifying ? "Verificando..." : "Desbloquear"}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (showIntro) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4 relative">
        <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-6 md:p-10 mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 leading-tight mb-6">
            Antes de seguir, necesito que respondas con honestidad.
          </h1>
          <div className="text-neutral-600 leading-relaxed text-lg max-w-xl mx-auto space-y-6 mb-10">
            <p>No estás haciendo un test psicológico.</p>
            <p>
              Solo vamos a observar cuánto tiempo lleva tu mente funcionando
              como el sistema de soporte invisible de todos.
            </p>
            <p className="font-bold text-neutral-900 border-l-4 border-indigo-500 pl-4 text-left">
              Responde pensando en cómo vives realmente. No en cómo crees que
              deberías sentirte.
            </p>
          </div>
          <button
            onClick={() => {
              setShowIntro(false);
              setTimeout(() => {
                const mainContainer = document.getElementById("main-scroll-container");
                if (mainContainer) mainContainer.scrollTo({ top: 0, behavior: "auto" });
                else window.scrollTo(0, 0);
              }, 10);
            }}
            className="bg-indigo-600 text-white px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-base md:text-lg shadow-xl hover:shadow-2xl hover:bg-indigo-700 hover:-translate-y-1 active:translate-y-0 transition-all inline-flex items-center gap-3 relative z-10 group"
          >
            Empezar Diagnóstico
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 relative">
      {/* Questions */}
      <div className="space-y-12">
        {testQuestions.map((q, qIndex) => (
          <div key={q.id}>
            <div className="flex gap-4 mb-4">
              <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-500 font-bold flex items-center justify-center shrink-0">
                {qIndex + 1}
              </div>
              <h2 className="text-xl md:text-2xl font-serif font-bold text-neutral-900">
                {q.text}
              </h2>
            </div>

            <div className="bg-white rounded-3xl border border-neutral-200 p-2 shadow-sm space-y-2 ml-0 sm:ml-12">
              {q.options.map((opt, oIndex) => {
                const isSelected = answers[q.id] === oIndex;
                return (
                  <label
                    key={oIndex}
                    className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${
                      isSelected
                        ? "bg-indigo-50 border-transparent shadow-sm"
                        : "hover:bg-neutral-50 border border-transparent"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                        isSelected
                          ? "border-indigo-600 bg-indigo-600"
                          : "border-neutral-300"
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span
                      className={`text-[15px] transition-colors ${isSelected ? "text-indigo-900 font-medium" : "text-neutral-600"}`}
                    >
                      {opt}
                    </span>
                    <input
                      type="radio"
                      className="hidden"
                      checked={isSelected}
                      onChange={() => selectAnswer(q.id, oIndex)}
                    />
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!isTestComplete && (
        <div className="mt-16 text-center pb-20">
          <button
            disabled={!allAnswered}
            onClick={() => {
              setIsTestComplete(true);
              setTimeout(() => {
                const mainContainer = document.getElementById("main-scroll-container");
                if (mainContainer) mainContainer.scrollTo({ top: 0, behavior: "auto" });
                else window.scrollTo(0, 0);
              }, 10);
            }}
            className="bg-indigo-600 text-white font-bold py-4 px-12 rounded-full shadow-xl hover:shadow-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:transform-none disabled:cursor-not-allowed"
          >
            {allAnswered
              ? "Consultar diagnóstico"
              : "Responde una pregunta por bloque"}
          </button>
        </div>
      )}

      {/* Results Widget */}
      {isTestComplete && (
        <div className="bg-indigo-900 rounded-[2.5rem] p-8 md:p-12 text-center overflow-hidden shadow-2xl mt-16 max-w-xl mx-auto mb-20 animate-fade-in relative border border-indigo-800/50">
          <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none"></div>

          <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-8 leading-tight">
            {diagnosis.title}
          </h3>

          <div className="text-indigo-100/90 text-left mb-10 leading-relaxed font-light text-[15px]">
            {diagnosis.text}
          </div>

          <div className="bg-indigo-950/40 p-4 rounded-xl text-left border border-indigo-800/60 mb-10">
            <p className="text-sm text-indigo-200/90 font-medium font-serif italic mb-1">
              La Consulta no sustituye apoyo psicológico profesional.
            </p>
            <p className="text-xs text-indigo-300/70 leading-tight">
              Esta experiencia está diseñada como un espacio de reflexión
              emocional guiada y comprensión personal.
            </p>
          </div>

          <div className="w-16 h-px bg-indigo-700 mx-auto mb-10"></div>

          {!isUnlocked ? (
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={() => {
                  setShowOffer(true);
                  setTimeout(() => {
                    const mainContainer = document.getElementById(
                      "main-scroll-container",
                    );
                    if (mainContainer) {
                      mainContainer.scrollTo({ top: 0, behavior: "auto" });
                    } else {
                      window.scrollTo(0, 0);
                    }
                  }, 10);
                }}
                className="bg-white text-indigo-900 font-bold py-4 px-8 rounded-full shadow-xl hover:bg-neutral-50 hover:-translate-y-1 transition-all w-full md:w-auto text-base"
              >
                {diagnosis.cta}
              </button>
            </div>
          ) : (
            <button
              onClick={() => onGoToGuide && onGoToGuide()}
              className="bg-indigo-600 text-white font-bold py-4 px-10 rounded-full flex items-center justify-center gap-3 mx-auto hover:bg-indigo-500 transition-all"
            >
              Entrar en La Consulta completa
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// --- Cards Tab ---
const cardsData = [
  // SOBRECARGA MENTAL
  { sys: "sobrecarga", title: "Tarjeta 1", items: ["No estoy cansada solo por lo que hago.", "Estoy cansada de tener que pensar en todo todo el tiempo."] },
  { sys: "sobrecarga", title: "Tarjeta 2", items: ["Mi cuerpo descansa.", "Mi mente sigue organizando mañana."] },
  { sys: "sobrecarga", title: "Tarjeta 3", items: ["Hay personas que descansan.", "Y personas que usan el descanso para seguir preocupándose."] },
  { sys: "sobrecarga", title: "Tarjeta 4", items: ["El problema no es la cantidad de cosas que hago.", "El problema es que mi cabeza nunca deja de sostenerlas."] },
  { sys: "sobrecarga", title: "Tarjeta 5", items: ["Incluso en silencio…", "mi mente sigue funcionando como si algo pudiera salir mal."] },
  { sys: "sobrecarga", title: "Tarjeta 6", items: ["Llevo tanto tiempo anticipando problemas…", "que ya no sé cómo sentir calma real."] },

  // INVISIBILIDAD
  { sys: "invisibilidad", title: "Tarjeta 1", items: ["Cuanto mejor sostienes todo…", "más invisible se vuelve tu agotamiento."] },
  { sys: "invisibilidad", title: "Tarjeta 2", items: ["Hay cargas que no pesan en las manos.", "Pesan en la cabeza."] },
  { sys: "invisibilidad", title: "Tarjeta 3", items: ["A veces nadie nota mi cansancio…", "porque nunca dejo que nada se caiga."] },
  { sys: "invisibilidad", title: "Tarjeta 4", items: ["El agotamiento invisible también rompe.", "Solo que suele hacerlo en silencio."] },
  { sys: "invisibilidad", title: "Tarjeta 5", items: ["Me acostumbré tanto a funcionar agotada…", "que dejé de preguntarme cómo me sentía realmente."] },
  { sys: "invisibilidad", title: "Tarjeta 6", items: ["Lo más cansado no es hacerlo todo.", "Es sentir que no puedes dejar de hacerlo."] },

  // RELACIONES
  { sys: "relaciones", title: "Tarjeta 1", items: ["No necesito ayuda puntual.", "Necesito dejar de sentir que todo depende de mí."] },
  { sys: "relaciones", title: "Tarjeta 2", items: ["A veces no estoy enfadada.", "Estoy mentalmente saturada."] },
  { sys: "relaciones", title: "Tarjeta 3", items: ["Cuando me preguntas qué necesito…", "muchas veces ya estoy demasiado agotada para explicarlo."] },
  { sys: "relaciones", title: "Tarjeta 4", items: ["El problema no es que nadie me ayude.", "El problema es que todos asumieron que yo siempre podría con todo."] },
  { sys: "relaciones", title: "Tarjeta 5", items: ["Hay días en los que no quiero soluciones.", "Solo quiero dejar de ser el soporte emocional de todo el mundo."] },
  { sys: "relaciones", title: "Tarjeta 6", items: ["No necesito que me digas \"descansa\".", "Necesito sentir que no todo recae sobre mí."] },

  // IDENTIDAD
  { sys: "identidad", title: "Tarjeta 1", items: ["Hay mujeres tan acostumbradas a sostenerlo todo…", "que ya no saben quiénes son cuando paran."] },
  { sys: "identidad", title: "Tarjeta 2", items: ["Durante años fui necesaria para todos.", "Y poco a poco dejé de existir para mí."] },
  { sys: "identidad", title: "Tarjeta 3", items: ["No era fortaleza.", "Era supervivencia constante."] },
  { sys: "identidad", title: "Tarjeta 4", items: ["El agotamiento cambia cosas.", "Incluso la forma en la que una persona se mira a sí misma."] },
  { sys: "identidad", title: "Tarjeta 5", items: ["A veces siento que mi vida se convirtió en gestionar la vida de los demás."] },
  { sys: "identidad", title: "Tarjeta 6", items: ["El problema de vivir demasiado tiempo sosteniéndolo todo…", "es que un día ya no recuerdas cómo se siente vivir ligera."] },
];

const sysLabels: Record<string, string> = {
  sobrecarga: "Sobrecarga Mental",
  invisibilidad: "Invisibilidad",
  relaciones: "Relaciones",
  identidad: "Identidad",
};

const sysColors: Record<string, string> = {
  sobrecarga: "border-t-slate-500",
  invisibilidad: "border-t-amber-500",
  relaciones: "border-t-pink-500",
  identidad: "border-t-emerald-500",
};

function CardsTab() {
  const [flipped, setFlipped] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem("cardsFlippedConsultation");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("cardsFlippedConsultation", JSON.stringify(flipped));
  }, [flipped]);

  const toggleFlip = (index: number) => {
    setFlipped((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const shareLinks = (title: string, text: string) => {
    const appName = "El mapa de la carga invisible";
    const appUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const fullText = `"${text}"\n\n— ${sysLabels[title.split("-")[0]]} (${title})\n\nDescubre más en ${appName}: ${appUrl}`;
    const encodedText = encodeURIComponent(fullText);
    const encodedUrl = encodeURIComponent(appUrl);
    
    return {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodedText}`,
    };
  };

  return (
    <div className="py-8 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-slate-400 mb-2">
          La Consulta
        </p>
        <h1 className="text-3xl md:text-4xl font-serif italic font-bold text-slate-900">
          La parte que nadie ve
        </h1>
        <p className="text-slate-500 mt-4 max-w-xl mx-auto text-sm italic">
          "A veces, el mayor alivio es encontrar las palabras exactas para explicar
          lo que sientes que llevas sosteniendo sola tanto tiempo."
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => window.print()}
            className="bg-slate-800 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-slate-700 transition shadow-lg flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            Imprimir Mazo Completo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardsData.map((card, i) => {
          const links = shareLinks(`${card.sys}-${card.title}`, card.items.join(" "));
          const isFlipped = !!flipped[i];
          const frontText = card.items[0];
          const backText = card.items[1] || "(...)";
          
          return (
            <div
              key={i}
              className="group h-[320px] [perspective:1000px] cursor-pointer"
              onClick={() => toggleFlip(i)}
            >
              <div
                className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}
              >
                {/* Front Face */}
                <div
                  id={`card-front-${i}`}
                  className={`absolute inset-0 bg-white rounded-xl p-8 shadow-sm border border-neutral-200 border-t-4 flex flex-col justify-between hover:shadow-xl transition-all [backface-visibility:hidden] ${sysColors[card.sys]}`}
                >
                  <div className="flex-1 flex flex-col items-center text-center justify-center">
                    <span className={`text-[10px] uppercase tracking-widest font-bold mb-6 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-400`}>
                      {sysLabels[card.sys]}
                    </span>
                    <div className="space-y-4 mb-8 flex-1 flex flex-col justify-center">
                      <p className="text-xl md:text-2xl text-slate-800 font-serif italic leading-relaxed">
                        "{frontText}"
                      </p>
                    </div>
                  </div>
                  
                  <div className="border-t border-slate-100 pt-4 mt-auto">
                    <div className="flex justify-between items-center w-full">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest bg-slate-100 px-2 py-1 rounded-md">
                        Toca para girar
                      </span>
                      <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                        <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-indigo-600 transition-colors" title="Compartir en WhatsApp">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        </a>
                        <a href={links.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-indigo-600 transition-colors" title="Compartir en Twitter">
                          <Twitter className="w-4 h-4" />
                        </a>
                        <a href={links.facebook} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-indigo-600 transition-colors" title="Compartir en Facebook">
                          <Facebook className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back Face */}
                <div
                  id={`card-back-${i}`}
                  className={`absolute inset-0 bg-indigo-900 rounded-xl p-8 shadow-md border border-indigo-800 hover:shadow-xl transition-all [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-between`}
                >
                  <div className="flex-1 flex flex-col items-center text-center justify-center">
                    <span className={`text-[10px] uppercase tracking-widest font-bold mb-6 px-3 py-1 rounded-full bg-indigo-800/80 border border-indigo-700/50 text-indigo-200`}>
                      {sysLabels[card.sys]}
                    </span>
                    <div className="space-y-4 mb-8 flex-1 flex flex-col justify-center">
                      <p className="text-xl md:text-2xl text-white font-serif italic leading-relaxed">
                        "{backText}"
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-indigo-800/50 pt-4 mt-auto relative z-10" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-between items-center w-full">
                      <span className="text-[10px] font-bold text-indigo-300/50 tracking-widest uppercase">
                        {card.title}
                      </span>
                      <div className="flex items-center gap-3">
                        <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="text-indigo-300/70 hover:text-white transition-colors" title="Compartir en WhatsApp">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        </a>
                        <a href={links.twitter} target="_blank" rel="noopener noreferrer" className="text-indigo-300/70 hover:text-white transition-colors" title="Compartir en Twitter">
                          <Twitter className="w-4 h-4" />
                        </a>
                        <a href={links.facebook} target="_blank" rel="noopener noreferrer" className="text-indigo-300/70 hover:text-white transition-colors" title="Compartir en Facebook">
                          <Facebook className="w-4 h-4" />
                        </a>
                        <a href={links.pinterest} target="_blank" rel="noopener noreferrer" className="text-indigo-300/70 hover:text-white transition-colors" title="Compartir en Pinterest">
                          <PinterestIcon className="w-4 h-4" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-indigo-300/70 hover:text-white transition-colors" title="Ir a tu Instagram">
                           <Instagram className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- Guide Tab ---
function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = document.getElementById("main-scroll-container");
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const pct = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setProgress(isNaN(pct) ? 0 : Math.min(100, Math.max(0, pct)));
    };

    container.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 lg:left-64 right-0 h-1.5 bg-neutral-200 z-50">
      <motion.div
        className="h-full bg-indigo-600 rounded-r-full"
        style={{ width: `${progress}%` }}
        layout
        transition={{ ease: "linear", duration: 0 }}
      />
    </div>
  );
}

function GuideTab({ onGoToWorkbook }: { onGoToWorkbook: () => void }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  
  const navItems = [
    { id: 'cap-intro', label: 'Introducción' },
    { id: 'cap-1', label: '1. El Diagnóstico Clínico' },
    { id: 'cap-2', label: '2. El Mapa de lo Invisible' },
    { id: 'cap-3', label: '3. Cajón de Incidencias' },
    { id: 'cap-4', label: '4. Protocolo de Negociación' },
    { id: 'cap-5', label: '5. El Escudo contra la Culpa' },
    { id: 'cap-anexo', label: 'Anexo: Plan de choque' },
    { id: 'cap-frases', label: 'Frases Martillo' },
  ];

  const scrollToSection = (id: string) => {
    setIsNavOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 10);
  };

  return (
    <>
      <ScrollProgressBar />
      <div className="max-w-4xl mx-auto py-12 px-4">
        
        {/* Banner principal */}
        <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-16 mb-12 text-slate-50 relative overflow-hidden shadow-2xl border border-slate-800 text-left min-h-[500px] md:min-h-[600px] flex items-center group">
          <div className="absolute inset-0 z-0">
             <img 
                src={mentalLoadCover} 
                alt="Representación abstracta de la carga mental" 
                className="w-full h-full object-cover opacity-40 mix-blend-screen group-hover:scale-105 group-hover:opacity-50 transition-all duration-1000"
              />
             <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent z-10"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10"></div>
          </div>
          
          <div className="relative z-20 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700 w-fit mb-8 shadow-lg backdrop-blur-md">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold tracking-wider uppercase text-slate-300">Manual de Acción</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold mb-8 leading-[1.1] tracking-tight text-white drop-shadow-md">
              El mapa de la carga invisible
            </h1>
            
            <div className="text-lg md:text-xl text-slate-300 font-light space-y-6 leading-relaxed">
              <p className="drop-shadow-sm">Si has llegado hasta aquí, probablemente llevas demasiado tiempo funcionando.</p>
              <p className="drop-shadow-sm">Funcionando para tu trabajo. Funcionando para tu familia. Funcionando para los problemas de los demás. Funcionando incluso cuando ya no puedes más.</p>
              <p className="drop-shadow-sm">Y el problema de vivir así durante años… es que llega un momento en el que el agotamiento deja de parecerte extraño. Empieza a parecerte normal.</p>
            </div>
          </div>
        </div>

        {/* Menú de Navegación Sticky Superior */}
        <div className="sticky top-4 md:top-8 z-40 mb-12">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-200">
            <button 
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="w-full flex items-center justify-between font-bold text-slate-800 text-lg md:text-xl"
            >
              <span className="flex items-center gap-3">
                <Menu className="w-5 h-5 text-indigo-600" />
                Índice de Contenidos
              </span>
              <ChevronRight className={`w-5 h-5 transition-transform ${isNavOpen ? 'rotate-90' : ''}`} />
            </button>
            
            <div className={`${isNavOpen ? 'block mt-6' : 'hidden'}`}>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 border-t border-slate-100 pt-4">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="w-full text-left px-4 py-3 rounded-xl text-sm md:text-base font-medium text-slate-600 hover:text-indigo-700 hover:bg-indigo-50 transition-colors flex items-center justify-between group"
                    >
                      {item.label}
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] px-6 md:px-16 py-12 md:py-24 shadow-sm border border-neutral-200 relative overflow-hidden" id="guide-content-area">
            <div className="absolute inset-0 block bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-30"></div>
            
            <div className="relative z-10">
              {/* <div className="text-center text-lg text-neutral-600 mb-10 max-w-2xl mx-auto"> ya lo quitaremos dsps si eso */}
            <div className="text-center text-lg text-neutral-600 leading-relaxed font-serif mb-20 max-w-2xl mx-auto">
              <p className="mb-6">Durante años has aprendido a:</p>
              <ul className="text-left max-w-sm mx-auto space-y-2 mb-8 bg-neutral-50 px-8 py-6 rounded-3xl border border-neutral-100">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>{" "}
                  anticipar,
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>{" "}
                  resolver,
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>{" "}
                  sostener,
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>{" "}
                  organizar,
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>{" "}
                  y contener emocionalmente a los demás.
                </li>
              </ul>
              <p>
                El problema es que tu mente nunca recibió permiso para dejar de
                hacerlo.
              </p>
              <p className="mt-8">
                Por eso incluso cuando descansas…
                <br />
                <span className="font-bold text-neutral-900">
                  no sientes descanso.
                </span>
              </p>
              <p className="mt-8 italic text-neutral-500 text-base">
                Este mapa no está diseñado para darte más tareas.
                <br />
                Está diseñado para ayudarte a entender qué mantiene tu cabeza
                permanentemente en alerta.
              </p>
            </div>

            <article
              className="prose prose-lg md:prose-xl max-w-none 
            prose-headings:font-serif prose-headings:text-slate-900 prose-headings:tracking-tight
            prose-p:text-slate-600 prose-p:leading-loose [&>p]:mb-8 
            [&>ul]:mb-8 [&>ul>li]:mb-4
            prose-hr:my-24 md:prose-hr:my-32 prose-hr:border-t-px prose-hr:border-slate-200 
            prose-h2:text-4xl md:prose-h2:text-5xl prose-h2:mt-24 prose-h2:mb-12 prose-h2:font-bold
            prose-h3:text-2xl md:prose-h3:text-3xl prose-h3:mt-16 prose-h3:mb-8 prose-h3:font-semibold
            prose-h4:text-xl md:prose-h4:text-2xl prose-h4:mt-10 prose-h4:mb-6
            prose-li:text-slate-600 prose-li:leading-loose"
            >
              <div id="cap-intro" className="scroll-mt-32 mt-8 mb-24 text-center border-y border-slate-200 py-16 px-4 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4">
                  <BookOpen className="w-6 h-6 text-slate-300" />
                </div>
                <span className="block text-slate-500 font-bold tracking-[0.3em] uppercase text-xs mb-4">
                  Introducción
                </span>
                <h2 className="!text-4xl md:!text-6xl lg:!text-6xl !font-bold text-slate-900 !m-0 !leading-[1.1] !tracking-tight">
                  El Paso de la Información
                  <br />
                  <span className="italic font-light">a la Acción</span>
                </h2>
              </div>

              <p className="lead text-2xl md:text-3xl font-serif italic text-slate-800 border-l-4 border-slate-900 pl-6 my-12">
                Este manual no se ha escrito para que lo entiendas, sino para
                que lo ejecutes. El conocimiento sin herramientas solo genera
                más carga mental.
              </p>

              <p>
                Aquí aprenderás a desmantelar el sistema de "ayuda" para
                sustituirlo por un sistema de{" "}
                <strong className="text-slate-900">
                  "propiedad compartida"
                </strong>
                .
              </p>

              <div className="bg-indigo-50 border border-indigo-100 p-8 my-12 rounded-2xl flex items-start gap-6">
                <div className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Edit3 className="w-5 h-5" />
                </div>
                <p className="!m-0 italic text-indigo-900 text-base md:text-lg">
                  Nota Clínica: Se recomienda encarecidamente utilizar este
                  manual en conjunto con el{" "}
                  <strong>Espacio de Descarga Mental</strong> para realizar los
                  ejercicios prácticos sugeridos de forma simultánea.
                </p>
              </div>

              <hr />

              <div id="cap-1" className="scroll-mt-32 mb-24 text-center py-12 px-4 relative">
                <span className="block text-indigo-600 font-bold tracking-[0.4em] uppercase text-xs mb-6">
                  Capítulo 1
                </span>
                <h2 className="!text-4xl md:!text-6xl lg:!text-6xl !font-bold text-slate-900 !m-0 !leading-[1.1] !tracking-tight">
                  El Diagnóstico Clínico
                  <br />
                  <span className="text-slate-400 italic font-light block mt-4 text-3xl">
                    Las 3 Capas de la Carga
                  </span>
                </h2>
              </div>

              <h3>
                1. La Capa Operacional{" "}
                <span className="text-slate-400 font-light">
                  (Lo que se hace)
                </span>
              </h3>
              <p>
                <strong className="text-slate-900">El Problema:</strong> Estás
                agotada físicamente.
              </p>
              <p>
                <strong className="text-slate-900">
                  La Solución: Estandarización.
                </strong>{" "}
                Crea "rutinas mudas" donde no haga falta preguntar. Si el lunes
                es día de pasta, nadie pregunta qué se cena. Si la cesta de la
                ropa está llena, se pone la lavadora sin orden previa.
              </p>

              <h3>
                2. La Capa Cognitiva{" "}
                <span className="text-slate-400 font-light">
                  (Lo que se piensa)
                </span>
              </h3>
              <p>
                <strong className="text-slate-900">El Problema:</strong> Tu
                cerebro es un procesador que nunca descansa.
              </p>
              <p>
                <strong className="text-slate-900">
                  La Solución: Traspaso de Propiedad Total (TPT).
                </strong>{" "}
                No delegues la tarea, delega el pensamiento. Si traspasas la
                "Mascota", tú dejas de mirar si tiene agua o si toca vacuna. El
                otro asume el ciclo completo:{" "}
                <span className="font-mono text-sm bg-slate-100 px-2 py-1 rounded text-slate-800">
                  Notar → Planificar → Ejecutar
                </span>
                .
              </p>

              <div className="bg-orange-50/50 border border-orange-200 p-8 my-10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="!m-0 text-orange-900 text-base">
                  <strong>Acción sugerida:</strong> Realiza el Ejercicio 1 del
                  Espacio de Descarga Mental para visualizar tu carga e
                  identificar qué área necesita un TPT inmediato.
                </p>
                <button
                  onClick={onGoToWorkbook}
                  className="bg-orange-600 text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest shrink-0 whitespace-nowrap"
                >
                  Ir a Descarga Mental
                </button>
              </div>

              <h3>
                3. La Capa Emocional{" "}
                <span className="text-slate-400 font-light">
                  (Lo que se sostiene)
                </span>
              </h3>
              <p>
                <strong className="text-slate-900">El Problema:</strong> Eres el
                amortiguador de los conflictos familiares.
              </p>
              <p>
                <strong className="text-slate-900">
                  La Solución: Límites de Contención.
                </strong>{" "}
                Aprende a decir:{" "}
                <em>
                  "Entiendo que estés frustrado, pero no puedo gestionar tu
                  emoción ahora mismo, estoy recuperando mi espacio"
                </em>
                .
              </p>

              <hr />

              <div id="cap-2" className="scroll-mt-32 mb-24 text-center py-12 px-4 relative">
                <span className="block text-indigo-600 font-bold tracking-[0.4em] uppercase text-xs mb-6">
                  Capítulo 2
                </span>
                <h2 className="!text-4xl md:!text-6xl lg:!text-6xl !font-bold text-slate-900 !m-0 !leading-[1.1] !tracking-tight">
                  El Mapa de lo Invisible
                  <br />
                  <span className="text-slate-400 italic font-light block mt-4 text-3xl">
                    Desglose por Áreas del Hogar
                  </span>
                </h2>
              </div>

              <p>
                Para desmantelar la carga mental, primero hay que
                cartografiarla. Hemos dividido el peso invisible en{" "}
                <strong>cuatro sistemas principales</strong> que sostienen el
                ecosistema familiar. Conocerlos te permitirá transferir la
                propiedad completa de cada uno, en lugar de repartir tareas
                aisladas.
              </p>

              <div className="grid md:grid-cols-2 gap-8 my-16">
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                  <h3 className="!mt-0 !mb-4 text-xl !text-slate-900">
                    Sistema A: Logística
                  </h3>
                  <p className="!m-0 text-sm">
                    Incluye el ciclo completo del alimento (planificación,
                    compra, cocina), el cuidado textil (lavado, doblado), la
                    higiene del hábitat y mantenimiento general.
                  </p>
                </div>
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                  <h3 className="!mt-0 !mb-4 text-xl !text-slate-900">
                    Sistema B: Desarrollo
                  </h3>
                  <p className="!m-0 text-sm">
                    Abarca la agenda médica y de salud, logística escolar
                    diaria, organización de actividades extraescolares y cuidado
                    de personas dependientes.
                  </p>
                </div>
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                  <h3 className="!mt-0 !mb-4 text-xl !text-slate-900">
                    Sistema C: Relacional
                  </h3>
                  <p className="!m-0 text-sm">
                    Es la gestión de los vínculos: familia política,
                    organización de eventos y celebraciones, logística de
                    vacaciones y elección de regalos.
                  </p>
                </div>
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                  <h3 className="!mt-0 !mb-4 text-xl !text-slate-900">
                    Sistema D: Bienestar
                  </h3>
                  <p className="!m-0 text-sm">
                    Involucra el botiquín familiar, la planificación del
                    descanso, mediación en conflictos internos y protección de
                    tiempos de autocuidado.
                  </p>
                </div>
              </div>

              <hr />

              <div id="cap-3" className="scroll-mt-32 mb-24 text-center py-12 px-4 relative">
                <span className="block text-indigo-600 font-bold tracking-[0.4em] uppercase text-xs mb-6">
                  Capítulo 3
                </span>
                <h2 className="!text-4xl md:!text-6xl lg:!text-6xl !font-bold text-slate-900 !m-0 !leading-[1.1] !tracking-tight">
                  La Técnica del "Cajón de Incidencias"
                  <br />
                  <span className="text-slate-400 italic font-light block mt-4 text-3xl">
                    Cómo Dejar de Supervisar
                  </span>
                </h2>
              </div>

              <p>
                El mayor error al delegar es convertirse en <em>supervisor</em>.
                Si tú recuerdas qué hay que hacer, la carga sigue siendo tuya.
              </p>

              <h3>El "Cajón de Incidencias"</h3>
              <p>
                Deja de dar instrucciones por WhatsApp. Crea un lugar físico
                (una pizarra en la cocina) o digital (un grupo de notas
                compartido) donde las tareas se anotan.{" "}
                <strong>Si no está en el cajón, no existe.</strong> El
                responsable del área debe revisar el cajón sin que tú se lo
                recuerdes.
              </p>

              <h3>La "Regla del 80%"</h3>
              <p>
                Acepta que el otro hará las cosas al 80% de tu estándar de
                perfección. Si la ropa no está doblada exactamente como tú
                quieres, pero está limpia y guardada,{" "}
                <strong>la tarea está hecha</strong>. Criticar la forma en que
                el otro ejecuta es una forma de reclamar la carga.
              </p>

              <hr />

              <div id="cap-4" className="scroll-mt-32 mb-24 text-center py-12 px-4 relative">
                <span className="block text-indigo-600 font-bold tracking-[0.4em] uppercase text-xs mb-6">
                  Capítulo 4
                </span>
                <h2 className="!text-4xl md:!text-6xl lg:!text-6xl !font-bold text-slate-900 !m-0 !leading-[1.1] !tracking-tight">
                  Protocolo de Negociación
                  <br />
                  <span className="text-slate-400 italic font-light block mt-4 text-3xl">
                    Guiones de Poder
                  </span>
                </h2>
              </div>

              <p>
                La mayoría de las conversaciones sobre carga mental terminan en
                pelea porque empiezan con un reproche. Vamos a cambiar el marco
                lingüístico.
              </p>

              <div className="grid md:grid-cols-2 gap-8 my-12">
                <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-slate-900"></div>
                  <h4 className="mt-0 mb-6 font-bold text-slate-900 text-lg">
                    Escenario A: El traspaso inicial
                  </h4>
                  <div className="space-y-6 text-base">
                    <div>
                      <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-md uppercase tracking-wider mb-2">
                        No digas
                      </span>
                      <p className="!m-0 text-slate-600 italic">
                        "Tienes que ayudarme más con los niños".
                      </p>
                    </div>
                    <div>
                      <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-md uppercase tracking-wider mb-2">
                        Di
                      </span>
                      <p className="!m-0 text-slate-900 font-medium">
                        "Mi salud mental está en riesgo por la carga cognitiva.
                        Necesito que asumas la Propiedad Total de la Agenda
                        Escolar. Yo ya no voy a intervenir, aunque algo se
                        olvide".
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-slate-900"></div>
                  <h4 className="mt-0 mb-6 font-bold text-slate-900 text-lg">
                    Escenario B: La Resistencia
                  </h4>
                  <div className="space-y-6 text-base">
                    <div>
                      <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-md uppercase tracking-wider mb-2">
                        No digas
                      </span>
                      <p className="!m-0 text-slate-600 italic">
                        "¿Ves? Ya se te ha olvidado otra vez, lo tengo que hacer
                        yo".
                      </p>
                    </div>
                    <div>
                      <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-md uppercase tracking-wider mb-2">
                        Di
                      </span>
                      <p className="!m-0 text-slate-900 font-medium">
                        "Veo que la gestión no se ha completado. Confío en que
                        encontrarás la forma de solucionarlo. Yo ya no soy la
                        supervisora de esa área".
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <hr />

              <div id="cap-5" className="scroll-mt-32 mb-24 text-center py-12 px-4 relative">
                <span className="block text-indigo-600 font-bold tracking-[0.4em] uppercase text-xs mb-6">
                  Capítulo 5
                </span>
                <h2 className="!text-4xl md:!text-6xl lg:!text-6xl !font-bold text-slate-900 !m-0 !leading-[1.1] !tracking-tight">
                  El Escudo contra la Culpa
                  <br />
                  <span className="text-slate-400 italic font-light block mt-4 text-3xl">
                    Gestión Emocional
                  </span>
                </h2>
              </div>

              <p>
                La culpa es el mecanismo de control social que mantiene a las
                mujeres sobrecargadas.
              </p>

              <div className="p-8 md:p-12 bg-slate-900 text-slate-50 rounded-[2rem] my-12 text-center">
                <h3 className="!text-slate-50 !mt-0 !mb-6 font-bold text-xl md:text-2xl">
                  El Caos Necesario
                </h3>
                <p className="!text-slate-300 md:text-xl font-serif italic mb-0">
                  "Para que el otro aprenda a mirar, tú tienes que dejar de ver.
                  Si siempre hay leche antes de que se acabe porque tú la
                  compras, el otro nunca desarrollará la habilidad de mirar la
                  nevera."
                </p>
              </div>

              <hr />

              <div id="cap-anexo" className="scroll-mt-32 mb-24 text-center py-12 px-4 relative">
                <span className="block text-indigo-600 font-bold tracking-[0.4em] uppercase text-xs mb-6">
                  Anexo
                </span>
                <h2 className="!text-4xl md:!text-6xl lg:!text-6xl !font-bold text-slate-900 !m-0 !leading-[1.1] !tracking-tight">
                  Plan de Choque de 21 Días
                </h2>
              </div>

              <div className="space-y-12 mb-24">
                <div className="flex flex-col md:flex-row gap-6 border-b border-slate-100 pb-12">
                  <div className="shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-2xl font-serif">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="!mt-0 !mb-4 text-2xl text-slate-900 font-bold">
                      Semana 1: El Vaciado Mental
                    </h3>
                    <ul className="!mb-0 text-slate-600 text-lg space-y-2 list-disc pl-6">
                      <li>Haz el Ejercicio 1 en tu Espacio de Descarga Mental.</li>
                      <li>
                        Reunión de 15 min con la pareja. Solo para mostrar el
                        papel. Sin peticiones aún. Solo visibilidad.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6 border-b border-slate-100 pb-12">
                  <div className="shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-2xl font-serif">
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className="!mt-0 !mb-4 text-2xl text-slate-900 font-bold">
                      Semana 2: Las Primeras 3 Tarjetas
                    </h3>
                    <ul className="!mb-0 text-slate-600 text-lg space-y-2 list-disc pl-6">
                      <li>
                        Elige 3 áreas de tu mazo de tarjetas (Sección La Consulta). Traspasa la
                        propiedad.
                      </li>
                      <li>
                        <strong className="text-slate-900">IMPORTANTE:</strong>{" "}
                        Prepárate para que algo falle. No rescates la situación.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-2xl font-serif">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="!mt-0 !mb-4 text-2xl text-slate-900 font-bold">
                      Semana 3: El Silencio del Supervisor
                    </h3>
                    <ul className="!mb-0 text-slate-600 text-lg space-y-2 list-disc pl-6">
                      <li>
                        Prohibido recordar citas, tareas o necesidades de las
                        áreas delegadas.
                      </li>
                      <li>
                        Usa las Frases Martillo de este mapa cuando sientas la
                        ansiedad de "salvar" el día.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <hr />

              <div id="cap-frases" className="scroll-mt-32 mb-24 text-center py-12 px-4 relative">
                <span className="block text-indigo-600 font-bold tracking-[0.4em] uppercase text-xs mb-6">
                  Capítulo 7
                </span>
                <h2 className="!text-4xl md:!text-6xl lg:!text-6xl !font-bold text-slate-900 !m-0 !leading-[1.1] !tracking-tight">
                  Frases Martillo
                  <br />
                  <span className="text-slate-400 italic font-light block mt-4 text-3xl">
                    Para destruir la culpa
                  </span>
                </h2>
              </div>

              {/* Frases martillo */}
              <div className="space-y-12 my-12 not-prose">
                <div className="bg-indigo-50/50 p-8 md:p-12 rounded-3xl border border-indigo-100 text-center transform transition-transform hover:scale-[1.02]">
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-indigo-900 leading-tight">
                    Tu cuerpo se sienta.
                    <br />
                    Tu mente no.
                  </h3>
                </div>

                <div className="bg-neutral-50 p-8 md:p-12 rounded-3xl border border-neutral-200 text-center transform transition-transform hover:scale-[1.02]">
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-neutral-800 leading-tight max-w-lg mx-auto">
                    Hay mujeres tan acostumbradas a sostenerlo todo…
                    <br />
                    <span className="text-neutral-500 block mt-2 font-normal">
                      que ya no saben cómo parar.
                    </span>
                  </h3>
                </div>

                <div className="bg-rose-50/50 p-8 md:p-12 rounded-3xl border border-rose-100 text-center transform transition-transform hover:scale-[1.02]">
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-rose-900 leading-tight">
                    El agotamiento invisible
                    <br />
                    también rompe.
                  </h3>
                </div>

                <div className="bg-slate-900 p-8 md:p-12 rounded-3xl border border-slate-800 text-center transform transition-transform hover:scale-[1.02]">
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-100 leading-tight">
                    Tu valor no debería depender de cuánto soportas.
                  </h3>
                </div>

                <div className="bg-amber-50/50 p-8 md:p-12 rounded-3xl border border-amber-100 text-center transform transition-transform hover:scale-[1.02]">
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-amber-900 leading-tight">
                    No era fortaleza.
                    <br />
                    <span className="text-amber-700/80 font-normal italic block mt-2">
                      Era supervivencia.
                    </span>
                  </h3>
                </div>

                <div className="bg-indigo-900 p-8 md:p-12 rounded-3xl border border-indigo-800 text-center transform transition-transform hover:scale-[1.02]">
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-indigo-50 leading-tight max-w-lg mx-auto">
                    El problema no es que hagas demasiado.
                    <br />
                    <span className="text-indigo-300 font-light block mt-4">
                      Es que nunca puedes dejar de pensar en ello.
                    </span>
                  </h3>
                </div>
              </div>

              <div className="bg-neutral-50 rounded-3xl p-10 mt-16 text-center border border-neutral-200">
                <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-6" />
                <h2 className="!text-3xl md:!text-4xl text-slate-900 !font-bold !m-0 !mb-6">
                  Tu Nueva Identidad
                </h2>
                <p className="text-xl md:text-2xl font-serif italic text-slate-600 max-w-2xl mx-auto mb-8">
                  Recuperar tu carga mental no es para que tengas tiempo de
                  limpiar más, sino para que tengas tiempo de ser. Tu mente
                  merece el silencio.
                </p>
                <div className="w-16 h-px bg-slate-300 mx-auto mb-8"></div>
                <p className="font-bold text-slate-900 uppercase tracking-widest text-sm m-0">
                  Dra. Elena Vargas
                </p>
                <p className="text-slate-500 text-xs uppercase tracking-widest mt-2 m-0">
                  Especialista en Salud Mental Femenina
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}

// --- Audios Tab ---
function AudiosTab() {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const audios = [
    {
      id: 1,
      title: "SOS 1: Acaban de descargar en mi otra tarea",
      duration: "03:45",
      file: "/audio1.mp3",
    },
    {
      id: 2,
      title: "SOS 2: Mi pareja acaba de decir 'me lo podrías haber pedido'",
      duration: "04:12",
      file: "/audio2.mp3",
    },
    {
      id: 3,
      title: "SOS 3: Siento que si yo no lo hago, la casa se cae",
      duration: "05:30",
      file: "/audio3.mp3",
    },
    {
      id: 4,
      title: "SOS 4: Estoy descansando pero no paro de pensar en la culpa",
      duration: "06:15",
      file: "/audio4.mp3",
    },
  ];

  const handlePlay = (id: number, fileUrl: string) => {
    if (playingId === id) {
      // Pause
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlayingId(null);
      setProgress(0);
    } else {
      // Play new
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setProgress(0);
      const newAudio = new Audio(fileUrl);
      newAudio.play().catch((e) => {
        console.warn("Audio could not play:", e);
      });
      newAudio.ontimeupdate = () => {
        if (newAudio.duration) {
          setProgress((newAudio.currentTime / newAudio.duration) * 100);
        }
      };
      newAudio.onended = () => {
        setPlayingId(null);
        setProgress(0);
      };
      audioRef.current = newAudio;
      setPlayingId(id);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-8 relative px-4">
      <div className="text-center mb-12">
        <h1 className="font-serif text-3xl md:text-5xl italic font-bold mt-2 text-neutral-900 leading-tight">
          Recuperar silencio mental
        </h1>
        <div className="text-slate-600 mt-6 text-sm md:text-base leading-relaxed max-w-xl mx-auto space-y-3 font-medium">
          <p>Estos audios no están hechos para motivarte.</p>
          <p>
            Están hechos para ayudarte a salir durante unos minutos del estado
            de alerta constante en el que tu mente lleva demasiado tiempo
            viviendo.
          </p>
          <p>
            No necesitas hacerlo bien. No necesitas concentrarte perfectamente.
          </p>
          <p>Solo escuchar. Y permitirte bajar un poco el ruido.</p>
        </div>
      </div>

      <div className="text-center mb-6 mt-12 bg-indigo-50 border border-indigo-100 p-4 rounded-2xl">
        <p className="font-serif italic text-lg text-indigo-900 font-semibold">
          Si ahora mismo sientes que tu cabeza no consigue detenerse…
          <br />
          empieza por aquí.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
        {audios.map((audio, i) => (
          <div
            key={audio.id}
            className={`p-4 md:p-6 flex items-center gap-4 border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors ${playingId === audio.id ? "bg-indigo-50/50" : ""}`}
          >
            <button
              onClick={() => handlePlay(audio.id, audio.file)}
              className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                playingId === audio.id
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-neutral-100 text-neutral-600 hover:bg-indigo-100 hover:text-indigo-600"
              }`}
            >
              {playingId === audio.id ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 ml-1 fill-current" />
              )}
            </button>
            <div className="flex-1">
              <h4
                className={`font-bold text-base ${playingId === audio.id ? "text-indigo-900" : "text-neutral-800"}`}
              >
                {audio.title}
              </h4>
              {playingId === audio.id && (
                <div className="mt-2 h-1 w-full bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all duration-300 ease-linear"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              )}
            </div>
            <div className="text-sm font-medium text-neutral-400 font-mono">
              {audio.duration}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Workbook Tab ---
import { WorkbookTab } from "./WorkbookTab";

// --- Checkout Tab ---
function CheckoutTab({ onSuccess }: { onSuccess: () => void }) {
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);

  const handleBuy = () => {
    window.open(HOTMART_URL, "_blank");
  };

  const handleVerifyPassword = () => {
    if (!passwordInput.trim()) return;

    setIsVerifying(true);
    setPasswordError(false);

    // Pequeño delay para que no parezca instantáneo
    setTimeout(() => {
      if (
        passwordInput.trim().toLowerCase() === UNLOCK_PASSWORD.toLowerCase()
      ) {
        onSuccess();
      } else {
        setPasswordError(true);
        setIsVerifying(false);
      }
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleVerifyPassword();
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-6">
      <div className="bg-white rounded-3xl border border-neutral-200 p-8 shadow-xl text-center flex flex-col items-center">
        {/* Icono */}
        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-6">
          <Lock className="w-8 h-8" />
        </div>

        {/* Título */}
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">
          Programa Completo
        </h2>
        <p className="text-slate-500 mb-8 leading-relaxed text-sm">
          Accede al Mapa de la carga invisible, La Consulta, Señales de alerta y el Espacio de Descarga Mental.
        </p>

        {/* Resumen del producto */}
        <div className="w-full bg-slate-50 rounded-2xl p-6 mb-8 text-left border border-slate-100">
          <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-4">
            <span className="font-bold text-slate-700">
              El Peso que No Se Ve
            </span>
            <span className="font-serif font-bold text-xl text-slate-900">
              €27.00
            </span>
          </div>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
              Guía clínica completa en PDF
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
              Mazo de tarjetas de delegación
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
              Audios SOS de estabilización
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
              Workbook interactivo + Checklists
            </li>
          </ul>
        </div>

        {/* Botón de compra → Hotmart */}
        <button
          onClick={handleBuy}
          className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-[0_4px_20px_rgba(79,70,229,0.3)] hover:bg-indigo-700 hover:-translate-y-0.5 active:translate-y-0 transition flex justify-center items-center gap-2"
        >
          Comprar ahora · €27
        </button>

        <p className="text-xs text-slate-400 mt-3 mb-6">
          Pago seguro · Acceso inmediato · Hotmart
        </p>

        {/* Separador */}
        <div className="w-full flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-slate-100"></div>
          <span className="text-xs text-slate-400 font-medium">
            ¿Ya has comprado?
          </span>
          <div className="flex-1 h-px bg-slate-100"></div>
        </div>

        {/* Toggle para mostrar campo de contraseña */}
        {!showPasswordField ? (
          <button
            onClick={() => setShowPasswordField(true)}
            className="mt-4 text-sm text-indigo-600 hover:text-indigo-800 underline underline-offset-2 transition"
          >
            Introduce tu clave de acceso
          </button>
        ) : (
          <div className="w-full mt-4 space-y-3">
            <p className="text-xs text-slate-500 text-left">
              Encontrarás tu clave en el email de confirmación de compra.
            </p>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
                setPasswordError(false);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Introduce tu clave de acceso"
              className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors ${
                passwordError
                  ? "border-red-400 bg-red-50 focus:border-red-500"
                  : "border-slate-200 focus:border-indigo-400 bg-white"
              }`}
              autoFocus
            />
            {passwordError && (
              <p className="text-xs text-red-500 text-left">
                Clave incorrecta. Comprueba el email de confirmación de Hotmart.
              </p>
            )}
            <button
              onClick={handleVerifyPassword}
              disabled={isVerifying || !passwordInput.trim()}
              className="w-full bg-slate-800 text-white font-bold py-3 rounded-xl hover:bg-slate-900 transition disabled:bg-slate-300 disabled:cursor-not-allowed flex justify-center items-center gap-2 text-sm"
            >
              {isVerifying ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Verificando...
                </>
              ) : (
                "Activar acceso"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
