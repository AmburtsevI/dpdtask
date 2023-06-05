import React, { useState, useRef, useEffect } from "react";

const Tooltip = ({ text, children, date, id }) => {
  const [show, setShow] = useState(false);
  const tooltipRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="tooltip-container"
      ref={tooltipRef}
      onClick={() => setShow(!show)}
    >
      {children}
      {show && (
        <div className={`tooltip`}>
          {text} <br /> <span>{date}</span>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
