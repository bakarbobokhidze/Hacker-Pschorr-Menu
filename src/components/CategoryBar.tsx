import { useMenu } from "@/contexts/MenuContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Salad,
  ChefHat,
  Flame,
  Cake,
  Wine,
  UtensilsCrossed,
  Fish,
  Coffee,
  Beer,
  Pizza,
  Soup,
  Cookie,
  Sandwich,
  Beef,
  Grape,
  GlassWater,
  Martini,
  Pipette,
  Wheat,
  Star,
  BookOpen,
  Utensils,
  Droplets,
  FlaskConical,
  TestTube,
  CupSoda,
  Torus,
  CakeSlice,
  CookingPot,
} from "lucide-react";

const KhinkaliIcon = ({
  size = 16,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2 C12 2, 6 6, 5 12 C4 17, 7 21, 12 21 C17 21, 20 17, 19 12 C18 6, 12 2, 12 2 Z" />
    <path d="M12 2 C12 2, 9 7, 12 10 C15 7, 12 2, 12 2 Z" />
    <path d="M12 2 L12 5" />
    <path d="M9.5 3.5 C9.5 3.5, 8 8, 10 11" />
    <path d="M14.5 3.5 C14.5 3.5, 16 8, 14 11" />
  </svg>
);

const iconMap: Record<string, React.ElementType> = {
  Salad,
  Flame,
  Cake,
  Wine,
  UtensilsCrossed,
  Fish,
  Coffee,
  CookingPot,
  Beer,
  Torus,
  CakeSlice,
  ChefHat,
  FlaskConical,
  Pizza,
  Soup,
  Beef,
  TestTube,
  CupSoda,
  Grape,
  GlassWater,
  Martini,
  Wheat,
  Star,
  BookOpen,
  Utensils,
  Droplets,
  Khinkali: KhinkaliIcon,
};

interface CategoryBarProps {
  selected: string | null;
  onSelect: (id: string | null) => void;
}

const CategoryBar = ({ selected, onSelect }: CategoryBarProps) => {
  const { categories } = useMenu();
  const { t, getTranslated } = useLanguage();

  return (
    <div className="scrollbar-hide flex gap-2 overflow-x-auto py-2">
      <button
        onClick={() => onSelect(null)}
        className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all ${
          selected === null
            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        }`}
      >
        <UtensilsCrossed size={16} />
        {t("allCategories")}
      </button>
      {categories.map((cat) => {
        const Icon = iconMap[cat.icon] || UtensilsCrossed;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all ${
              selected === cat.id
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            <Icon size={16} />
            {getTranslated(cat.name)}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryBar;
