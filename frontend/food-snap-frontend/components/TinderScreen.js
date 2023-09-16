import React from 'react';
import { View, StyleSheet } from 'react-native';
import TinderSwiper from './TinderSwiper';

const data = [
  { name: 'Silver', age: 25, image: 'https://media.licdn.com/dms/image/D4E03AQFy1GzkD9CB2Q/profile-displayphoto-shrink_800_800/0/1688612798171?e=2147483647&v=beta&t=QD5pahntNFJXo-Bj242cC8ZSw8m5Ypde4R2h3ZvI1o4' },
  { name: 'Saketh', age: 22, image: 'https://media.licdn.com/dms/image/D5603AQFzyxP_MsLW0w/profile-displayphoto-shrink_400_400/0/1683142677740?e=1696464000&v=beta&t=iFXRNMekGuTmGRPLqO5mVfThlNR2Zx_18GMzRjv6H60' },
  // Add more data objects for additional cards
];

const TinderScreen = () => {
  return (
    <View style={styles.container}>
      <TinderSwiper data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TinderScreen;
