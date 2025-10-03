import { useState, useEffect } from "react";
import "./ThemeSelector.css";
import type { hospitalShape } from "../../Home/PatientsToday.tsx";

type Menu = "open" | null;

function ThemeSelector() {
    const unknownData: string | null = localStorage.getItem("hospitalData");
    const initialSavedData: hospitalShape = unknownData ? JSON.parse(unknownData) : {};
    const themeLangIT = {
        "Chiaro": "light",
        "Scuro": "dark"
    };
    const themeLangEN = {
        "light": "Chiaro",
        "dark": "Scuro"
    };
    const [theme, setTheme] = useState<string>(initialTheme());
    const [openMenu, setOpenMenu] = useState<Menu>(null);

    // Get the initial theme from localStorage or set to default value (Chiaro)
    function initialTheme(): string {
        if (initialSavedData.settings?.theme) {
            return themeLangEN[initialSavedData.settings.theme as "light" | "dark"];
        } else {
            return "Chiaro";
        }
    }

    // Change the theme and save it to localStorage
    function handleTheme(selectedTheme: "Chiaro" | "Scuro") {
        const unknownData: string | null = localStorage.getItem("hospitalData");
        const updatedSavedData: hospitalShape = unknownData ? JSON.parse(unknownData) : {};

        const theme = themeLangIT[selectedTheme];
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);

        const updatedData: hospitalShape = {
            ...updatedSavedData,
            settings: {
                ...updatedSavedData.settings,
                theme: theme
            }
        };

        localStorage.setItem("hospitalData", JSON.stringify(updatedData));

        setTheme(selectedTheme);
        setOpenMenu(null);
    }

    // Clicking the button opens/closes the choices dropdown
    function handleChoices(menu: Menu) {
        setOpenMenu(prev => prev === menu ? null : menu);
    }

    // Clicking outside of the choices dropdown closes it
    function handleClickOutside(e: MouseEvent) {
        if (!(e.target as HTMLElement).closest('.dropdownThemeCont')) {
            setOpenMenu(null);
        }
    }

    useEffect(() => {
        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div id="themeSelectorCont">
            <p>Tema</p>
            <div id="buttonThemeCont" className="dropdownThemeCont selectorBtnCont">
                <button id="themeButton" type="button" onClick={() => handleChoices('open')}
                    className={`btnSelector ${openMenu === 'open' ? "choicesActive" : ""}`}>
                    {theme}
                    <svg viewBox="0 0 200 200" className={openMenu === 'open' ? "rotate180" : ""}>
                        <polyline
                            points="15,110 100,180 185,110"
                            fill="none"
                            strokeWidth="30" />
                    </svg>
                </button>
                <div className={`choicesDropdownCont ${openMenu === 'open' ? "fadeDownChoices" : ""}`}>
                    <button onClick={() => handleTheme("Chiaro")} type="button" tabIndex={openMenu ? 0 : -1}>
                        <svg className={`check ${theme === 'Chiaro' ? "checkActive" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 
                                    543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 
                                    361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z" />
                        </svg>
                        Chiaro
                    </button>
                    <button onClick={() => handleTheme("Scuro")} type="button" tabIndex={openMenu ? 0 : -1}>
                        <svg className={`check ${theme === 'Scuro' ? "checkActive" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 
                                    543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 
                                    361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z" />
                        </svg>
                        Scuro
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ThemeSelector;