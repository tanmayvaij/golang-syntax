import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Text from '../../../components/Text';
import Header from '../../../components/Header';
import {useNavigation} from '@react-navigation/native';
import {isIos, width, height, unitH} from '../../../utils/constant';
import {TextType} from '../../../theme/typography';
import TextInput, {TextInputWithTitle} from '../../../components/TextInput';
import OptionalButton from '../../../components/OptionButton';
import {AppContext} from '../../../context/AppContext';
import EcomHelper from '../../../utils/ecomHelper';

function WarrantPage() {
  const navigation = useNavigation();
  const appContext = useContext(AppContext);
  const jobType = appContext.jobType;
  const warrantDetails = appContext.warrantDetails;
  const [companyName, setCompanyName] = useState(warrantDetails?.companyName);
  const [buildingName, setBuildingName] = useState(
    warrantDetails?.buildingName,
  );
  const [address1, setAddress1] = useState(warrantDetails?.address1);
  const [address2, setAddress2] = useState(warrantDetails?.address2);
  const [address3, setAddress3] = useState(warrantDetails?.address3);
  const [town, setTown] = useState(warrantDetails?.town);
  const [county, setCounty] = useState(warrantDetails?.county);
  const [postCode, setPostCode] = useState(warrantDetails?.postCode);
  const [details, setDetails] = useState(warrantDetails?.details);
  const [number1, setNumber1] = useState(warrantDetails?.number1);
  const [number2, setNumber2] = useState(warrantDetails?.number2);
  const [instructions, setInstructions] = useState(
    warrantDetails?.instructions,
  );
  const [didWarrant, setDidWarrant] = useState(warrantDetails?.didWarrant);
  const [confirmAddress, setConfirmAddress] = useState(
    warrantDetails?.confirmAddress,
  );

  console.log('WarrantDetailsPage');

  const nextPressed = () => {
    if (buildingName === '') {
      EcomHelper.showInfoMessage('Please input Building Name');
      return;
    }
    if (address1 === '') {
      EcomHelper.showInfoMessage('Please input Address1');
      return;
    }
    if (town === '') {
      EcomHelper.showInfoMessage('Please input Town/City');
      return;
    }
    if (county === '') {
      EcomHelper.showInfoMessage('Please input County');
      return;
    }
    if (didWarrant == null) {
      EcomHelper.showInfoMessage('Please make sure if Warrant went ahead');
      return;
    }

    if (confirmAddress == null) {
      EcomHelper.showInfoMessage('Please make sure if all address is correct');
      return;
    }

    appContext.setWarrantDetails({
      companyName: companyName,
      buildingName: buildingName,
      address1: address1,
      address2: address2,
      address3: address3,
      town: town,
      county: county,
      postCode: postCode,
      details: details,
      number1: number1,
      number2: number2,
      instructions: instructions,
      didWarrant: didWarrant,
      confirmAddress: confirmAddress,
    });
    navigation.navigate('SitePhotoPage');
  };
  const backPressed = () => {
    appContext.setWarrantDetails({
      companyName: companyName,
      buildingName: buildingName,
      address1: address1,
      address2: address2,
      address3: address3,
      town: town,
      county: county,
      postCode: postCode,
      details: details,
      number1: number1,
      number2: number2,
      instructions: instructions,
      didWarrant: didWarrant,
      confirmAddress: confirmAddress,
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.content}>
      <Header
        hasLeftBtn={true}
        hasCenterText={true}
        hasRightBtn={true}
        centerText={'Warrant'}
        leftBtnPressed={backPressed}
        rightBtnPressed={nextPressed}
      />
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView style={styles.content}>
          <Text type={TextType.CAPTION_1}>Warrant Site Details</Text>
          <TextInputWithTitle
            title={'Company name'}
            placeholder={'ECOM'}
            value={companyName}
            onChangeText={txt => {
              const filteredText = txt.replace(/[^a-zA-Z0-9\s]/g, '');
              setCompanyName(filteredText);
            }}
            containerStyle={styles.inputContainer}
          />
          <View style={styles.spacer} />
          <TextInputWithTitle
            title={'Building name/ number *'}
            placeholder={'the warehouse'}
            value={buildingName}
            onChangeText={txt => {
              const filteredText = txt.replace(/[^a-zA-Z0-9\s]/g, '');
              setBuildingName(filteredText);
            }}
            containerStyle={styles.inputContainer}
          />
          <View style={styles.spacer} />
          <TextInputWithTitle
            title={'Address 1 *'}
            value={address1}
            placeholder={'example load'}
            onChangeText={txt => {
              const filteredText = txt.replace(/[^a-zA-Z0-9\s]/g, '');
              setAddress1(filteredText);
            }}
            containerStyle={styles.inputContainer}
          />
          <View style={styles.spacer} />
          <TextInputWithTitle
            title={'Address 2'}
            placeholder={''}
            value={address2}
            onChangeText={txt => {
              const filteredText = txt.replace(/[^a-zA-Z0-9\s]/g, '');
              setAddress2(filteredText);
            }}
            containerStyle={styles.inputContainer}
          />
          <View style={styles.spacer} />
          <TextInputWithTitle
            title={'Address 3'}
            placeholder={''}
            value={address3}
            onChangeText={txt => {
              const filteredText = txt.replace(/[^a-zA-Z0-9\s]/g, '');
              setAddress3(filteredText);
            }}
            containerStyle={styles.inputContainer}
          />
          <View style={styles.spacer} />
          <TextInputWithTitle
            title={'Town/city *'}
            placeholder={''}
            value={town}
            onChangeText={txt => {
              const filteredText = txt.replace(/[^a-zA-Z]/g, '');
              setTown(filteredText);
            }}
            containerStyle={styles.inputContainer}
          />
          <View style={styles.spacer} />
          <TextInputWithTitle
            title={'County *'}
            placeholder={''}
            value={county}
            onChangeText={txt => {
              const filteredText = txt.replace(/[^a-zA-Z]/g, '');
              setCounty(filteredText);
            }}
            containerStyle={styles.inputContainer}
          />
          <View style={styles.spacer} />
          <TextInputWithTitle
            title={'Post Code *'}
            placeholder={''}
            value={postCode}
            onChangeText={txt => {
              const filteredText = txt.replace(/[^a-zA-Z0-9\s]/g, '');
              setPostCode(filteredText);
            }}
            containerStyle={styles.inputContainer}
          />
          <View style={styles.spacer} />
          <TextInputWithTitle
            title={'Warrant officers details'}
            placeholder={''}
            value={details}
            onChangeText={txt => {
              const filteredText = txt.replace(/[^a-zA-Z]/g, '');
              setDetails(filteredText);
            }}
            containerStyle={styles.inputContainer}
          />
          <View style={styles.spacer} />
          <View style={styles.contactContainer}>
            <Text type={TextType.CAPTION_2}>{'Contact Numbers'}</Text>
            <View style={styles.contactContent}>
              <TextInput
                style={styles.input}
                value={number1}
                keyboardType="phone-pad"
                onChangeText={txt => {
                  const filteredText = txt.replace(/[^0-9]/g, '');
                  setNumber1(filteredText);
                }}
              />
              <TextInput
                style={styles.input}
                value={number2}
                keyboardType="phone-pad"
                onChangeText={txt => {
                  const filteredText = txt.replace(/[^0-9]/g, '');
                  setNumber2(filteredText);
                }}
              />
            </View>
          </View>
          <View style={styles.spacer} />
          <TextInputWithTitle
            title={'Contact Instructions'}
            placeholder={''}
            value={instructions}
            onChangeText={txt => {
              const filteredText = txt.replace(/[^a-zA-Z0-9\s@.]/g, '');
              setInstructions(filteredText);
            }}
            containerStyle={styles.inputContainer}
          />
          <View style={styles.spacer} />
          <View style={styles.spacer} />
          <View style={styles.optionContainer}>
            <Text type={TextType.CAPTION_2}>{'Did Warrant go Ahead?'}</Text>
            <OptionalButton
              options={['Yes', 'No']}
              actions={[
                () => {
                  setDidWarrant(true);
                },
                () => {
                  setDidWarrant(false);
                },
              ]}
              value={didWarrant == null ? null : didWarrant ? 'Yes' : 'No'}
            />
          </View>
          <View style={styles.spacer} />
          <View style={styles.optionContainer}>
            <Text type={TextType.CAPTION_2}>
              {'Is all address details correct?'}
            </Text>
            <OptionalButton
              options={['Yes', 'No']}
              actions={[
                () => {
                  setConfirmAddress(true);
                },
                () => {
                  setConfirmAddress(false);
                },
              ]}
              value={
                confirmAddress == null ? null : confirmAddress ? 'Yes' : 'No'
              }
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  inputContainer: {
    width: width * 0.8,
    alignSelf: 'center',
  },
  input: {
    width: '45%',
    alignSelf: 'center',
  },
  contactContainer: {
    width: '80%',
    alignSelf: 'center',
    alignItems: 'flex-start',
  },
  contactContent: {
    // flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  optionContainer: {
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  spacer: {
    height: unitH * 10,
  },
});

export default WarrantPage;
