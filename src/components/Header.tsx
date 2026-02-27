import { Gamepad2, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-primary text-primary-foreground rounded-lg p-2 group-hover:shadow-lg group-hover:shadow-primary/30 transition-shadow">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold text-foreground tracking-wider">
              LANE <span className="text-primary">UNBLOCKED</span>
            </h1>
            <p className="text-[10px] text-muted-foreground tracking-[0.3em] uppercase">Games</p>
          </div>
        </Link>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Zap className="w-3.5 h-3.5 text-primary animate-pulse-neon" />
          <span className="hidden sm:inline font-display tracking-wider">PLAY FREE</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
