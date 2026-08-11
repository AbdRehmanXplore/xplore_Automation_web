import Button from '../Button/Button'
import './CalBookingButton.css'

const BOOKING_URL = 'https://calendar.app.google/CuQzTDs6hLHTZVZ47'

function CalBookingButton({
    children,
    variant = 'primary',
    className = '',
    showFreeBadge = false,
    onClick,
}) {
    const handleClick = (e) => {
        e.preventDefault()
        if (onClick) onClick()
        window.open(BOOKING_URL, '_blank', 'noopener,noreferrer')
    }

    const classes = [
        'cal-inline-trigger',
        showFreeBadge ? 'cal-has-badge' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <Button
            variant={variant}
            className={classes}
            onClick={handleClick}
        >
            <span>{children}</span>
            {showFreeBadge ? <span className="cal-badge mono">Free</span> : null}
        </Button>
    )
}

export default CalBookingButton
