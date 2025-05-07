import { useEffect } from "react";

const useModalCloseListener = (modalId, onClose) => {
    useEffect(() => {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        const handleClose = () => {
            if (typeof onClose === "function") {
                onClose();
            }
        };

        modal.addEventListener("hidden.bs.modal", handleClose);

        return () => {
            modal.removeEventListener("hidden.bs.modal", handleClose);
        };
    }, [modalId, onClose]);
};

export default useModalCloseListener;
