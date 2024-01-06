export const handleClickOutside = (triggerRef, modalRef, onClose) => {
  return (event) => {
    if (triggerRef.current && triggerRef.current.contains(event.target)) {
      return;
    }

    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };
};

export const handleKeyDown = (onClose) => {
  return (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };
};
