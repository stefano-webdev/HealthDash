import "./AdminDropdown.css"

type AdminDropdownProps = {
    open: boolean;
    onToggle: () => void;
};

function AdminDropdown({ open, onToggle }: AdminDropdownProps) {
    return (
        <>
            <div id="adminWrapper">
                <button onClick={onToggle} id="adminButton" aria-expanded={open} aria-controls="adminMenu">
                    Admin
                    <svg viewBox="0 0 200 200" className={`${open ? 'rotate180Admin' : ''}`}>
                        <polyline
                            points="15,110 100,180 185,110"
                            fill="none"
                            strokeWidth="30" />
                    </svg>
                </button>

                <ul id="adminMenu" className={`adminSettingsUl ${open ? 'fadeDownAdmin' : ''}`}>
                    <li>Profilo</li>
                    <li>Impostazioni</li>
                    <li>Logout</li>
                </ul>
            </div>
        </>
    );
}

export default AdminDropdown;