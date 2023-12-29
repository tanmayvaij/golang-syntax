import axios from "axios";
import Constants from "./constant";
import { validateNubmer } from "./validation";
var Buffer = require("buffer/").Buffer;
import moment from "moment";
import { KeyboardTypeOptions } from "react-native";
import { AsYouType } from "libphonenumber-js";
import { showMessage } from "react-native-flash-message";

class EcomHelper {
  removeBracket(str) {
    return str.replace("(", "").replace(")", "");
  }

  genHexString(len) {
    const hex = "0123456789abcdef";
    let output = "";
    for (let i = 0; i < len; ++i) {
      output += hex.charAt(Math.floor(Math.random() * hex.length));
    }
    return output;
  }

  getRandomGUID() {
    return (
      this.genHexString(8) +
      "-" +
      this.genHexString(4) +
      "-" +
      this.genHexString(4) +
      "-" +
      this.genHexString(4) +
      "-" +
      this.genHexString(12)
    );
  }

  // 2022-03-21T20:39:00.104Z
  getFormattedDate() {
    const now = moment().format("yyyy-MM-DDThh:mm:ss.SSS") + "Z";
    return now;
  }

  getFormattedPhoneNumber(text) {
    let phoneNumber;
    try {
      let formatted = new AsYouType("GB").input(text);
      // Don't let the auto formatter add a trailing paren
      // otherwise the user will not be able to delete the paren
      // and the formatter will keep adding it
      if (formatted.endsWith(")") && !text.endsWith(")")) {
        formatted = formatted.slice(0, formatted.lastIndexOf(")"));
      }
      phoneNumber = formatted;
    } catch (e) {
      phoneNumber = text;
      console.error(e);
    }
    return phoneNumber;
  }

  // 2022-03-21 In ECOM API integration.
  formatDate() {
    const now = moment().format("yyyy-MM-DD");
    return now;
  }

  /* Get base64 from ImageURL for storing on local */
  getBase64FromUrl(url) {
    return axios
      .get(url, {
        responseType: "arraybuffer",
      })
      .then((response) => {
        return Buffer.from(response.data, "binary").toString("base64");
      })
      .catch((err) => {
        console.log("### ECOMHelper | getBase64FromUrl | catch ###", err);
        return "error";
      });
  }

  setFileName(extention) {
    const today = new Date();
    const subDir =
      today.getFullYear() +
      "-" +
      parseInt((today.getMonth() + 1).toString(), 10) +
      "/";
    return (
      Constants.STORAGEDIRECTORY +
      subDir +
      Date.now().toString() +
      "." +
      extention
    );
  }

  getDateFromTimestamp(mileseconds) {
    const d = new Date(mileseconds);
    return d.toDateString();
  }

  cleanPhoneNumber(phoneNumber) {
    // Remove everything except digits and plus
    return phoneNumber.replace(/[^+\d]/g, "");
  }

  // convert numeric string to number
  convertStringToNumber(str) {
    if (!validateNubmer(str)) {
      return 0;
    }
    return parseInt(str, 10);
  }

  getTotalDays(sdate, edate) {
    let diff = 0;
    if (typeof sdate == "object") {
      sdate = sdate.timestamp;
      edate = edate.timestamp;
    } else {
      sdate = parseInt(sdate);
      edate = parseInt(edate);
    }
    diff = Math.round(moment(edate).utc().diff(sdate, "days", true));

    return diff + 1;
  }

  getDateString(data) {
    const string = moment(data).utc().format("YYYY-MM-DD");
    return string;
  }

  // Site Details
  // validateNormalTitle(data) {
  //   inputText.replace(/[^a-zA-Z0-9\s]/g, '');
  // }

  showInfoMessage(txt) {
    showMessage({
      message: txt,
      type: "info",
      position: "top",
      floating: true,
    });
  }

  showErrorMessage(txt) {
    showMessage({
      message: txt,
      type: "danger",
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

  // create manufacturer years
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
