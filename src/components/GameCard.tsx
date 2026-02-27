import { Game } from "@/data/games";
import { Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";

interface GameCardProps {
  game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  return (
    <Link to={`/play/${game.id}`} className="block group">
      <div className="neon-card rounded-lg overflow-hidden">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={game.thumbnail}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-primary text-primary-foreground rounded-full p-4 shadow-lg shadow-primary/30">
              <Gamepad2 className="w-6 h-6" />
            </div>
          </div>
          {game.featured && (
            <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded font-display tracking-wider">
              HOT
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-display text-sm font-semibold text-foreground truncate">{game.title}</h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{game.description}</p>
          <span className="inline-block mt-2 text-[10px] uppercase tracking-widest font-display text-primary/80 bg-primary/10 px-2 py-0.5 rounded">
            {game.category}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
