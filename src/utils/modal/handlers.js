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

export const handleKeyDown = (onClose, firstElementRef, lastElementRef) => {
  return (event) => {
    if (event.key === "Escape") {
      onClose();
    }

    if (event.key === "Tab") {
      if (
        !event.shiftKey &&
        document.activeElement === lastElementRef.current
      ) {
        event.preventDefault();

        firstElementRef.current?.focus();
      }

      if (
        event.shiftKey &&
        document.activeElement === firstElementRef.current
      ) {
        event.preventDefault();

        lastElementRef.current?.focus();
      }
    }
  };
};
