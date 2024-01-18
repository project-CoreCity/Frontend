import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import ModalContent from "./modal/ModalContent";
import { userIcon } from "@/assets/svgIcons";
import { useLocation } from "react-router-dom";

function UserMenu() {
  const allRequestsByAddress = useSelector(
    (state) => state.pendingRequests.requests,
  );

  const [showModal, setShowModal] = useState(false);
  const buttonRef = useRef();
  const location = useLocation();

  useEffect(() => {
    setShowModal(false);
  }, [location]);

  const totalRequestsCount = allRequestsByAddress.data
    ? allRequestsByAddress.data.reduce(
        (total, requestByAddress) => total + requestByAddress.requests.length,
        0,
      )
    : 0;

  const hasRequests =
    allRequestsByAddress.data &&
    allRequestsByAddress.data.some(
      (requestByAddress) => requestByAddress.requests.length > 0,
    );

  return (
    <>
      <button
        className="relative p-1 rounded-full hover:bg-white/20"
        aria-label={`Open user menu, ${
          hasRequests
            ? `${
                totalRequestsCount === 1
                  ? `${totalRequestsCount} new notification`
                  : `${totalRequestsCount} new notifications`
              }`
            : "no new notification"
        }`}
        ref={buttonRef}
        onClick={() => {
          setShowModal((prevShowModal) => !prevShowModal);
        }}
      >
        {hasRequests && (
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
