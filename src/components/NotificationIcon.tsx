import React from 'react'
import {
  HiOutlineInformationCircle,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineXCircle,
} from 'react-icons/hi'

interface NotificationIconProps {
  /** The type of notification to determine which icon to display */
  type: string
}

/**
 * NotificationIcon component that renders different icons based on notification type
 * @param {NotificationIconProps} props - Component props
 * @param {string} props.type - The notification type (info, success, warning, error)
 * @returns {JSX.Element} The appropriate icon component
 */
export const NotificationIcon: React.FC<NotificationIconProps> = ({ type }) => {
  switch (type) {
    case 'success':
      return <HiOutlineCheckCircle className="w-5 h-5 mr-2 text-green-500" />
    case 'warning':
      return <HiOutlineExclamationCircle className="w-5 h-5 mr-2 text-yellow-500" />
    case 'error':
      return <HiOutlineXCircle className="w-5 h-5 mr-2 text-red-500" />
    case 'info':
    default:
      return <HiOutlineInformationCircle className="w-5 h-5 mr-2 text-blue-500" />
  }
}
