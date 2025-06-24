/**
 * Enumeration of notification types
 */
export enum NotificationType {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

/**
 * Type representing notification type strings
 */
export type NotificationTypeString = keyof typeof NotificationType

/**
 * Interface for notification objects
 */
export interface Notification {
  /** The type of notification (info, success, warning, error) */
  type: NotificationType | string
  /** The notification message text */
  message: string
}

/**
 * DTO for notification details received from SignalR
 */
export interface NotificationDetailDto {
  /** The notification type code */
  typeCode: string
  /** The source identifier */
  sourceId: string
  /** Optional notification data/message */
  data?: string
}

/**
 * Interface for client registration request to SignalR hub
 */
export interface RegisterClientRequest {
  /** Unique client identifier */
  clientId: string
  /** Display name for the client */
  clientName: string
  /** Interface type (e.g., 'web', 'mobile') */
  interfaceName: string
}
