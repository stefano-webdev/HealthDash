import { useState } from "react";
import "./NotificationsToggle.css";
import type { hospitalShape } from "../../Home/PatientsToday.tsx";

function NotificationsToggle() {
    const unknownData: string | null = localStorage.getItem("hospitalData");
    const initialSavedData: hospitalShape = unknownData ? JSON.parse(unknownData) : {};
    const [enabled, setEnabled] = useState<boolean>(initialToggleState());

    // Get initial toggle state from localStorage or set to default value (disabled)
    function initialToggleState(): boolean {
        if (initialSavedData.settings?.notificationsEnabled) {
            return initialSavedData.settings.notificationsEnabled;
        } else {
            return false;
        }
    }

    // Change the toggle state and save it to localStorage
    function handleToggle() {
        const unknownData: string | null = localStorage.getItem("hospitalData");
        const updatedSavedData: hospitalShape = unknownData ? JSON.parse(unknownData) : {};

        const updatedLocalData: hospitalShape = {
            ...updatedSavedData,
            settings: {
                ...updatedSavedData.settings,
                notificationsEnabled: !enabled
            }
        };
        localStorage.setItem("hospitalData", JSON.stringify(updatedLocalData));
        setEnabled(prev => !prev);
    }

    return (
        <div id="notificationsToggleCont">
            <p>Notifiche</p>
            <button id="switchNotificationsBtn" type="button" onClick={handleToggle}
                className={enabled ? "activeNotificationsBtn" : ""}>
                <span id="toggleCircle" className={enabled ? "activeToggleCircle" : ""}></span>
            </button>
        </div>
    );
}

export default NotificationsToggle;