import PropTypes from "prop-types";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { chevronRightIcon } from "@/assets/svgIcons";

function DashboardButton({ address, text, css }) {
  const navigate = useNavigate();

  const handleNavigation = useCallback(() => {
    navigate(`/dashboard?address=${encodeURIComponent(address)}`, {
      state: { address: address },
    });
  }, [navigate, address]);

  return (
    <button className={css} onClick={handleNavigation}>
      {text}
      {chevronRightIcon}
    </button>
  );
}

DashboardButton.propTypes = {
  address: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  css: PropTypes.string.isRequired,
};

export default DashboardButton;
