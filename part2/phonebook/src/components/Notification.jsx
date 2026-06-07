import './Notification.css'

const Notification = ({notiStatus}) => {
    const {type, content, display} = notiStatus;
    
    return (display) ? <div class={`noti-${type}`}>
        <p class="noti-body">{content}</p>
    </div> : <></>
}

export default Notification;