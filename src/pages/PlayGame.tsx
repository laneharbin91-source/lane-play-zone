import { useParams, Link } from "react-router-dom";
import { games } from "@/data/games";
import Header from "@/components/Header";
import GameCard from "@/components/GameCard";
import { ArrowLeft, Maximize2, ExternalLink } from "lucide-react";
import { useState } from "react";

const PlayGame = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const game = games.find((g) => g.id === gameId);
  const [fullscreen, setFullscreen] = useState(false);

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

  const toggleFullscreen = () => {
    const el = document.getElementById("game-frame");
    if (el) {
      if (!document.fullscreenElement) {
        el.requestFullscreen();
        setFullscreen(true);
      } else {
        document.exitFullscreen();
        setFullscreen(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-6">
        {/* Back nav */}
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to games</span>
        </Link>

        {/* Game title */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">{game.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{game.description}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={toggleFullscreen}
              className="p-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors text-muted-foreground hover:text-foreground"
              title="Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <a
              href={game.embedUrl}
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
        <div id="game-frame" className="game-frame-container overflow-hidden">
          <iframe
            src={game.embedUrl}
            title={game.title}
            className="w-full rounded-lg"
            style={{ height: "70vh", border: "none" }}
            allow="fullscreen; autoplay; gamepad; microphone"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
            loading="lazy"
          />
        </div>

        {/* Tips */}
        <div className="mt-4 bg-secondary/50 rounded-lg p-4 border border-border">
          <p className="text-xs text-muted-foreground">
            <span className="text-primary font-display tracking-wider">TIP:</span>{" "}
            Click on the game area to start playing. If the game doesn't load, try opening it in a new tab using the button above. Some games may take a moment to load.
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
