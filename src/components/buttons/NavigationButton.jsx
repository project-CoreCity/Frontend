import PropTypes from "prop-types";
import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function NavigationButton({ path, title, css, icon }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = useCallback(() => {
    if (location.pathname === path) {
      return;
    }

    navigate(path);
  }, [navigate, path, location.pathname]);

  return (
    <div>
      <button className={css} onClick={handleNavigation}>
        {icon}
        {title}
      </button>
    </div>
  );
}

NavigationButton.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  css: PropTypes.string.isRequired,
  icon: PropTypes.node,
};

export default NavigationButton;
