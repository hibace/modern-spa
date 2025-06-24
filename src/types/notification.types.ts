export enum NotificationType {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

export type NotificationTypeString = keyof typeof NotificationType

export interface Notification {
  type: NotificationType | string
  message: string
}

export interface NotificationDetailDto {
  typeCode: string
  sourceId: string
  data?: string
}

export interface RegisterClientRequest {
  clientId: string
  clientName: string
  interfaceName: string
}
