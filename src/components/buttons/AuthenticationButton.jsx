import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function AuthenticationButton({ handler, title, css, icon }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <button
      className={css}
      onClick={() => {
        handler(dispatch, navigate);
      }}
    >
      {icon}
      {title}
    </button>
  );
}

AuthenticationButton.propTypes = {
  handler: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  css: PropTypes.string.isRequired,
  icon: PropTypes.node,
};

export default AuthenticationButton;
