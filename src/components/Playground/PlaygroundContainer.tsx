import { useState, useEffect, useCallback, useRef } from "react";
import { useStore } from "@nanostores/react";
import { isPlaygroundOpen, closePlayground } from "./store";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import {
  X,
  Play,
  RotateCcw,
  Trash2,
  Terminal as TerminalIcon,
} from "lucide-react";

const DEFAULT_CODE = `// Benvenuto nel Laboratorio Node.js 🚀
// Qui puoi testare JavaScript in tempo reale.

function saluta(nome) {
  return "Ciao, " + nome + "! Benvenuto su NodeBlog.";
}

const messaggio = saluta("Studente");
console.log(messaggio);

// Prova a generare un errore per vedere come viene gestito
// console.log(variabileInesistente);

console.log("Stato:", "Pronto per l'esperimento");
`;

export default function PlaygroundContainer() {
  const isOpen = useStore(isPlaygroundOpen);
  const [code, setCode] = useState(DEFAULT_CODE);
  const [logs, setLogs] = useState<{ type: string; message: string }[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const runCode = useCallback(() => {
    if (!iframeRef.current) return;
    setLogs([]); // Reset logs before run

    const iframe = iframeRef.current;
    const content = `
      <script>
        const originalLog = console.log;
        const originalError = console.error;
        const originalWarn = console.warn;

        const sendToParent = (type, args) => {
          const message = args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' ');
          window.parent.postMessage({ type, message }, '*');
        };

        console.log = (...args) => {
          sendToParent('log', args);
          originalLog.apply(console, args);
        };
        console.error = (...args) => {
          sendToParent('error', args);
          originalError.apply(console, args);
        };
        console.warn = (...args) => {
          sendToParent('warn', args);
          originalWarn.apply(console, args);
        };

        window.onerror = (msg, url, line, col, error) => {
          sendToParent('error', [msg + " (linea " + line + ")"]);
          return false;
        };

        try {
          ${code}
        } catch (e) {
          console.error(e.message);
        }
      </script>
    `;
    iframe.srcdoc = content;
  }, [code]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.data?.type &&
        ["log", "error", "warn"].includes(event.data.type)
      ) {
        setLogs((prev) => [
          ...prev,
          { type: event.data.type, message: event.data.message },
        ]);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        runCode();
      }
      if (e.key === "Escape") {
        closePlayground();
      }
    };

    window.addEventListener("message", handleMessage);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("message", handleMessage);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [code, runCode]);

  // Blocca lo scroll del body quando il playground è aperto
  useEffect(() => {
    if (isOpen) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(4px)",
        padding: "1rem",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "56rem",
          height: "90vh",
          backgroundColor: "#1e1e1e",
          borderRadius: "0.75rem",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.75rem 1rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            backgroundColor: "#252526",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#d1d5db",
            }}
          >
            <TerminalIcon size={18} />
            <span style={{ fontWeight: 500, fontSize: "0.875rem" }}>
              JavaScript Playground
            </span>
          </div>
          <button
            onClick={closePlayground}
            style={{
              padding: "0.25rem",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#9ca3af",
              borderRadius: "0.375rem",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.1)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <X size={20} />
          </button>
        </div>

        {/* Editor Area */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: window.innerWidth < 768 ? "column" : "row",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
              borderRight:
                window.innerWidth >= 768
                  ? "1px solid rgba(255, 255, 255, 0.1)"
                  : "none",
              borderBottom:
                window.innerWidth < 768
                  ? "1px solid rgba(255, 255, 255, 0.1)"
                  : "none",
            }}
          >
            <div style={{ flex: 1, overflow: "auto" }}>
              <CodeMirror
                value={code}
                height="100%"
                theme="dark"
                extensions={[javascript()]}
                onChange={(value) => setCode(value)}
              />
            </div>
          </div>

          {/* Console Area */}
          <div
            style={{
              height: window.innerWidth < 768 ? "33.333%" : "100%",
              width: window.innerWidth < 768 ? "100%" : "20rem",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#111",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.5rem 0.75rem",
                backgroundColor: "#252526",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  color: "#6b7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Output
              </span>
              <button
                onClick={() => setLogs([])}
                style={{
                  padding: "0.25rem",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#9ca3af",
                  borderRadius: "0.375rem",
                }}
                title="Pulisci console"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <div
              style={{
                flex: 1,
                overflow: "auto",
                padding: "1rem",
                fontFamily: "monospace",
                fontSize: "0.875rem",
              }}
            >
              {logs.length === 0 && (
                <span style={{ color: "#4b5563", fontStyle: "italic" }}>
                  Esegui il codice per vedere i risultati...
                </span>
              )}
              {logs.map((log, i) => (
                <div
                  key={i}
                  style={{
                    whiteSpace: "pre-wrap",
                    marginBottom: "0.5rem",
                    color:
                      log.type === "error"
                        ? "#f87171"
                        : log.type === "warn"
                          ? "#fbbf24"
                          : "#4ade80",
                  }}
                >
                  <span
                    style={{
                      opacity: 0.5,
                      marginRight: "0.5rem",
                      color: "#6b7280",
                    }}
                  >
                    {">"}
                  </span>
                  {log.message}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div
          style={{
            padding: "0.75rem 1rem",
            backgroundColor: "#252526",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={runCode}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "#2563eb",
                border: "none",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#1d4ed8")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#2563eb")
              }
            >
              <Play size={16} />
              Run
            </button>
            <button
              onClick={() => setCode(DEFAULT_CODE)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "none",
                color: "#d1d5db",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.1)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.05)")
              }
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>
          <span style={{ fontSize: "10px", color: "#6b7280" }}>
            Sandbox Browser
          </span>
        </div>

        {/* Hidden Iframe for Sandbox */}
        <iframe ref={iframeRef} style={{ display: "none" }} title="sandbox" />
      </div>
    </div>
  );
}
