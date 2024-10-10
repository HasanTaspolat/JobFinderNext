import {NextUIProvider} from '@nextui-org/react'
import 'react-toastify/dist/ReactToastify.css';

export function Providers({children}: { children: React.ReactNode }) {

  return (
    
    <NextUIProvider>
      {children}
    </NextUIProvider>

  )
}