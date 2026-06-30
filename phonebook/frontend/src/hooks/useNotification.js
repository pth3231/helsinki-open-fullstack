import { useState } from 'react';

const useNotification = () => {
  const [notiStatus, setNotiStatus] = useState({
    display: false,
    type: "info",
    content: ""
  });

  const showNotification = (type, content, duration = 5000) => {
    setNotiStatus({
      display: true,
      type,
      content
    });
    
    // Auto-hide notification after duration
    if (duration > 0) {
      setTimeout(() => {
        setNotiStatus(prev => ({
          ...prev,
          display: false
        }));
      }, duration);
    }
  };

  const hideNotification = () => {
    setNotiStatus(prev => ({
      ...prev,
      display: false
    }));
  };

  return {
    notiStatus,
    showNotification,
    hideNotification,
    setNotiStatus
  };
};

export default useNotification;