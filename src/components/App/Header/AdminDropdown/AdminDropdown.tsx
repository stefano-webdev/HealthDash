import "./AdminDropdown.css"

type AdminDropdownProps = {
  open: boolean;
  onToggle: () => void;
};

function AdminDropdown({ open, onToggle }: AdminDropdownProps) {
    return (
        <>
            <button onClick={onToggle} id="adminButton">
                Admin
                <svg viewBox="0 0 200 200" className={`${open ? 'rotate180Admin' : ''}`}>
                    <polyline
                        points="15,110 100,180 185,110"
                        fill="none"
                        strokeWidth="30"
                        strokeLinecap="round"
                        strokeLinejoin="round" />
                </svg>
            </button>

            <ul className={`adminSettingsUl ${open ? 'fadeDownAdmin' : ''}`}>
                <li>Profilo</li>
                <li>Impostazioni</li>
                <li>Logout</li>
            </ul>
        </>
    );
}

export default AdminDropdown;