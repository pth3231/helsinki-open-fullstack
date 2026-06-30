import './Notification.css'
import { useEffect, useRef } from 'react';

const Notification = ({notiStatus}) => {
    const {type, content, display} = notiStatus;
    const notificationRef = useRef(null);

    useEffect(() => {
        if (notificationRef.current) {
            if (display) {
                notificationRef.current.classList.remove('noti-hidden');
            } else {
                notificationRef.current.classList.add('noti-hidden');
            }
        }
    }, [display]);

    const noti_type_class = `noti-${ (display) ? type : "hidden"}`;
    const noti_hidden_class = `${display ? '' : 'noti-hidden'}`;
    return <div 
        ref={notificationRef} 
        className={`${noti_type_class} ${noti_hidden_class}`}>
            <p className="noti-body">{content}</p>
    </div> 
}

export default Notification;