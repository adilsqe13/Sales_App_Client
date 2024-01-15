import React, { useContext } from 'react';
import saleContext from '../Context/saleContext';

export default function Alert() {
  const context = useContext(saleContext);
  const { alert } = context;
  return (
    <>
      {alert && <div className={`alert alert-${alert.type} alert-style`} role="alert">
        {alert.msg}
      </div>}
    </>
  )
}
