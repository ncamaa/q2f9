// import Notify from quasar
import { Notify } from 'quasar';

export const showErrorDialogFn = (str?: string) => {
  Notify.create({
    message: str || 'Error during login',
    color: 'negative',
    timeout: 2000,
    caption: 'Please try again',
    icon: 'report_problem',
    // enlarge the font
    classes: 'text-h6',
  });
};

// now create a similar one for success
export const showSuccessDialogFn = (message?: string, caption?: string) => {
  Notify.create({
    message: message || 'Success',
    color: 'positive',
    timeout: 2000,
    caption: caption || '',
    icon: 'check_circle',
    // enlarge the font
    classes: 'text-h6',
  });
};
