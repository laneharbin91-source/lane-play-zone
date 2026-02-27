import { useState, useMemo } from "react";
import { games } from "@/data/games";
import GameCard from "@/components/GameCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import Header from "@/components/Header";
import { Gamepad2, TrendingUp } from "lucide-react";

const Index = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return games.filter((g) => {
      const matchSearch = g.title.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "All" || g.category === category;
      return matchSearch && matchCat;
    });
  }, [search, category]);

  const featured = games.filter((g) => g.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="gradient-hero border-b border-border">
        <div className="container mx-auto px-4 py-12 md:py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-display tracking-widest mb-6">
            <Gamepad2 className="w-3.5 h-3.5" />
            NO DOWNLOADS · NO ADS · JUST PLAY
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-black text-foreground tracking-tight mb-4">
            PLAY <span className="text-primary neon-text">UNBLOCKED</span> GAMES
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm md:text-base">
            Your favorite games, all in one place. No restrictions, no downloads — just click and play instantly.
          </p>
        </div>
      </section>

      {/* Featured */}
      <section className="container mx-auto px-4 py-10">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-4 h-4 text-primary" />
          <h3 className="font-display text-sm tracking-widest text-foreground">TRENDING NOW</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* All Games */}
      <section className="container mx-auto px-4 pb-16">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          <h3 className="font-display text-sm tracking-widest text-foreground">ALL GAMES</h3>
          <div className="flex-1" />
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <CategoryFilter selected={category} onSelect={setCategory} />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
          {filtered.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <Gamepad2 className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-display text-sm tracking-wider">NO GAMES FOUND</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4 text-center text-xs text-muted-foreground">
          <p className="font-display tracking-widest">LANE UNBLOCKED GAMES © 2026</p>
          <p className="mt-1">All games are property of their respective owners.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
