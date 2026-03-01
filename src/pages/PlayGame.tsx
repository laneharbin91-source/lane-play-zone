import { useParams, Link } from "react-router-dom";
import { games } from "@/data/games";
import Header from "@/components/Header";
import GameCard from "@/components/GameCard";
import { ArrowLeft, Maximize2, ExternalLink, AlertTriangle, RefreshCw } from "lucide-react";
import { useState, useRef, useCallback } from "react";

const PlayGame = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const game = games.find((g) => g.id === gameId);
  const [loadError, setLoadError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const currentUrl = useFallback && game?.fallbackUrl ? game.fallbackUrl : game?.embedUrl;

  const handleFullscreen = useCallback(() => {
    const el = iframeRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen().catch(() => {
        // Fallback: try the container
        el.parentElement?.requestFullscreen();
      });
    }
  }, []);

  const handleRetry = useCallback(() => {
    if (useFallback || !game?.fallbackUrl) {
      // Reload same URL
      setLoadError(false);
      if (iframeRef.current) {
        iframeRef.current.src = currentUrl || "";
      }
    } else {
      setUseFallback(true);
      setLoadError(false);
    }
  }, [useFallback, game, currentUrl]);

  if (!game) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl text-foreground mb-2">Game Not Found</h2>
          <Link to="/" className="text-primary text-sm hover:underline">← Back to games</Link>
        </div>
      </div>
    );
  }

  const related = games.filter((g) => g.category === game.category && g.id !== game.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to games</span>
        </Link>

        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">{game.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{game.description}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleFullscreen}
              className="p-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors text-muted-foreground hover:text-foreground"
              title="Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <a
              href={currentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors text-muted-foreground hover:text-foreground"
              title="Open in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Game frame */}
        <div className="game-frame-container overflow-hidden relative">
          <iframe
            key={currentUrl}
            ref={iframeRef}
            src={currentUrl}
            title={game.title}
            className="w-full rounded-lg"
            style={{ height: "75vh", border: "none" }}
            allow="fullscreen; autoplay; gamepad; microphone; accelerometer; gyroscope; pointer-lock; clipboard-read; clipboard-write"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation allow-downloads"
            allowFullScreen
            loading="eager"
            onLoad={() => setLoadError(false)}
            onError={() => setLoadError(true)}
          />

          {loadError && (
            <div className="absolute inset-0 bg-background/90 flex flex-col items-center justify-center gap-4 rounded-lg">
              <AlertTriangle className="w-10 h-10 text-neon-orange" />
              <p className="font-display text-sm text-foreground">Game failed to load</p>
              <div className="flex gap-3">
                <button onClick={handleRetry} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-display">
                  <RefreshCw className="w-3.5 h-3.5" /> Try Again
                </button>
                <a
                  href={currentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-display"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Open in New Tab
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="mt-4 bg-secondary/50 rounded-lg p-4 border border-border">
          <p className="text-xs text-muted-foreground">
            <span className="text-primary font-display tracking-wider">TIP:</span>{" "}
            Click inside the game to activate controls. Use the fullscreen button (⛶) for the best experience.
            {game.fallbackUrl && !useFallback && (
              <> Game not loading?{" "}
                <button onClick={() => { setUseFallback(true); setLoadError(false); }} className="text-primary hover:underline">
                  Try alternate source
                </button>
              </>
            )}
            {" "}Or{" "}
            <a href={currentUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              open in a new tab
            </a>.
          </p>
        </div>

        {/* Related games */}
        {related.length > 0 && (
          <div className="mt-10">
            <h3 className="font-display text-sm tracking-widest text-foreground mb-4">MORE {game.category.toUpperCase()} GAMES</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((g) => (
                <GameCard key={g.id} game={g} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayGame;
