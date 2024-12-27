import './style.css';

const TataButton = ({ id, prefix, label, onClick, disable, htmlType = "button" }) => {
    return (
        <button
            id={id}
            className="tatabutton tatabutton--primary"
            onClick={onClick}
            type={htmlType}
            disabled={disable}
            style={{
                width: "100%",
                height: "20px",
                borderRadius: "8px",
                padding: "2.6rem",
            }}
        >
            {prefix} {label}
        </button>
    );
};

export default TataButton;