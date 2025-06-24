import React from 'react'
import {
  HiOutlineInformationCircle,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineXCircle,
} from 'react-icons/hi'

interface NotificationIconProps {
  type: string
}

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
