import {Dimensions, Platform} from 'react-native';
export const {width, height} = Dimensions.get('window');

/**
 * DropDown List
 */
export const METER_MANUFACTURER_LIST = [
  {label: 'INS', value: 1},
  {label: 'PCC', value: 2},
  {label: 'IGA', value: 3},
  {label: 'CMN', value: 4},
  {label: 'SCH', value: 5},
  {label: 'SIC', value: 6},
  {label: 'FMG', value: 7},
  {label: 'JEA', value: 8},
  {label: 'VMT', value: 9},
  {label: 'RMG', value: 10},
  {label: 'DR', value: 11},
  {label: 'ACT', value: 12},
  {label: 'ITR', value: 13},
  {label: 'IGT', value: 14},
  {label: 'ELM', value: 15},
  {label: 'RCK', value: 16},
  {label: 'UGI', value: 17},
  {label: 'AM', value: 18},
  {label: 'MTX', value: 19},
  {label: 'FLN', value: 20},
  {label: 'GW', value: 21},
  {label: 'KRO', value: 22},
  {label: 'SCM', value: 23},
  {label: 'LG', value: 24},
  {label: 'PRI', value: 25},
  {label: 'MAG', value: 26},
  {label: 'NP', value: 27},
  {label: 'EUR', value: 28},
  {label: 'LPG', value: 29},
  {label: 'ONS', value: 30},
  {label: 'SIE', value: 31},
  {label: 'AIU', value: 32},
  {label: 'PC', value: 33},
  {label: 'ROM', value: 34},
  {label: 'EMI', value: 35},
  {label: 'INV', value: 36},
  {label: 'SEN', value: 37},
  {label: 'VAL', value: 38},
  {label: 'BGW', value: 39},
  {label: 'BRA', value: 40},
  {label: 'GG', value: 41},
  {label: 'GMC', value: 42},
  {label: 'JR', value: 43},
  {label: 'MET', value: 44},
  {label: 'MM', value: 45},
  {label: 'WLY', value: 46},
  {label: 'VAN', value: 47},
  {label: 'TG', value: 48},
  {label: 'PE', value: 49},
  {label: 'BGL', value: 50},
  {label: 'TB', value: 51},
  {label: 'ORM', value: 52},
  {label: 'MTL', value: 53},
  {label: 'WBC', value: 54},
  {label: 'SP', value: 55},
  {label: 'AS', value: 56},
  {label: 'GFO', value: 57},
  {label: 'HIL', value: 58},
  {label: 'HOC', value: 59},
  {label: 'EDM', value: 60},
  {label: 'MSI', value: 61},
  {label: 'SIE', value: 62},
  {label: 'LPG', value: 63},
  {label: 'VMT', value: 64},
  {label: 'SCK', value: 65},
  {label: 'SOL', value: 66},
  {label: 'SCH', value: 67},
  {label: 'SAR', value: 68},
  {label: 'TAC', value: 69},
  {label: 'UWL', value: 70},
  {label: 'OMN', value: 71},
  {label: 'ELG', value: 72},
  {label: 'DAN', value: 73},
];

export const METER_MODEL_LIST = [
  {label: '10*', value: 1},
  {label: '12*', value: 2},
  {label: '16*', value: 3},
  {label: '1600/200', value: 4},
  {label: '2*', value: 5},
  {label: '20*', value: 6},
  {label: '200/100', value: 7},
  {label: '200/80', value: 8},
  {label: '24*', value: 9},
  {label: '2500/250', value: 10},
  {label: '3*', value: 11},
  {label: 'SMRILP', value: 12},
  {label: '30*', value: 13},
  {label: '3200/300', value: 14},
  {label: '4*', value: 15},
];

export const NUMBER_OF_DEALS = [
  {label: '4', value: 4},
  {label: '5', value: 5},
  {label: '6', value: 6},
  {label: '7', value: 7},
  {label: '8', value: 8},
  {label: '9', value: 9},
  {label: '10', value: 10},
  {label: '11', value: 11},
  {label: '12', value: 12},
  {label: '13', value: 13},
  {label: '14', value: 14},
  {label: '15', value: 15},
  {label: '16', value: 16},
  {label: '17', value: 17},
  {label: '18', value: 18},
  {label: '19', value: 19},
  {label: '20', value: 20},
  {label: '21', value: 21},
  {label: '22', value: 22},
  {label: '23', value: 23},
  {label: '24', value: 24},
  {label: '25', value: 25},
  {label: '26', value: 26},
  {label: '27', value: 27},
  {label: '28', value: 28},
  {label: '29', value: 29},
  {label: '30', value: 30},
];

export const PULSE_VALUE = [
  {label: '1', value: 1},
  {label: '0.1', value: 0.1},
  {label: '0.01', value: 0.01},
  {label: '10', value: 10},
  {label: '1000', value: 1000},
];

export const PAYMENT_TYPE_CHOICES = [
  {label: 'Credit', value: 1},
  {label: 'Pre-payment', value: 2},
];

export const MECHANISM_TYPE_CHOICES = [
  {label: 'Credit', value: 1},
  {label: 'Coin meter', value: 2},
  {label: 'Electronic token', value: 3},
  {label: 'Mechanical token', value: 4},
  {label: 'NS-NON COMPLIANT SMETS', value: 5},
  {label: 'Prepayment', value: 6},
  {label: 'S1-SMETS 1 COMPLIANT SMART METER', value: 7},
  {label: 'S1-SMETS 2 COMPLIANT SMART METER', value: 8},
  {label: 'Thift', value: 9},
  {label: 'Unknown', value: 10},
];

