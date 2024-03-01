// import React, { useState } from 'react';
// import AnalogClock from './AnalogClock'; // Import the AnalogClock component
// import DarkModeToggle from '../Darkmode/DarkModeToggle'; // Import the DarkModeToggle component
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faClock } from '@fortawesome/free-solid-svg-icons';

// const ClockToggle = () => {
//   const [showClock, setShowClock] = useState(false); // State to toggle clock visibility

//   const toggleClock = () => {
//     setShowClock(!showClock);
//   };

//   return (
//     <div style={{ position: 'relative', marginBottom: '10px' }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
//         <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
//           <button className="btn btn-primary rounded-pill" onClick={toggleClock}>
//             <FontAwesomeIcon icon={faClock} />
//           </button>
//         </div>
//         <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
//           <DarkModeToggle />
//         </div>
//       </div>
//       {showClock && <AnalogClock style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '9999' }} />}
//     </div>
//   );
// };

// export default ClockToggle;
import React, { useState } from 'react';
import AnalogClock from './AnalogClock'; // Import the AnalogClock component
import DarkModeToggle from '../Darkmode/DarkModeToggle'; // Import the DarkModeToggle component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

const ClockToggle = () => {
  const [showClock, setShowClock] = useState(false); // State to toggle clock visibility

  const toggleClock = () => {
    setShowClock(!showClock);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='mb-0  p-2 pb-0 pt-0'>
        <button className=" bg-transparent mt-1 mb-1 border-0 d-flex align-items-center" onClick={toggleClock}>
          <FontAwesomeIcon icon={faClock} className="" />
        </button>
        <div className="ms-3">
          
          <DarkModeToggle />
        </div>
      </div>
      {showClock && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '1000' }}>
          <AnalogClock />
        </div>
      )}
    </div>
  );
};

export default ClockToggle;
