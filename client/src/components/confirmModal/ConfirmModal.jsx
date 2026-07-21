import CloseIcon from "@mui/icons-material/Close";
import "./confirmModal.scss";

export const ConfirmModal = ({ 
  title = "Confirm Action", 
  message = "Are you sure you want to proceed?", 
  confirmText = "Delete", 
  onConfirm, 
  onClose,
  danger = true
}) => {
  return (
    <div className="confirmModalOverlay">
      <div className="confirmModalContainer">
        
        <div className="confirmModalHeader">
          <h3>{title}</h3>
          <button className="closeXBtn" onClick={onClose}>
            <CloseIcon size="small" />
          </button>
        </div>

        <div className="confirmModalBody">
          <p>{message}</p>
        </div>

        <div className="confirmModalActions">
          <button className="cancelBtn" onClick={onClose}>
            Cancel
          </button>
          <button 
            className={`confirmBtn ${danger ? "danger" : "primary"}`} 
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>

      </div>
    </div>
  );
};