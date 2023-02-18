import React, { useMemo } from 'react';
import './index.less';

export default (props) => {
  const { icon, title, desc } = props;

  return (
    <div className="t-layout-exception">
      <div className="t-content">
        <div className="t-icon-wrapper">
          <div className="t-icon" style={{ backgroundImage: `url(${icon}?v=${imageVersion})` }} />
        </div>
        <div className="t-title">{title}</div>
        <div className="t-desc">{desc}</div>
      </div>
    </div>
  );
};
