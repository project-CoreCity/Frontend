import PropTypes from "prop-types";
import { useRef, useEffect, useState } from "react";
import { handleClickOutside, handleKeyDown } from "@/utils/modal/handlers";
import { useSelector } from "react-redux";
import AuthenticationButton from "@/components/buttons/AuthenticationButton";
import NavigationButton from "@/components/buttons/NavigationButton";
import { handleSignOut } from "@/utils/authenticate/handlers";
import { closeIcon, signOutIcon, listIcon } from "@/assets/svgIcons";
import RequestList from "./RequestList";
import useLoadPendingRequests from "@/hooks/useLoadPendingRequests";

function ModalContent({ onClose, triggerRef }) {
  const modalRef = useRef();
  const firstElementRef = useRef();
  const lastElementRef = useRef();
  const userInfo = useSelector((state) => state.user);
  const [isVisible, setIsVisible] = useState(false);

  useLoadPendingRequests();

  useEffect(() => {
    firstElementRef.current?.focus();

    setIsVisible(true);

    const mouseEventHandler = handleClickOutside(triggerRef, modalRef, onClose);
    const keyEventHandler = handleKeyDown(
      onClose,
      firstElementRef,
      lastElementRef,
    );

    document.addEventListener("mousedown", mouseEventHandler);
    document.addEventListener("keydown", keyEventHandler);

    return () => {
      document.removeEventListener("mousedown", mouseEventHandler);
      document.removeEventListener("keydown", keyEventHandler);

      setIsVisible(false);
    };
  }, [onClose, triggerRef, modalRef, firstElementRef, lastElementRef]);

  const modalClass = `absolute w-1/4 top-16 right-0 bg-black/25 rounded-3xl text-white transition-opacity duration-500 ease-in-out ${
    isVisible ? "opacity-100" : "opacity-0"
  }`;

  return (
    <div ref={modalRef} className={modalClass}>
      <button
        ref={firstElementRef}
        className="absolute p-3 top-0 right-0 rounded-full hover:bg-white/20"
        aria-label="Close user menu button"
        onClick={onClose}
      >
        {closeIcon}
      </button>

      <div className="flex justify-center my-5 text-normal">
        {userInfo.email}
      </div>

      <div className="w-full">
        <RequestList />
      </div>

      <div className="flex items-center justify-center gap-1 my-5">
        <NavigationButton
          path={"/server-addresses"}
          title="Server list"
          icon={listIcon}
          css="flex items-center justify-center px-3 py-3 rounded-md bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-300 hover:to-cyan-300 text-lg font-medium text-[#0000BA]"
          ariaLabel="Server list view button"
        />

        <AuthenticationButton
          ref={lastElementRef}
          handler={handleSignOut}
          title="Sign out"
          icon={signOutIcon}
          css="flex items-center justify-center px-3 py-3 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-300 hover:to-blue-300 text-lg font-medium text-[#0000BA]"
          ariaLabel="Sign out button"
        />
      </div>
    </div>
  );
}

ModalContent.propTypes = {
  onClose: PropTypes.func.isRequired,
  triggerRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }),
};

export default ModalContent;
