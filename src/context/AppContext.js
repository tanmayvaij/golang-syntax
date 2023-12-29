import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AxiosContext } from "./AxiosContext";
import Constants from "../utils/constant";

const AppContext = createContext(null);

const AppContextProvider = (props) => {
  const axiosContext = useContext(AxiosContext);

  const [jobType, setJobType] = useState(null);
  const [isWarrant, setIsWarrant] = useState(false);

  const [hasStreamNumber, setHasStreamNumber] = useState(false);
  const [streamNumber, setStreamNumber] = useState(0);
  const [streamValue, setStreamValue] = useState([]);
  const [streamCounter, setStreamCounter] = useState(0);

  const [extraCounter, setExtraCounter] = useState(0);
  const [passedRemoval, setPassedRemoval] = useState(false);
  const [startRemoval, setStartRemoval] = useState(false);

  // CHOSEN ITEM or METER
  const [siteDetails, setSiteDetails] = useState(null);
  const [meterDetails, setMeterDetails] = useState(null);
  const [regulatorDetails, setRegulatorDetails] = useState(null);
  const [standardDetails, setStandardDetails] = useState(null);
  //.. removed
  const [removedSiteDetails, setRemovedSiteDetails] = useState(null);
  const [removedMeterDetails, setRemovedMeterDetails] = useState(null);
  //.. warant
  const [warrantDetails, setWarrantDetails] = useState(null);
  // ... Maintenance
  const [maintenanceDetails, setMaintenanceDetails] = useState(null);

  const [blobs, setBlogs] = useState([])

  useEffect(() => {
    console.log("appcontenxt, jobType", jobType);
  }, [jobType]);

  const setJobTypes = async (job) => {
    setJobType(job);
    console.log("Job type changed", job);
  };

  const postCall = async (url, data) => {
    return axios
      .post(url, data)
      .then((response) => {
        axiosContext?.setIsLoading(false);
        console.log(
          "%c postCall Response",
          "color: lightGray; font-weight: italic;",
          response
        );
        if (response.status === 200) {
          /// 200
          return {
            status: true,
            data: response.data,
          };
        } else {
          return {
            status: false,
            data: "Failed",
          };
        }
      })
      .catch((error) => {
        axiosContext?.setIsLoading(false);
        console.log("### Error", error.toString());
        return {
          status: false,
          data: "Failed",
        };
      });
  };

  const getCall = async (url) => {
    return axios
      .get(url)
      .then((response) => {
        axiosContext?.setIsLoading(false);
        console.log(
          "%c getCall Response",
          "color: lightGray; font-weight: italic;",
          response
        );
        if (response.status === 201) {
          /// 200
          return {
            status: true,
            data: response.data,
          };
        } else {
          return {
            status: false,
            data: "Failed",
          };
        }
      })
      .catch((error) => {
        axiosContext?.setIsLoading(false);
        console.log("### Error", error.toString());
        return {
          status: false,
          data: "Failed",
        };
      });
  };

  const signIn = async (email, password) => {
    return postCall(Constants.BASE_URL + "/app/signIn", {
      email: email,
      password: password,
    });
  };

  // PULL
  const pullAmrList = async () => {
    return getCall(Constants.BASE_URL + "/pull/amr");
  };

  const pullAssetList = async () => {
    return getCall(Constants.BASE_URL + "/pull/assets");
  };

  const pullContactDetailsList = async () => {
    return getCall(Constants.BASE_URL + "/pull/contactdetails");
  };

  const pullCorrectorList = async () => {
    return getCall(Constants.BASE_URL + "/pull/corrector");
  };

  const pullDataLoggerList = async () => {
    return getCall(Constants.BASE_URL + "/pull/datalogger");
  };

  const pullGasSafeWarningList = async () => {
    return getCall(Constants.BASE_URL + "/pull/gas_safe_warning");
  };

  const pullJobsList = async () => {
    return getCall(Constants.BASE_URL + "/pull/jobs");
  };

  const pullMaintenanceList = async () => {
    return getCall(Constants.BASE_URL + "/pull/maintenance");
  };

  const pullPhotosList = async () => {
    return getCall(Constants.BASE_URL + "/pull/photos");
  };

  const pullSiteDetailsList = async () => {
    return getCall(Constants.BASE_URL + "/pull/sitedetails");
  };

  const pullStandardsList = async () => {
    return getCall(Constants.BASE_URL + "/pull/standards");
  };

  // PUSH
  /*
  {job_ref: 0, SIM_IMEI: ''}
  */
  const pushAmrCreate = async (amr) => {
    return postCall(Constants.BASE_URL + "/push/amr", amr);
  };

  /*
  {MPRN: '', asset_type: '', status: '', serial_number: '', manufacturer: '', model: '', yom: 0, installation_date: '', removal_date: ''}
  */
  const pushAssetsCreate = async (asset) => {
    return postCall(Constants.BASE_URL + "/push/assets", asset);
  };

  /*
  {title: '', first_name: '', surname: '', telephone: '', telephone_2: '', email: ''}
  */
  const pushContactDetailsCreate = async (contactDetails) => {
    return postCall(
      Constants.BASE_URL + "/push/contactdetails",
      contactDetails
    );
  };

  /*
  {SIM_IMEI: '', uncorrected_read: '', corrected_read: ''}
  */
  const pushCorrectorCreate = async (corrector) => {
    return postCall(Constants.BASE_URL + "/push/corrector", corrector);
  };

  /*
  {job_ref: 0, install_date: '', removal_date: '', mounting_bracket: false, adapter: false, pulse_splitter: false, logger_owner: ''}
  */
  const pushDataLoggerCreate = async (datalogger) => {
    return postCall(Constants.BASE_URL + "/push/datalogger", datalogger);
  };

  /*
  {certificate_ref: '', engineer: 0, Job_ref: 0, gas_emergency_service: '', prperty_rented: false, customer_present: false, customer_email: '', customer_signature_date: '', appliance: Appliance{} }
  */
  const pushGasSafeWarningCreate = async (data) => {
    return postCall(Constants.BASE_URL + "/push/gas_safe_warning", data);
  };

  /*
  {MPRN: '', job_type: '', job_ref: '', created_by: 0, status: '', trans_ref: '', date_carried_out: '', TransID: '', engineer: 0, gas_supplier: 0, reason_code: '', transaction_status: '', market_sector: '', meter_point_status: '', notes: ''}
  */
  const pushJobsCreate = async (data) => {
    return postCall(Constants.BASE_URL + "/push/jobs", data);
  };

  /*
  {job_ref: 0, risk_assessment: false, job_carried_out: false, condition_of_meter_housing: '', oil_levels: '', vents_clear: '', notes: '', conform_to_standards: false, streams: Streams{} }
  */
  const pushMaintenanceCreate = async (data) => {
    return postCall(Constants.BASE_URL + "/push/maintenance", data);
  };

  /*
  {instlal_date: '', removal_date: '', last_updated: '', payment_method: '', mechanism_type: '', meter_type: '', read: 0, is_pulse_enabled: false, is_meter_faulty: false, meter_pressure_tier: '', meter_capacity: '', number_of_dials: 0, unit_of_measure: '', multiplication_factor: number,location: 0, location_notes: '', stream: ''}
  */
  const pushMeterCreate = async (meter) => {
    return postCall(Constants.BASE_URL + "/push/meter", meter);
  };

  /*
  {MPRN: '', job_ref: 0, filename: '', type: '', description: '', notes: '', date: ''}
  */
  const pushPhotosCreate = async (data) => {
    return postCall(Constants.BASE_URL + "/push/photos", data);
  };

  /*
  {MPRN: '', site_name: '', access_codes: '', notes: '', building: '', address_1: '', address_2: '', addres_3: '', town: '', county: '', postcode: ''}
  */
  const pushSiteDetailsCreate = async (data) => {
    return postCall(Constants.BASE_URL + "/push/sitedetails", data);
  };

  /*
  {job_ref: 0, tightness_test: false, ECV_conformity: false, RIDDOR_reportable: false, outlet_kit: false, inlet_pressure: false, RIDDOR_ref: ''}
  */
  const pushStandardsCreate = async (data) => {
    return postCall(Constants.BASE_URL + "/push/standards", data);
  };

  /*
  {job_ref: 0, SIM_IMEI: ''}
  */
  const tokenCreate = async (data) => {
    return postCall(Constants.BASE_URL + "/token/", data);
  };

  const providerValue = {
    jobType,
    isWarrant,
    hasStreamNumber,
    streamNumber,
    streamValue,
    streamCounter,
    siteDetails,
    meterDetails,
    regulatorDetails,
    standardDetails,
    extraCounter,
    removedSiteDetails,
    removedMeterDetails,
    passedRemoval,
    warrantDetails,
    maintenanceDetails,
    startRemoval,
    setStartRemoval,
    setMaintenanceDetails,
    setWarrantDetails,
    setPassedRemoval,
    setRemovedMeterDetails,
    setRemovedSiteDetails,
    setExtraCounter,
    setStandardDetails,
    setRegulatorDetails,
    setMeterDetails,
    setSiteDetails,
    setHasStreamNumber,
    setStreamCounter,
    setStreamValue,
    setStreamNumber,
    setIsWarrant,
    setJobTypes,
    signIn,
    // PULL
    pullAmrList,
    pullAssetList,
    pullContactDetailsList,
    pullCorrectorList,
    pullDataLoggerList,
    pullGasSafeWarningList,
    pullJobsList,
    pullMaintenanceList,
    pullPhotosList,
    pullSiteDetailsList,
    pullStandardsList,
    // PUSH
    pushAmrCreate,
    pushAssetsCreate,
    pushContactDetailsCreate,
    pushCorrectorCreate,
    pushDataLoggerCreate,
    pushGasSafeWarningCreate,
    pushJobsCreate,
    pushMaintenanceCreate,
    pushMeterCreate,
    pushPhotosCreate,
    pushSiteDetailsCreate,
    pushStandardsCreate,
    tokenCreate,

    blobs, setBlogs
  };
  return (
    <AppContext.Provider value={providerValue}>
      {props.children}
    </AppContext.Provider>
  );
};

const AppConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppConsumer };
