import { useState, useMemo, useEffect } from "react";
import { useMenu, MenuItem } from "@/contexts/MenuContext";
import { useLanguage } from "@/contexts/LanguageContext"; // ენა შემოგვაქვს აქედან
import LanguageSwitcher from "@/components/LanguageSwitcher";
import CategoryBar from "@/components/CategoryBar";
import MenuCard from "@/components/MenuCard";
import SearchBar from "@/components/SearchBar";
import ItemDetailModal from "@/components/ItemDetailModal";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  // 1. გამოიყენე კონტექსტიდან წამოღებული ფუნქციები
  const { incrementViews } = useMenu();
  const { getTranslated, language } = useLanguage();
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // 2. მონაცემების წამოღება ბაზიდან
  useEffect(() => {
    fetch("https://backend-uiw0.onrender.com/api/menu")
      .then((res) => res.json())
      .then((data) => setMenuItems(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // 3. გაფილტვრა (გამოიყენება კონტექსტის getTranslated)
  const filtered = useMemo(() => {
    return menuItems.filter((item) => {
      const translatedName = getTranslated(item.name) || "";
      const translatedDesc = getTranslated(item.description) || "";

      const matchesCategory =
        !selectedCategory || item.categoryId === selectedCategory;
      const matchesSearch =
        !search ||
        translatedName.toLowerCase().includes(search.toLowerCase()) ||
        translatedDesc.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [menuItems, selectedCategory, search, getTranslated, language]); // language დაემატა აქ

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) =>
      a.inStock === b.inStock ? 0 : a.inStock ? -1 : 1,
    );
  }, [filtered]);

  const handleItemTap = (item: MenuItem) => {
    // 1. ნახვის მომატება
    const id = item._id || (item as any).id;
    if (id) {
      incrementViews(id);
    }

    // 2. დეტალების ფანჯრის გახსნა
    setSelectedItem(item);
    setIsDetailOpen(true); // აქ დაემატა "Is" დასაწყისში
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-lg px-4">
          <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur shrink-0">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
              {/* მარცხენა მხარე: ლოგო და სახელი */}
              <div className="flex items-center gap-3 group cursor-pointer">
                {/* ლოგო - გავზარდეთ ზომა (h-12 w-12) და მოვაშორეთ ზედმეტი ჩარჩოები */}
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white/5 flex items-center justify-center p-1 transition-transform group-hover:scale-105">
                  <img
                    src="/your-logo-name.png" // <--- აქ ჩაწერე შენი ფაილის სახელი (მაგ: /logo.png)
                    alt="Logo"
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* ტექსტი - ზომა გაზრდილია და დაშორება გასწორებული */}
                <div className="flex flex-col justify-center">
                  <h1 className="font-display text-xl font-black leading-none tracking-tighter text-foreground uppercase">
                    Hacker
                  </h1>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold mt-1">
                    Pschorr
                  </p>
                </div>
              </div>

              {/* მარჯვენა მხარე: აქ უნდა იყოს შენი ადმინის ღილაკი */}
              <div className="flex items-center gap-4">
                {/* თუ აქამდე გქონდა Link ან Button ადმინისთვის, დარწმუნდი რომ აქ ზის */}
                <Link to="/admin">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="font-bold uppercase tracking-wider text-[11px]"
                  >
                    Admin Panel
                  </Button>
                </Link>
              </div>
            </div>
          </nav>
          <div className="pb-3">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <CategoryBar
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 pt-4">
        <div className="grid grid-cols-2 gap-3">
          {sorted.map((item) => (
            <MenuCard
              key={item._id}
              item={item}
              onView={() => handleItemTap(item)}
            />
          ))}
        </div>
        {sorted.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <p className="text-sm">No items found</p>
          </div>
        )}
      </main>

      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default Index;
