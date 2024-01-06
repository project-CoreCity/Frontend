import PropTypes from "prop-types";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

function DashboardButton({ address, text, css }) {
  const navigate = useNavigate();

  const handleNavigation = useCallback(() => {
    navigate(`/dashboard?address=${encodeURIComponent(address)}`, {
      state: { address: address },
    });
  }, [navigate, address]);

  return (
    <span className={css} onClick={handleNavigation}>
      {text}
    </span>
  );
}

DashboardButton.propTypes = {
  address: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  css: PropTypes.string.isRequired,
};

export default DashboardButton;
