import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Dropdown } from 'react-bootstrap';

const gmtTimezones = [
  { value: '+5.5', label: '(GMT+05:30) Mumbai, Kolkata, Chennai, New Delhi', name: 'India' }, // Mumbai
  { value: '-8', label: '(GMT-08:00) Pacific Time (US & Canada)', name: 'California' }, // California
  { value: '-5', label: '(GMT-05:00) Eastern Time (US & Canada), Bogota, Lima', name: 'New York' }, // New York
  { value: '0', label: '(GMT) Western Europe Time, London, Lisbon, Casablanca', name: 'London' }, // London
  { value: '+10', label: '(GMT+10:00) Eastern Australia, Guam, Vladivostok', name: 'Sydney' }, // Sydney
  { value: '+8', label: '(GMT+08:00) Beijing, Perth, Singapore, Hong Kong', name: 'China' }, // China
  { value: '+9', label: '(GMT+09:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk', name: 'Tokyo' }, // Tokyo
  { value: '+1', label: '(GMT+01:00) Amsterdam, Berlin, Rome, Stockholm, Vienna', name: 'Berlin' }, // Berlin
];

const AnalogClock = () => {
  const [dateTime, setDateTime] = useState('');
  const [selectedTimezone, setSelectedTimezone] = useState('+5.5'); // Default: Mumbai

  useEffect(() => {
    const updateClock = () => {
      const d = new Date();
      const offset = parseFloat(selectedTimezone);
      const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
      const localDateTime = utc + (3600000 * offset);
      const newDate = new Date(localDateTime);

      const h = newDate.getHours();
      const m = newDate.getMinutes();
      const s = newDate.getSeconds();

      const hDeg = (h % 12) * 30 + m * (360 / 720);
      const mDeg = m * 6 + s * (360 / 3600);
      const sDeg = s * 6;

      const hEl = document.querySelector('.hour-hand');
      const mEl = document.querySelector('.minute-hand');
      const sEl = document.querySelector('.second-hand');

      hEl.style.transform = `rotate(${hDeg}deg)`;
      mEl.style.transform = `rotate(${mDeg}deg)`;
      sEl.style.transform = `rotate(${sDeg}deg)`;

      const formattedDateTime = `${getFormattedDay(newDate)}, ${getFormattedDate(newDate)} ${getFormattedTime(h, m)}`;
      setDateTime(formattedDateTime);
    };

    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, [selectedTimezone]);

  const handleTimezoneChange = (event) => {
    setSelectedTimezone(event.target.value);
  };

  const getFormattedDay = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  };

  const getFormattedDate = (date) => {
    const day = date.getDate();
    const suffix = getDaySuffix(day);
    const month = date.toLocaleString('default', { month: 'short' });
    return `${day}${suffix} ${month}`;
  };

  const getDaySuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const getFormattedTime = (hour, minute) => {
    const meridian = hour >= 12 ? 'PM' : 'AM';
    const twelveHour = hour % 12 || 12;
    return `${twelveHour}:${minute.toString().padStart(2, '0')} ${meridian}`;
  };

  return (
    <Card style={{ width: '300px', margin: '0 auto' }}>
      <Card.Body>
        <Card.Title className='text-center'>World Clock</Card.Title>
        <Dropdown className='text-center'>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            {gmtTimezones.find(zone => zone.value === selectedTimezone).name}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {gmtTimezones.map((timezone) => (
              <Dropdown.Item key={timezone.value} onClick={() => setSelectedTimezone(timezone.value)}>
                {timezone.label} - {timezone.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <div className="clock" style={{
          background: '#ececec',
          width: '150px', // Reduced width
          height: '150px', // Reduced height
          margin: '20px auto',
          borderRadius: '50%',
          border: '7px solid #333', // Adjusted border
          position: 'relative',
          boxShadow: '0 1vw 2vw -0.5vw rgba(0,0,0,0.8)' // Adjusted box shadow
        }}>
          <div>
 <span className="h12" style={{ position: 'absolute', top: '2px', left: '50%', transform: 'translateX(-50%)' }}>12</span>
 </div>
 <div>
   <span className="h6" style={{ position: 'absolute', bottom: '-5px', left: '46.5%'}}>6</span>
 </div>
 <div>
   <span className="h9" style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)' }}>9</span>
 </div>
 <div>
   <span className="h-3" style={{ position: 'absolute', top: '49%', right: '7px', transform: 'translateY(-50%)' }}>3</span>
 </div>
          <div className="hour-hand" style={{
            position: 'absolute',
            zIndex: '5',
            width: '2px', // Reduced width
            height: '32.5px', // Reduced height
            background: '#333',
            top: '39.5px', // Adjusted top
            transformOrigin: '50% 37px',
            left: '50%',
            marginLeft: '-1px',
            borderTopLeftRadius: '50%',
            borderTopRightRadius: '50%'
          }}></div>
          <div className="minute-hand" style={{
            position: 'absolute',
            zIndex: '6',
            width: '2px', // Reduced width
            height: '50px', // Reduced height
            background: '#666',
            top: '23px', // Adjusted top
            left: '50%',
            marginLeft: '-1px',
            borderTopLeftRadius: '50%',
            borderTopRightRadius: '50%',
            transformOrigin: '50% 52.5px'
          }}></div>
          <div className="second-hand" style={{
            position: 'absolute',
            zIndex: '7',
            width: '1px', // Reduced width
            height: '60px', // Reduced height
            background: 'gold',
            top: '13px', // Adjusted top
            left: '50%',
            marginLeft: '-0.5px',
            borderTopLeftRadius: '50%',
            borderTopRightRadius: '50%',
            transformOrigin: '50% 62.5px'
          }}></div>
          <div className="diallines"></div>
        </div>
        <div style={{ textAlign: 'center', fontSize: '16px' }}>{dateTime}</div>
        <p className='text-center' style={{fontSize:'5px'}}>Real time clock with 8 timezones</p>
      </Card.Body>
    </Card>
  );
};

export default AnalogClock;
