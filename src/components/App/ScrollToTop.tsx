import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
    const { pathname } = useLocation();

    // Unfortunately on mobile decices the route change create a flickering effect, probably due to the UI not being fully loaded
    useEffect(() => {
        if (window.innerWidth >= 1200 && window.matchMedia("(pointer: fine)").matches) {
            // Desktop devices, scroll instantly
            window.scrollTo(0, 0);
        } else {
            // Mobile devices, scroll smoothly
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }, [pathname]);

    return null;
}

export default ScrollToTop;