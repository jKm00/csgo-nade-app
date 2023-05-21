import { toast } from '@zerodevx/svelte-toast'

export const success = (message: string) => toast.push(message, {
  theme: {
    '--toastContainerTop': '1.5rem',
    '--toastContainerRight': 'auto',
    '--toastContainerBottom': 'auto',
    '--toastContainerLeft': '1rem',
    '--toastBackground': 'rgba(74 222 128 / 0.2)',
    '--toastColor': 'rgba(74 222 128 / 1)',
    '--toastBorder': '1px solid rgba(74 222 128 / 1)',
    '--toastBorderRadius': '0.25rem',
    '--toastBarBackground': 'rgba(74 222 128 / 1',
    '--toastMsgPadding': '0.5rem 0.5rem'
  }
})

export const error = (message: string) => toast.push(message, {
  theme: {
    '--toastBackground': 'red',
    '--toastColor': 'white',
    '--toastBarBackground': 'olive'
  }
})