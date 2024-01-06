import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import ModalContent from "./ModalContent";
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
      <div className="relative">
        {requests && requests.length !== 0 && (
          <div className="absolute text-xs text-[#FF6915] rounded-full">●</div>
        )}

        <button
          className="p-1 rounded-full hover:bg-white/20"
          ref={buttonRef}
          onClick={() => {
            setShowModal((prevShowModal) => !prevShowModal);
          }}
        >
          {userIcon}
        </button>
      </div>
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
