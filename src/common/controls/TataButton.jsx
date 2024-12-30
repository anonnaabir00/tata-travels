import './style.css';
import { CircleArrowRight } from 'lucide-react';

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
                fontSize: "16px"
            }}
        >
            {prefix} {label} <div className="ml-2 mt-1.5"><CircleArrowRight size={16} /></div>
        </button>
    );
};

export default TataButton;