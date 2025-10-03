import { useState, useEffect } from "react";
import InputField from "../InputField/InputField.tsx";
import ThemeSelector from "../ThemeSelector/ThemeSelector.tsx";
import BorderRadiusSelector from "../BorderRadiusSelector/BorderRadiusSelector.tsx";
import NotificationsToggle from "../NotificationsToggle/NotificationsToggle.tsx";
import AccountManagement from "../AccountManagement/AccountManagement.tsx";
import type { hospitalShape } from "../../Home/PatientsToday.tsx";
import "./Settings.css";

interface UserData {
    name: string;
    surname: string;
    email: string;
    password: string;
}

function Settings() {
    const unknownData: string | null = localStorage.getItem("hospitalData");
    const savedData: hospitalShape = unknownData ? JSON.parse(unknownData) : {};
    const [userData, setUserData] = useState<UserData>(initialUserData());
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [confirmMessage, setConfirmMessage] = useState<{ message: string, type: "success" | "error" } | null>(null);

    // Handle input changes
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    // Get initial user data from localStorage or set to default values
    function initialUserData(): UserData {
        if (savedData.settings?.userProfile) {
            return {
                name: savedData.settings.userProfile.name,
                surname: savedData.settings.userProfile.surname,
                email: savedData.settings.userProfile.email,
                password: savedData.settings.userProfile.password
            };
        } else {
            return {
                name: "Stefano",
                surname: "Quaranta",
                email: "stefanoquaranta.web@gmail.com",
                password: "HealthDash25*"
            };
        }
    }

    // Save user data changes on localStorage
    function handleSubmitUpdates(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const updatedData: hospitalShape = {
            ...savedData,
            settings: {
                ...savedData.settings,
                userProfile: {
                    name: userData.name,
                    surname: userData.surname,
                    email: userData.email,
                    password: userData.password
                }
            }
        };
        localStorage.setItem("hospitalData", JSON.stringify(updatedData));
        const activeEl = document.activeElement as HTMLElement;
        if (activeEl && event.currentTarget.contains(activeEl)) {
            activeEl.blur();
        }

        setShowPassword(false);
        setConfirmMessage({ message: "Modifiche salvate con successo!", type: "success" });
        setTimeout(() => {
            setConfirmMessage(null);
        }, 3500);
    }

    // Scroll to top on component mount
    useEffect(() => {
        window.scrollTo(0, 0);

        if (savedData.settings?.userProfile) {
            setUserData({
                name: savedData.settings.userProfile.name,
                surname: savedData.settings.userProfile.surname,
                email: savedData.settings.userProfile.email,
                password: savedData.settings.userProfile.password
            });
        }
    }, []);

    return (
        <>
            <div className="currentRoute">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 
                        58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 
                        139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 
                        297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 
                        390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 
                        496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 
                        365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 
                        490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 
                        430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 
                        320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 
                        158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 
                        143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 
                        240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z"/>
                </svg>
                <h2>IMPOSTAZIONI</h2>
            </div>

            <div className="routeCont">
                <div className="flexGroup">
                    <form id="formSettings" onSubmit={handleSubmitUpdates}>
                        {/* User profile */}
                        <div style={{ width: "100%" }} className="flexSettings">
                            <h3>Profilo utente</h3>
                            <div id="userSettingsCont">
                                <InputField type="text" label="Nome" placeholder="Nome"
                                    value={userData.name} onChange={handleChange} name="name"
                                    id="nameSettings" />

                                <InputField type="text" label="Cognome" placeholder="Cognome"
                                    value={userData.surname} onChange={handleChange} name="surname"
                                    id="surnameSettings" />

                                <InputField type="email" label="Email" placeholder="Email"
                                    value={userData.email} onChange={handleChange} name="email"
                                    id="emailSettings" />

                                <InputField type="password" label="Password" placeholder="Password"
                                    value={userData.password} onChange={handleChange} name="password"
                                    id="passwordSettings" showPassword={showPassword} setShowPassword={setShowPassword} />
                            </div>
                            <button type="submit" id="saveUserChanges" className="buttonMainRed">Salva modifiche</button>
                        </div>
                    </form>

                    {/* UI preferences */}
                    <div className="flexSettings">
                        <h3>Preferenze UI</h3>
                        <div id="UISelectorsCont">
                            <ThemeSelector />
                            <BorderRadiusSelector />
                        </div>
                    </div>
                </div>

                <div className="flexGroup">
                    {/* Notifications */}
                    <div className="flexSettings">
                        <h3>Aggiornamenti</h3>
                        <div id="notificationsSettingsCont">
                            <NotificationsToggle />
                        </div>
                    </div>

                    {/* Account management */}
                    <div className="flexSettings">
                        <h3>Gestione account</h3>
                        <div id="accountManagementCont">
                            <AccountManagement />
                        </div>
                    </div>
                </div>
            </div>
            {confirmMessage && (
                <div className={`confirmMessageCont ${confirmMessage.type === "success" ? "positive" : "negative"}`}>
                    <p>{confirmMessage.message}</p>
                </div>
            )}
        </>
    );
}

export default Settings;