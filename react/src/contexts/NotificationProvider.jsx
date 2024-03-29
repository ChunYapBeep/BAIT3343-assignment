import { createContext, useContext, useState } from "react";
import Swal from 'sweetalert2';

const StateContext = createContext({
    successNotification: null,
    failNotification: null,
    deleteNotifcation: null,
    setDeleteNotification: () => { },
    setSuccessNotification: () => { },
    setFailNotification: () => { },

})

export const NotificationProvider = ({ children }) => {
    const [successNotification, _setSuccessNotification] = useState('');
    const [failNotification, _setFailNotification] = useState('');
    const [deleteNotification, _setDeleteNotification] = useState('');


    const setSuccessNotification = message => {
        Swal.fire({
            type: 'success',
            icon: 'success',
            title: 'Success',
            text: message,
            customClass: 'swal-wide',
        })

    }

    const setFailNotification = message => {
        Swal.fire({
            icon: 'error',
            title: message,
            showCloseButton: true,
            showCancelButton: true,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            }
        })

    }

    const setDeleteNotification = () => {
        return Swal.fire({
          title: 'Are you sure?!',
          text: 'Record will be deleted',
          type: 'warning',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Delete Record',
        }).then((result) => {
          if (result.value) {
            return result.value;
          } else {
            return null;
          }
        });
      };
      

    return (
        <StateContext.Provider value={{
            successNotification,
            failNotification,
            deleteNotification,
            setSuccessNotification,
            setDeleteNotification,
            setFailNotification
        }}>
            {children}
        </StateContext.Provider>
    );
}

export const useNotificationContext = () => useContext(StateContext);