import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Header from '../../../components/Header';
import {useNavigation} from '@react-navigation/native';
import {height, unitH, width} from '../../../utils/constant';
import Text from '../../../components/Text';
import {TextType} from '../../../theme/typography';
import {AppContext} from '../../../context/AppContext';

export default function AmrDetailsPage() {
  const appContext = useContext(AppContext);
  const navigation = useNavigation();
  const jobType = appContext.jobType;
  const title = jobType === 'Install' ? 'New Meter Details' : jobType;

  const meterDetails = appContext.meterDetails;
  const removedMeterDetails = appContext.removedMeterDetails;
  const [selectedImage, setSelectedImage] = useState(meterDetails?.ecvPhoto);
  const isPassedRemoval = appContext.passedRemoval;
  const isStartRemoval = appContext.startRemoval;
  console.log('>>> Passed Removal >>>', isPassedRemoval);
  console.log('>>> Start Removal >>>', isStartRemoval);

  const backPressed = () => {
    navigation.goBack();
  };

  const nextPressed = () => {
    // if (!selectedImage) {
    //   EcomHelper.showInfoMessage('Please choose image');
    //   return;
    // }
    if (jobType === 'Install') {
      const isMeter = meterDetails?.isMeter;
      console.log('====== isMeter =====', isMeter);
      if (isMeter) {
        navigation.navigate('NewEcvPhotoPage');
      } else {
        navigation.navigate('MeterDetailsPage');
      }
    } else if (jobType === 'Maintenance' && !isStartRemoval) {
      const isMeter = meterDetails?.isMeter;
      if (isMeter) {
        navigation.navigate('NewEcvPhotoPage');
      } else {
        navigation.navigate('MaintenanceQuestionsPage');
      }
    } else if (
      jobType === 'Removal' ||
      jobType === 'Exchange' ||
      jobType === 'Warrant' ||
      jobType === 'Maintenance'
    ) {
      if (isPassedRemoval) {
        // appContext.setSiteDetails({
        //   ...siteDetails,
        //   ecvPhoto: selectedImage,
        // });
        const isMeter = meterDetails?.isMeter;
        if (isMeter) {
          navigation.navigate('NewEcvPhotoPage');
        } else {
          navigation.navigate('MeterDetailsPage');
        }
        return;
      }
      // appContext.setRemovedSiteDetails({
      //   ...removedSiteDetails,
      //   ecvPhoto: selectedImage,
      // });
      if (isStartRemoval) {
        const isMeter = removedMeterDetails?.isMeter;

        if (isMeter) {
          navigation.navigate('NewEcvPhotoPage');
        } else {
          navigation.navigate('RemovedMeterDetailsPage');
        }
      }
    }
  };

  // const handleImagePicker = () => {
  //   ActionSheetIOS.showActionSheetWithOptions(
  //     {
  //       options: ['Cancel', 'Take Photo', 'Choose from Gallery'],
  //       destructiveButtonIndex: 2,
  //       cancelButtonIndex: 0,
  //       userInterfaceStyle: 'dark',
  //     },
  //     buttonIndex => {
  //       if (buttonIndex === 0) {
  //         // cancel action
  //       } else if (buttonIndex === 1) {
  //         takePhoto();
  //       } else if (buttonIndex === 2) {
  //         chooseFromGallery();
  //       }
  //     },
  //   );
  // };
  // const takePhoto = () => {
  //   const options = {
  //     title: 'Take Photo',
  //     mediaType: 'photo',
  //     quality: 1,
  //   };

  //   launchCamera(options, response => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else {
  //       if (isIos) {
  //         setSelectedImage(response.assets[0].uri);
  //       } else {
  //         setSelectedImage(response.uri);
  //       }
  //       console.log('launch camera, response', response);
  //     }
  //   });
  // };
  // const chooseFromGallery = () => {
  //   const options = {
  //     title: 'Choose from Gallery',
  //     mediaType: 'photo',
  //     quality: 1,
  //   };

  //   launchImageLibrary(options, response => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else {
  //       if (isIos) {
  //         setSelectedImage(response.assets[0].uri);
  //       } else {
  //         setSelectedImage(response.uri);
  //       }
  //       console.log('response', response);
  //     }
  //   });
  // };

  return (
    <ScrollView style={styles.scrollView}>
      <SafeAreaView style={styles.content}>
        <Header
          hasLeftBtn={true}
          hasCenterText={true}
          hasRightBtn={true}
          centerText={title}
          leftBtnPressed={backPressed}
          rightBtnPressed={nextPressed}
        />
        <View style={styles.spacer} />
        <View style={styles.body}>
          <Text type={TextType.BODY_1}>AMR Details</Text>
          {/* {selectedImage && (
            <Image
              source={{uri: selectedImage}}
              style={styles.image}
              resizeMode="contain"
            />
          )}
          <View style={styles.row}>
            <Button
              title={
                selectedImage === undefined ? 'Choose Image' : 'Change Image'
              }
              onPress={handleImagePicker}
            />
          </View> */}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    width: width,
    height: height,
  },
  body: {
    marginHorizontal: width * 0.1,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spacer: {
    height: unitH * 50,
  },
});
