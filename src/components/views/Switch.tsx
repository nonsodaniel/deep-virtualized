import { useState } from "react";
import "./views.scss";

const Switch = () => {
  // const [switch, setSwitch] = useState(false)
  const [toggleSwitch, setToggleSwitch] = useState(false);
  return (
    <div>
      <label className="toggle">
        <input className="toggle-checkbox" type="checkbox" />
        <div className="toggle-switch"></div>
        <span className="toggle-label">Turn On Cache</span>
      </label>
    </div>
  );
};

export default Switch;
