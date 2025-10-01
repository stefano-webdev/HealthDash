import { useState, useEffect } from "react";
import "./AccountManagement.css";
import type { hospitalShape } from "../../Home/PatientsToday.tsx";
// localStorage.clear()
type Menu = "open" | null;

function AccountManagement() {
    const unknownData: string | null = localStorage.getItem("hospitalData");
    const initialSavedData: hospitalShape = unknownData ? JSON.parse(unknownData) : {};
    const roleLangIT = {
        "Admin": "admin",
        "Medico": "doctor",
        "Infermiere": "nurse"
    };
    const roleLangEN = {
        "admin": "Admin",
        "doctor": "Medico",
        "nurse": "Infermiere"
    };
    const [role, setRole] = useState<string>(initialRole());
    const [openMenu, setOpenMenu] = useState<Menu>(null);

    // Get the initial role from localStorage or set to default value (Admin)
    function initialRole(): string {
        if (initialSavedData.settings?.role) {
            return roleLangEN[initialSavedData.settings.role as "admin" | "doctor" | "nurse"];
        } else {
            return "Admin";
        }
    }

    // Change the role and save it to localStorage
    function handleRole(selectedRole: "Admin" | "Medico" | "Infermiere") {
        const unknownData: string | null = localStorage.getItem("hospitalData");
        const updatedSavedData: hospitalShape = unknownData ? JSON.parse(unknownData) : {};

        const role = roleLangIT[selectedRole];
        const updatedData: hospitalShape = {
            ...updatedSavedData,
            settings: {
                ...updatedSavedData.settings,
                role: role
            }
        };

        localStorage.setItem("hospitalData", JSON.stringify(updatedData));

        setRole(selectedRole);
        setOpenMenu(null);
    }

    // Clicking the button opens/closes the choices dropdown
    function handleChoices(menu: Menu) {
        setOpenMenu(prev => prev === menu ? null : menu);
    }

    // Clicking outside of the choices dropdown closes it
    function handleClickOutside(e: MouseEvent) {
        if (!(e.target as HTMLElement).closest('.dropdownRoleCont')) {
            setOpenMenu(null);
        }
    }

    useEffect(() => {
        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div id="roleSelectorCont">
            <p>Ruolo</p>
            <div id="buttonRoleCont" className="dropdownRoleCont selectorBtnCont">
                <button type="button" onClick={() => handleChoices('open')}
                    className={openMenu === 'open' ? "choicesActive" : ""}>
                    {role}
                    <svg viewBox="0 0 200 200" className={openMenu === 'open' ? "rotate180" : ""}>
                        <polyline
                            points="15,110 100,180 185,110"
                            fill="none"
                            strokeWidth="30" />
                    </svg>
                </button>
                <div id="dropdownRole" className={`choicesDropdownCont ${openMenu === 'open' ? "fadeDownChoices" : ""}`}>
                    <div onClick={() => handleRole("Admin")}>
                        <svg className={`check ${role === 'Admin' ? "checkActive" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 
                                    543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 
                                    361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z" />
                        </svg>
                        Admin
                    </div>
                    <div onClick={() => handleRole("Medico")}>
                        <svg className={`check ${role === 'Medico' ? "checkActive" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 
                                    543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 
                                    361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z" />
                        </svg>
                        Medico
                    </div>
                    <div onClick={() => handleRole("Infermiere")}>
                        <svg className={`check ${role === 'Infermiere' ? "checkActive" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 
                                    543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 
                                    361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z" />
                        </svg>
                        Infermiere
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountManagement;