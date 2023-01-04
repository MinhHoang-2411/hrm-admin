import React from 'react';

const FieldData = ({label, value}) => {
  return (
    <div style={{marginBottom: '10px', fontSize: '15px'}}>
      <b style={{minWidth: '110px', display: 'inline-block'}}>{label}</b>: &nbsp; {value}
    </div>
  );
};

export default FieldData;
