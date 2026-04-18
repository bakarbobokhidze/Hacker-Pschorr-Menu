import React, { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "ge" | "de" | "ru";

type Translations = {
  [key: string]: { en: string; ge: string; de: string; ru: string };
};

const uiTranslations: Translations = {
  search: {
    en: "Search menu...",
    ge: "მენიუს ძებნა...",
    de: "Menü durchsuchen...",
    ru: "Поиск в меню...",
  },
  callWaiter: {
    en: "Call Waiter",
    ge: "მიმტანის გამოძახება",
    de: "Kellner rufen",
    ru: "Вызвать официанта",
  },
  requestBill: {
    en: "Request Bill",
    ge: "ანგარიში",
    de: "Rechnung bitte",
    ru: "Счет, пожалуйста",
  },
  outOfStock: {
    en: "Out of Stock",
    ge: "არ არის მარაგში",
    de: "Nicht verfügbar",
    ru: "Нет в наличии",
  },
  chefSpecial: {
    en: "Chef's Special",
    ge: "შეფის სპეციალური",
    de: "Empfehlung des Küchenchefs",
    ru: "Спецпредложение шефа",
  },
  spicy: { en: "Spicy", ge: "ცხარე", de: "Scharf", ru: "Острое" },
  vegan: { en: "Vegan", ge: "ვეგანური", de: "Vegan", ru: "Веганское" },
  newItem: { en: "New", ge: "ახალი", de: "Neu", ru: "Новинка" },
  allCategories: { en: "All", ge: "ყველა", de: "Alle", ru: "Все" },
  adminLogin: {
    en: "Admin Login",
    ge: "ადმინის შესვლა",
    de: "Admin-Anmeldung",
    ru: "Вход для админа",
  },
  password: { en: "Password", ge: "პაროლი", de: "Passwort", ru: "Пароль" },
  login: { en: "Login", ge: "შესვლა", de: "Anmelden", ru: "Войти" },
  logout: { en: "Logout", ge: "გამოსვლა", de: "Abmelden", ru: "Выйти" },
  dashboard: {
    en: "Dashboard",
    ge: "დაფა",
    de: "Dashboard",
    ru: "Панель управления",
  },
  addItem: {
    en: "Add Item",
    ge: "დამატება",
    de: "Hinzufügen",
    ru: "Добавить блюдо",
  },
  editItem: {
    en: "Edit Item",
    ge: "რედაქტირება",
    de: "Bearbeiten",
    ru: "Редактировать",
  },
  deleteItem: { en: "Delete", ge: "წაშლა", de: "Löschen", ru: "Удалить" },
  save: { en: "Save", ge: "შენახვა", de: "Speichern", ru: "Сохранить" },
  cancel: { en: "Cancel", ge: "გაუქმება", de: "Abbrechen", ru: "Отмена" },
  title: { en: "Title", ge: "სათაური", de: "Titel", ru: "Заголовок" },
  description: {
    en: "Description",
    ge: "აღწერა",
    de: "Beschreibung",
    ru: "Описание",
  },
  price: { en: "Price", ge: "ფასი", de: "Preis", ru: "Цена" },
  category: {
    en: "Category",
    ge: "კატეგორია",
    de: "Kategorie",
    ru: "Категория",
  },
  categories: {
    en: "Categories",
    ge: "კატეგორიები",
    de: "Kategorien",
    ru: "Категории",
  },
  menuItems: {
    en: "Menu Items",
    ge: "მენიუს ერთეულები",
    de: "Menüpunkte",
    ru: "Блюда меню",
  },
  settings: {
    en: "Settings",
    ge: "პარამეტრები",
    de: "Einstellungen",
    ru: "Настройки",
  },
  analytics: {
    en: "Analytics",
    ge: "ანალიტიკა",
    de: "Analytik",
    ru: "Аналитика",
  },
  mostViewed: {
    en: "Most Viewed",
    ge: "ყველაზე ნახული",
    de: "Am meisten angesehen",
    ru: "Популярные",
  },
  views: { en: "views", ge: "ნახვა", de: "Aufrufe", ru: "просмотры" },
  image: {
    en: "Image URL",
    ge: "სურათის URL",
    de: "Bild-URL",
    ru: "Ссылка на изображение",
  },
  badges: { en: "Badges", ge: "ბეჯები", de: "Abzeichen", ru: "Значки" },
  addCategory: {
    en: "Add Category",
    ge: "კატეგორიის დამატება",
    de: "Kategorie hinzufügen",
    ru: "Добавить категорию",
  },
  categoryName: {
    en: "Category Name",
    ge: "კატეგორიის სახელი",
    de: "Kategoriename",
    ru: "Название категории",
  },
  stock: { en: "In Stock", ge: "მარაგშია", de: "Auf Lager", ru: "В наличии" },
  portionSizes: {
    en: "Portion Sizes",
    ge: "პორციის ზომები",
    de: "Portionsgrößen",
    ru: "Размеры порций",
  },
  allergens: {
    en: "Allergens",
    ge: "ალერგენები",
    de: "Allergene",
    ru: "Аллергены",
  },
  noAllergens: {
    en: "No common allergens",
    ge: "არ შეიცავს ალერგენებს",
    de: "Keine häufigen Allergene",
    ru: "Нет аллергенов",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getTranslated: (item: {
    en: string;
    ge: string;
    de: string;
    ru: string;
  }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("ge");

  const t = (key: string): string => {
    return uiTranslations[key]?.[language] || key;
  };

  const getTranslated = (item: any) => {
    // 1. თუ საერთოდ არ არსებობს ობიექტი
    if (!item) return "";

    // 2. თუ პირდაპირ სტრინგია (ზოგჯერ ბაზიდან ასე მოდის შეცდომით)
    if (typeof item === "string") return item;

    // 3. თუ ობიექტია, ვეძებთ მიმდინარე ენას, მერე ინგლისურს, მერე ნებისმიერ პირველს
    return (
      item[language] || item["ge"] || item["en"] || Object.values(item)[0] || ""
    );
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t, getTranslated }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
