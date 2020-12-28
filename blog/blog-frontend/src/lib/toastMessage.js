import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify";


const showToastMessage = (messageText, messageType = "I")=>{
    toast.dismiss();
    toast.configure({
      position: toast.POSITION.BOTTOM_RIGHT,
      toastId: 1
    });
    if (messageType === "S") {
      toast.success(messageText);
    }
    if (messageType === "I") {
      toast.info(messageText);
    }
    if (messageType === "E") {
      toast.error(messageText);
    }
  }

  export default showToastMessage;