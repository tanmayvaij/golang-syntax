import {showMessage} from 'react-native-flash-message';

export const messageType = {
  danger: 'danger',
  default: 'default',
  info: 'info',
  none: 'none',
  success: 'success',
  warning: 'warning',
};

export function displayMessage(message, type) {
  message &&
    showMessage({
      message: message,
      backgroundColor: '#6949FD',
      type: type, // danger, default, info, none, success, warning
    });
}
