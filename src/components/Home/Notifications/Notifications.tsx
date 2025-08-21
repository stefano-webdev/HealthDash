import { useState, useEffect } from "react";
import notificationsData from "./NotificationsData.json";
import type { hospitalShape } from "../PatientsToday.tsx";
import "./Notifications.css";

interface Message {
    message: string;
};

interface Notifications {
    id: number;
    name: string;
    notifications: Message[];
};

type DailyNotifications = Notifications[];

function Notifications() {
    const [notifications, setNotifications] = useState<DailyNotifications>([]);

    useEffect(() => {
        // Today's date (YYYY-MM-DD)
        const today: string = new Date().toISOString().split("T")[0];

        // Check if we have today's notifications in localStorage
        const unknownData: string | null = localStorage.getItem("hospitalData");
        const savedData: hospitalShape = unknownData ? JSON.parse(unknownData) : {};

        if (savedData.notificationsToday && savedData.date === today) {
            // If we have today's notifications, we use them
            setNotifications(savedData.notificationsToday);
        } else {
            // Otherwise we generate new notifications
            const newData: DailyNotifications = generateNotifications(notificationsData as DailyNotifications);

            const updatedData: hospitalShape = {
                ...savedData,
                date: today,
                notificationsToday: newData
            };

            // Save the new notifications in localStorage
            localStorage.setItem("hospitalData", JSON.stringify(updatedData));

            setNotifications(newData);
        }
    }, []);

    function generateNotifications(data: DailyNotifications): DailyNotifications {
        // Shuffle the notifications
        const shuffledNotifications: DailyNotifications = [...data].sort(() => 0.5 - Math.random());
        const selectedNotifications: DailyNotifications = shuffledNotifications.slice(0, 3);

        // Return the selected notifications
        return selectedNotifications.map((section: Notifications): Notifications => {
            // Shuffle the messages and take 2 of them
            const shuffledMessages: Message[] = [...section.notifications].sort(() => 0.5 - Math.random());
            const selected: Message[] = shuffledMessages.slice(0, 1);

            // Return the notification with the selected message
            return {
                ...section,
                notifications: selected
            };
        });
    }

    return (
        <div id="notificationsCont">
            <div id="notificationsTitleCont">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M320 64C302.3 64 288 78.3 288 96L288 99.2C215 114 
                        160 178.6 160 256L160 277.7C160 325.8 143.6 372.5 113.6 
                        410.1L103.8 422.3C98.7 428.6 96 436.4 96 444.5C96 464.1 111.9 
                        480 131.5 480L508.4 480C528 480 543.9 464.1 543.9 444.5C543.9 
                        436.4 541.2 428.6 536.1 422.3L526.3 410.1C496.4 372.5 480 325.8 
                        480 277.7L480 256C480 178.6 425 114 352 99.2L352 96C352 78.3 337.7 
                        64 320 64zM258 528C265.1 555.6 290.2 576 320 576C349.8 576 374.9 
                        555.6 382 528L258 528z" />
                </svg>
                <h3>Notifiche</h3>
            </div>
            <div id="updateNotificationsCont">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M129.9 292.5C143.2 199.5 223.3 128 320 128C373 128 
                            421 149.5 455.8 184.2C456 184.4 456.2 184.6 456.4 184.8L464 
                            192L416.1 192C398.4 192 384.1 206.3 384.1 224C384.1 241.7 398.4 
                            256 416.1 256L544.1 256C561.8 256 576.1 241.7 576.1 224L576.1 
                            96C576.1 78.3 561.8 64 544.1 64C526.4 64 512.1 78.3 512.1 96L512.1 
                            149.4L500.8 138.7C454.5 92.6 390.5 64 320 64C191 64 84.3 159.4 66.6 
                            283.5C64.1 301 76.2 317.2 93.7 319.7C111.2 322.2 127.4 310 129.9 292.6zM573.4 
                            356.5C575.9 339 563.7 322.8 546.3 320.3C528.9 317.8 512.6 330 510.1 347.4C496.8 
                            440.4 416.7 511.9 320 511.9C267 511.9 219 490.4 184.2 455.7C184 455.5 183.8 
                            455.3 183.6 455.1L176 447.9L223.9 447.9C241.6 447.9 255.9 433.6 255.9 415.9C255.9 
                            398.2 241.6 383.9 223.9 383.9L96 384C87.5 384 79.3 387.4 73.3 393.5C67.3 399.6 63.9 
                            407.7 64 416.3L65 543.3C65.1 561 79.6 575.2 97.3 575C115 574.8 129.2 560.4 129 
                            542.7L128.6 491.2L139.3 501.3C185.6 547.4 249.5 576 320 576C449 576 555.7 480.6 
                            573.4 356.5z" />
                </svg>
                <small>24 ore</small>
            </div>
            <div id="allNotificationsCont">
                {notifications.map((noti: Notifications) => (
                    <div key={noti.id}>
                        <h4>{noti.name}</h4>
                        <p>{noti.notifications[0].message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Notifications;
export type { DailyNotifications };