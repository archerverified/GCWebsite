import { useState, useEffect } from 'react';

interface UseContentResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook to load JSON content from src/data/ folder
 * Uses dynamic import for code splitting and lazy loading
 * 
 * @param fileName - Name of the JSON file without extension (e.g., 'about-us')
 * @returns Object with data, loading state, and error message
 * 
 * @example
 * const { data, loading, error } = useContent<AboutUsContent>('about-us');
 */
export function useContent<T>(fileName: string): UseContentResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadContent = async () => {
      setLoading(true);
      setError(null);
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/3b9dec33-55db-414b-9cbe-62f230d8aae6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useContent.tsx:30',message:'loadContent started',data:{fileName},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A,D'})}).catch(()=>{});
      // #endregion

      try {
        // Dynamic import for JSON files from data folder
        // Vite handles this with its glob import capabilities
        const content = await import(`../data/${fileName}.json`) as { default: T };
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/3b9dec33-55db-414b-9cbe-62f230d8aae6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useContent.tsx:38',message:'Content loaded successfully',data:{fileName,hasDefault:!!content.default},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A,D'})}).catch(()=>{});
        // #endregion
        
        if (isMounted) {
          setData(content.default);
          setLoading(false);
        }
      } catch (err) {
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/3b9dec33-55db-414b-9cbe-62f230d8aae6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useContent.tsx:48',message:'Content load FAILED',data:{fileName,error:String(err)},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A,D'})}).catch(()=>{});
        // #endregion
        if (isMounted) {
          console.error(`Failed to load content: ${fileName}`, err);
          setError(`Failed to load content for ${fileName}`);
          setLoading(false);
        }
      }
    };

    loadContent();

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false;
    };
  }, [fileName]);

  return { data, loading, error };
}

/**
 * Loading component for content loading states
 */
export function ContentLoading() {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-[#fec300] rounded-full animate-bounce" />
        <p className="font-product-sans text-lg text-[#323232]">Loading...</p>
      </div>
    </div>
  );
}

/**
 * Error component for content loading errors
 */
export function ContentError({ message }: { message: string }) {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="text-center p-8 bg-red-50 rounded-lg border border-red-200">
        <p className="font-product-sans text-lg text-red-600 mb-2">Error Loading Content</p>
        <p className="font-product-sans text-sm text-red-500">{message}</p>
      </div>
    </div>
  );
}

