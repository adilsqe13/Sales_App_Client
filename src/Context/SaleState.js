import React, { useState } from 'react';
import saleContext from './saleContext';

export default function SaleState(props) {
  const [alert, setAlert] = useState(null);

  //SHOW ALERT
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);

  }

  return (
    <>
      <saleContext.Provider value={{ alert, showAlert }}>
        {props.children}
      </saleContext.Provider>
    </>
  )
}
