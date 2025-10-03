import { useState, useEffect } from "react";
import type { hospitalShape } from "../../Home/PatientsToday.tsx";
type Menu = "open" | null;

function BorderRadiusSelector() {
    const unknownData: string | null = localStorage.getItem("hospitalData");
    const initialSavedData: hospitalShape = unknownData ? JSON.parse(unknownData) : {};
    const borderConverterWords = {
        "No": "brNo",
        "Media": "brMedium",
        "Alta": "brHigh"
    }
    const borderConverterClasses = {
        "brNo": "No",
        "brMedium": "Media",
        "brHigh": "Alta"
    }
    const [borderRadius, setBorderRadius] = useState<string>(initialBorderRadius());
    const [openMenu, setOpenMenu] = useState<Menu>(null);

    // Get the initial border radius from localStorage or set to default value (Media)
    function initialBorderRadius(): string {
        if (initialSavedData.settings?.borderRadius) {
            return borderConverterClasses[initialSavedData.settings.borderRadius as "brNo" | "brMedium" | "brHigh"];
        } else {
            return "Media";
        }
    }

    // Change the border radius and save it to localStorage
    function handleBorderRadius(selectedBorderRadius: "No" | "Media" | "Alta") {
        const unknownData: string | null = localStorage.getItem("hospitalData");
        const updatedSavedData: hospitalShape = unknownData ? JSON.parse(unknownData) : {};

        const borderRadius = borderConverterWords[selectedBorderRadius];
        document.documentElement.classList.remove("brNo", "brMedium", "brHigh");
        document.documentElement.classList.add(borderRadius);

        const updatedData: hospitalShape = {
            ...updatedSavedData,
            settings: {
                ...updatedSavedData.settings,
                borderRadius: borderRadius
            }
        };

        localStorage.setItem("hospitalData", JSON.stringify(updatedData));

        setBorderRadius(selectedBorderRadius);
        setOpenMenu(null);
    }

    // Clicking the button opens/closes the choices dropdown
    function handleChoices(menu: Menu) {
        setOpenMenu(prev => prev === menu ? null : menu);
    }

    // Clicking outside of the choices dropdown closes it
    function handleClickOutside(e: MouseEvent) {
        if (!(e.target as HTMLElement).closest('.dropdownBorderRadiusCont')) {
            setOpenMenu(null);
        }
    }

    useEffect(() => {
        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div id="borderRadiusSelectorCont">
            <p>Curvatura angoli</p>
            <div id="buttonBorderRadiusCont" className="dropdownBorderRadiusCont selectorBtnCont">
                <button id="borderRadiusButton" type="button" onClick={() => handleChoices('open')}
                    className={`btnSelector ${openMenu === 'open' ? "choicesActive" : ""}`}>
                    {borderRadius}
                    <svg viewBox="0 0 200 200" className={openMenu === 'open' ? "rotate180" : ""}>
                        <polyline
                            points="15,110 100,180 185,110"
                            fill="none"
                            strokeWidth="30" />
                    </svg>
                </button>
                <div id="dropdownBorderRadius" className={`choicesDropdownCont ${openMenu === 'open' ? "fadeDownChoices" : ""}`}>
                    <button onClick={() => handleBorderRadius("No")} type="button" tabIndex={openMenu ? 0 : -1}>
                        <svg className={`check ${borderRadius === 'No' ? "checkActive" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 
                                    543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 
                                    361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z" />
                        </svg>
                        No
                    </button>
                    <button onClick={() => handleBorderRadius("Media")} type="button" tabIndex={openMenu ? 0 : -1}>
                        <svg className={`check ${borderRadius === 'Media' ? "checkActive" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 
                                    543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 
                                    361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z" />
                        </svg>
                        Media
                    </button>
                    <button onClick={() => handleBorderRadius("Alta")} type="button" tabIndex={openMenu ? 0 : -1}>
                        <svg className={`check ${borderRadius === 'Alta' ? "checkActive" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 
                                    543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 
                                    361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z" />
                        </svg>
                        Alta
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BorderRadiusSelector;