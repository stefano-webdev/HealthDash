import "./LogoComponent.css"

function LogoComponent() {
    return (
        <svg id="logoComponent" viewBox="0 0 100 100">
            <polyline
                points="40,20 60,20 60,40 80,40 80,60 60,60 60,80 
                40,80 40,60 20,60 20,40 40,40 40,20"
            />
        </svg>
    );
}

export default LogoComponent;