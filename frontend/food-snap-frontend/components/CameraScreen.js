import {StatusBar} from 'expo-status-bar'
import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image, Button} from 'react-native'
import {Camera} from 'expo-camera'
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import { uploadPhotoToS3 } from '../AWS/s3Utils';
let camera;

export default function CameraScreen({ navigation, userName }) {
  console.log(userName);
    const [startCamera, setStartCamera] = React.useState(false)
    const [previewVisible, setPreviewVisible] = React.useState(false)
    const [capturedImage, setCapturedImage] = React.useState(null)
    const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back)
    const [flashMode, setFlashMode] = React.useState('off')

    const getMediaLibraryPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        if (status !== 'granted') {
          console.error('Permission to access media library denied.');
        }
    };

    const handleOpenMediaLibrary = async () => {
        try {
          const media = await MediaLibrary.getAssetsAsync();
          console.log('Media library assets:', media);
        } catch (error) {
          console.error('Error accessing media library:', error);
        }
      };

    const __startCamera = async () => {
      const {status} = await Camera.requestCameraPermissionsAsync()
      await getMediaLibraryPermission();
      console.log(Camera.Constants);
      console.log(status)
      if (status === 'granted') {
        setStartCamera(true)
      } else {
        Alert.alert('Access denied')
      }
    }
    const __takePicture = async () => {
      const photo = await camera.takePictureAsync({
        quality: 0.5, // Adjust the quality between 0 and 1 (lower values reduce file size)
        base64: false, // Set to false if you don't want to capture the image in base64 format
        width: 1280, // Set the desired width for 720p resolution
        height: 720, // Set the desired height for 720p resolution})
     });
      console.log(photo)
      setPreviewVisible(true)
      //setStartCamera(false)
      setCapturedImage(photo)
    }
    const handlePhotoUpload = async (uri, base64) => {
        console.log("in here");
        try {
            const photoTaken = {
                name: uri,
                base64: base64,
            };
            const s3Url = await uploadPhotoToS3(photoTaken);
            return s3Url;

        } catch (error) {
            console.error('Error uploading photo:', error);
            // Handle the error in your app
        }

    }
    const __savePhoto = async () => {
        MediaLibrary.saveToLibraryAsync(capturedImage.uri)
        const s3Key = await handlePhotoUpload(capturedImage.uri, capturedImage.base64)
        
        navigation.navigate('ProgressBar', {imageKey: s3Key, userName: userName}); // Redirect to the dashboard or next screen


    }
    const __retakePicture = () => {
      setCapturedImage(null)
      setPreviewVisible(false)
      __startCamera()
    }
    const __handleFlashMode = () => {
      if (flashMode === 'on') {
        setFlashMode('off')
      } else if (flashMode === 'off') {
        setFlashMode('on')
      } else {
        setFlashMode('auto')
      }
    }
    const __switchCamera = () => {
      if (cameraType === 'back') {
        setCameraType('front')
      } else {
        setCameraType('back')
      }
    }
    return (
      <View style={styles.container}>
        {startCamera ? (
          <View
            style={{
              flex: 1,
              width: '100%'
            }}
          >
            {previewVisible && capturedImage ? (
              <CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture} />
            ) : (
              <Camera
                type={cameraType}
                flashMode={flashMode}
                style={{flex: 1}}
                ref={(r) => {
                  camera = r
                }}
              >
                <View
                  style={{
                    flex: 1,
                    width: '100%',
                    backgroundColor: 'transparent',
                    flexDirection: 'row'
                  }}
                >
                  <View
                    style={{
                      position: 'absolute',
                      left: '5%',
                      top: '10%',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <TouchableOpacity
                      onPress={__handleFlashMode}
                      style={{
                        backgroundColor: flashMode === 'off' ? '#000' : '#fff',
                        borderRadius: '50%',
                        height: 25,
                        width: 25
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20
                        }}
                      >
                        ⚡️
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={__switchCamera}
                      style={{
                        marginTop: 20,
                        borderRadius: '50%',
                        height: 25,
                        width: 25
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20
                        }}
                      >
                        {cameraType === 'front' ? '🤳' : '📷'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      flexDirection: 'row',
                      flex: 1,
                      width: '100%',
                      padding: 20,
                      justifyContent: 'space-between'
                    }}
                  >
                    <View
                      style={{
                        alignSelf: 'center',
                        flex: 1,
                        alignItems: 'center'
                      }}
                    >
                      <TouchableOpacity
                        onPress={__takePicture}
                        style={{
                          width: 70,
                          height: 70,
                          bottom: 0,
                          borderRadius: 50,
                          backgroundColor: '#fff'
                        }}
                      />
                    </View>
                  </View>
                </View>
              </Camera>
            )}
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <TouchableOpacity
              onPress={__startCamera}
              style={{
                width: 130,
                borderRadius: 4,
                backgroundColor: '#14274e',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 40
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}
              >
                Take picture
              </Text>
            </TouchableOpacity>
          </View>
        )}
  
        <StatusBar style="auto" />
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
  
  const CameraPreview = ({photo, retakePicture, savePhoto}) => {
    console.log('sdsfds', photo)
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          width: '100%',
          height: '100%'
        }}
      >
        <ImageBackground
          source={{uri: photo && photo.uri}}
          style={{
            flex: 1
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              padding: 15,
              justifyContent: 'flex-end'
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <TouchableOpacity
                onPress={retakePicture}
                style={{
                  width: 130,
                  height: 40,
  
                  alignItems: 'center',
                  borderRadius: 4
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 20
                  }}
                >
                  Re-take
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={savePhoto}
                style={{
                  width: 130,
                  height: 40,
  
                  alignItems: 'center',
                  borderRadius: 4
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 20
                  }}
                >
                  save photo
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
}
