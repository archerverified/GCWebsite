
  import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import "./styles/globals.css";

// #region agent log
fetch('http://127.0.0.1:7243/ingest/3b9dec33-55db-414b-9cbe-62f230d8aae6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.tsx:8',message:'App initialization started',data:{rootElement:!!document.getElementById("root")},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'E'})}).catch(()=>{});
// #endregion

// #region agent log
window.addEventListener("error", (e) => {
  fetch('http://127.0.0.1:7243/ingest/3b9dec33-55db-414b-9cbe-62f230d8aae6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.tsx:12',message:'window.error',data:{message:e.message,filename:e.filename,lineno:e.lineno,colno:e.colno},timestamp:Date.now(),sessionId:'debug-session',runId:'home-fix-1',hypothesisId:'J'})}).catch(()=>{});
});
window.addEventListener("unhandledrejection", (e) => {
  fetch('http://127.0.0.1:7243/ingest/3b9dec33-55db-414b-9cbe-62f230d8aae6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.tsx:15',message:'window.unhandledrejection',data:{reason:String((e as PromiseRejectionEvent).reason)},timestamp:Date.now(),sessionId:'debug-session',runId:'home-fix-1',hypothesisId:'J'})}).catch(()=>{});
});
// #endregion

try {
  createRoot(document.getElementById("root")!).render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/3b9dec33-55db-414b-9cbe-62f230d8aae6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.tsx:12',message:'App render called successfully',data:{},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'E'})}).catch(()=>{});
  // #endregion
} catch (e) {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/3b9dec33-55db-414b-9cbe-62f230d8aae6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.tsx:16',message:'App initialization FAILED',data:{error:String(e)},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'E'})}).catch(()=>{});
  // #endregion
  throw e;
}
  