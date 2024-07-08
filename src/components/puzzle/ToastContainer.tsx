import { ToastContainer as ToastCon, Bounce } from 'react-toastify'

type Props = {}

export default function ToastContainer({}: Props) {
  return (
    <>
        <ToastCon
            position='top-right'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
            transition={Bounce}
            containerId={'toastContainer'}
            />
        <ToastCon />
    </>
  )
}