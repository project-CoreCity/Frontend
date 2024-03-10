import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import ModalContent from "./modal/ModalContent";
import { userIcon, hamburgerIcon } from "@/assets/svgIcons";
import { useLocation } from "react-router-dom";

function UserMenu() {
  const approvalRequestServerList = useSelector(
    (state) => state.approvalRequestServerList.serverList,
  );

  const [showModal, setShowModal] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const buttonRef = useRef();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setShowModal(false);
  }, [location]);

  const totalApprovalRequests = approvalRequestServerList.data
    ? approvalRequestServerList.data.reduce(
        (total, server) => total + server.requestList.length,
        0,
      )
    : 0;

  const hasRequests =
    approvalRequestServerList.data &&
    approvalRequestServerList.data.some(
      (server) => server.requestList.length > 0,
    );

  const icon = windowWidth <= 1000 ? hamburgerIcon : userIcon;

  return (
    <>
      <button
        className="relative p-1 rounded-full hover:bg-white/20"
        aria-label={`Open user menu, ${
          hasRequests
            ? `${
                totalApprovalRequests === 1
                  ? `${totalApprovalRequests} new notification`
                  : `${totalApprovalRequests} new notifications`
              }`
            : "no new notification"
        }`}
        ref={buttonRef}
        onClick={() => {
          setShowModal((prevShowModal) => !prevShowModal);
        }}
      >
        {hasRequests && (
          <span className="absolute flex">
            <span className="absolute inline-flex h-full w-full right-2 top-0 bg-[#FF6915] rounded-full animate-ping"></span>
            <span className="relative inline-flex h-3 w-3 right-2 top-0 bg-[#FF6915] rounded-full"></span>
          </span>
        )}
        {icon}
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
