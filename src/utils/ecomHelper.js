import { showMessage } from "react-native-flash-message";

class EcomHelper {
  showInfoMessage(txt) {
    showMessage({
      message: txt,
      type: "info",
      position: "top",
      floating: true,
    });
  }

  showSuccessMessage(txt) {
    showMessage({
      message: txt,
      type: "success",
      position: "top",
      floating: true,
    });
  }

  getYears = (year) => {
    let array = [];
    for (let i = year; i <= new Date().getFullYear(); i++) {
      let json = { label: i.toString(), value: i };
      array.push(json);
    }

    const reversedArr = array.reverse();
    return reversedArr;
  };
}

const ecomHelper = new EcomHelper();
export default ecomHelper;
