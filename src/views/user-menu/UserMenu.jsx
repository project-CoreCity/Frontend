import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import ModalContent from "./modal/ModalContent";
import { userIcon } from "@/assets/svgIcons";
import { useLocation } from "react-router-dom";

function UserMenu() {
  const requests = useSelector((state) => state.pendingRequests.requests.data);
  const [showModal, setShowModal] = useState(false);
  const buttonRef = useRef();
  const location = useLocation();

  useEffect(() => {
    setShowModal(false);
  }, [location]);

  return (
    <>
      <button
        className="relative p-1 rounded-full hover:bg-white/20"
        aria-label={`Open user menu, there ${
          requests && requests.length !== 1
            ? `are ${requests.length} new notifications`
            : "is a new notification"
        }`}
        ref={buttonRef}
        onClick={() => {
          setShowModal((prevShowModal) => !prevShowModal);
        }}
      >
        {requests && requests.length !== 0 && (
          <div className="absolute right-11 top-0 text-[#FF6915] rounded-full">
            ●
          </div>
        )}
        {userIcon}
      </button>

      {showModal &&
        createPortal(
          <ModalContent
            triggerRef={buttonRef}
            onClose={() => setShowModal(false)}
          />,
          document.body,
        )}
    </>
  );
}

export default UserMenu;
