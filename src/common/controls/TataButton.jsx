import './style.css';

const TataButton = ({ id, prefix, label, onClick, disable, htmlType = "button" }) => {
    return (
        <button
            id={id}
            className="fhbutton fhbutton--primary"
            onClick={onClick}
            type={htmlType}
            disabled={disable}
        >
            {prefix} {label}
        </button>
    );
};

export default TataButton;