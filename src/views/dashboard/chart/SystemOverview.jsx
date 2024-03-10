import PropTypes from "prop-types";

function SystemOverview({ title, children, detail1, detail2, additionalCss }) {
  const containerClasses = additionalCss
    ? `${additionalCss} rounded-3xl bg-black/25`
    : "rounded-3xl bg-black/25";
  const detailsCss = `mini:px-1 mini:py-3 mini:bg-transparent mini:font-semibold px-4 py-3 flex-none bg-black rounded-3xl`;

  return (
    <div className={containerClasses}>
      <div className="flex flex-col justify-between h-full">
        <h2 className="py-4 text-3xl font-thin">{title}</h2>

        {children}

        <div className="mini:py-0 py-4 flex gap-2 text-xs">
          <div className="flex-1"></div>

          <div className={detailsCss}>
            <span>&#9679; {detail1}</span>
          </div>

          <div className={detailsCss}>
            <span>&#9679; {detail2}</span>
          </div>

          <div className="flex-1"></div>
        </div>
      </div>
    </div>
  );
}

SystemOverview.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  detail1: PropTypes.string.isRequired,
  detail2: PropTypes.string.isRequired,
  additionalCss: PropTypes.string,
};

export default SystemOverview;
