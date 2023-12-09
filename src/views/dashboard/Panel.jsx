import PropTypes from "prop-types";

function Panel({ children }) {
  return (
    <div className="grid grid-cols-9 gap-4 pt-32 ml-10 w-2/5 text-center text-white">
      {children}
    </div>
  );
}

Panel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Panel;