export const METER_TYPE_CHOICES = [
  {label: 'D-DIAPHRAGM OF UNKOWN MATERIAL', value: 1},
  {label: 'L-LEATHER DIAPHRAGM', value: 2},
  {label: 'R-ROTARY', value: 3},
  {label: 'S-SYNTHETIC DIAPHRAGM', value: 4},
  {label: 'T-TURBINE', value: 5},
  {label: 'U-ULTRASONIC', value: 6},
  {label: 'Unknown', value: 7},
];

export const METER_PRESSURE_TIER_CHOICES = [
  {label: 'LP', data: 'LP', value: 3},
  {label: 'MP', data: 'MP', value: 2},
  {label: 'HP', data: 'HP', value: 4},
  {label: 'IP', data: 'IP', value: 1},
];

export const UNIT_OF_MEASURE_CHOICES = [
  {label: 'Standard Cubic Feet per hour', value: 1},
  {label: 'Standard Cubic Meters per hour', value: 2},
];

export const METER_POINT_STATUS_CHOICES = [
  {data: 'CA', label: 'Capped', value: 1},
  {data: 'DE', label: 'Dead', value: 2},
  {data: 'LI', label: 'Live', value: 3},
  {data: 'OT', label: 'Other', value: 4},
  {data: 'PL', label: 'Planned', value: 5},
  {data: 'SP', label: 'Spin Capped', value: 6},
  {data: 'AC', label: 'AC-ACTIVE', value: 7},
  {data: 'CD', label: 'CD-CLOSED', value: 8},
  {data: 'CL', label: 'CL-CLAMPED', value: 9},
  {data: 'IN', label: 'IN-INACTIVE', value: 10},
  {data: 'OP', label: 'OP-OPEN', value: 11},
  {data: 'PD', label: 'PD-PHONE LINE DOWN', value: 12},
  {data: 'RE', label: 'RE-REMOVED', value: 13},
  {data: 'UN', label: 'UN-UNKNOWN', value: 14},
  {data: 'I', label: 'I-INSTALLED IHD ASSET', value: 15},
  {data: 'E', label: 'E-EXISTING IHD ASSET', value: 16},
  {data: 'D', label: 'D-IHD ASSET DECLINED BY CONSUMER', value: 17},
];

export const METER_POINT_LOCATION_CHOICES = [
  {value: 0, label: 'Unknown'},
  {value: 1, label: 'Cellar'},
  {value: 2, label: 'Under stairs'},
  {value: 3, label: 'Hall'},
  {value: 4, label: 'Kitchen'},
  {value: 5, label: 'Bathroom'},
  {value: 6, label: 'Garage'},
  {value: 7, label: 'Canteen'},
  {value: 8, label: 'Cloakroom'},
  {value: 9, label: 'Cupboard'},
  {value: 10, label: 'Domestic Science'},
  {value: 11, label: 'Front Door'},
  {value: 12, label: 'Hall Cupboard'},
  {value: 13, label: 'Kitchen Cupboard'},
  {value: 14, label: 'Kitchen under sink'},
  {value: 15, label: 'Landing'},
  {value: 16, label: 'Office'},
  {value: 17, label: 'Office Cupboard'},
  {value: 18, label: 'Outside WC'},
  {value: 19, label: 'Pantry'},
  {value: 20, label: 'Porch'},
  {value: 21, label: 'Public Bar'},
  {value: 22, label: 'Rear of Shop'},
  {value: 23, label: 'Saloon Bar'},
  {value: 24, label: 'Shed'},
  {value: 25, label: 'Shop Front'},
  {value: 26, label: 'Shop Window'},
  {value: 27, label: 'Staff Room'},
  {value: 28, label: 'Store Room'},
  {value: 29, label: 'Toilet'},
  {value: 30, label: 'Under Counter'},
  {value: 31, label: 'Waiting Room'},
  {value: 32, label: 'Meter box Outside'},
  {value: 98, label: 'Other'},
  {value: 99, label: 'Outside'},
];

export const GasSupplier = [
  {label: '(The) Nuclear Decommissioning Authority (MXE)', value: 1},
  {label: 'AXPO UK Ltd (EUK)', value: 2},
  {label: 'Addito Supply Ltd (OBR)', value: 3},
  {label: 'Affect Energy Ltd (AFG)', value: 4},
];

export const MAM = [
  {label: '(The) Nuclear Decommissioning Authority (MXE)', value: 1},
  {label: 'AES Smart Metering Ltd (ASM)', value: 2},
  {label: 'AOT Energy Switzerland AG (AOT)', value: 3},
  {label: 'ATEL Aare Tessin Fur Elektritat (ATA)', value: 4},
  {label: 'AXPO UK Ltd (EUK)', value: 5},
];

export const ReasonCode = [
  {label: 'CA', value: 1},
  {label: 'Change of Supplier', value: 2},
  {label: 'Emergency', value: 3},
  {label: 'New Connection', value: 4},
];

export const MPRN_STATUS = [
  {label: 'Agent aborts', value: 1},
  {label: 'Completed', value: 2},
  {label: 'Partially Completed', value: 3},
  {label: 'Pending', value: 4},
  {label: 'Requestor Cancels', value: 5},
];

/**
 * This UI Design is based on 1366 x 1024 Screen(iPad Pro 12.9).
 */
export const unitW = width / 1366;
export const unitH = height / 1024;

/**
 * IsAndroid
 */
export const isIos = Platform.OS === 'ios';

/**
 * Default Settings
 */
const Constants = {
  BASE_URL: 'https://www.ecometering.co.uk/app/',
  TEMP_URL: 'https://test.ecomdata.co.uk/',
  STORAGEDIRECTORY: 'ECOM',
};

export default Constants;
