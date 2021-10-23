import React, {useState, useRef, useEffect, useMemo} from 'react';
import {
  View,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import {listItemHeight, countryPickerStyles} from './styles';
import Countries from './countryList';

const CountryPicker = ({country, onChange = () => {}, disable}) => {
  const [isCountryModalVisible, setCountryModalVisible] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);

  const flatListRef = useRef();

  const handleSelectCountry = item => {
    onChange(item);
    setCountryModalVisible(false);
    setFilteredResults([]);
  };

  const handleSearch = searchTerm => {
    const query = searchTerm.toLowerCase();
    const results = Countries.filter(item => {
      const code = item?.country_code.toLowerCase();
      const dial = `${item?.dial_code}`.toLowerCase();
      const name = item?.name.toLowerCase();
      return (
        name.includes(query) || dial.includes(query) || code.includes(query)
      );
    });

    setFilteredResults(results);
  };

  const _country = useMemo(() => {
    return !country ? {} : country;
  }, [country]);

  const countryIndex = useMemo(() => {
    const index = Countries.findIndex(
      item => item?.country_code === country?.country_code,
    );
    return index !== -1 ? index : null;
  }, [country]);

  useEffect(() => {
    if (!isCountryModalVisible || !countryIndex || !flatListRef.current) {
      return;
    }
    setTimeout(
      () =>
        flatListRef.current.scrollToIndex({
          animated: true,
          index: countryIndex,
        }),
      100,
    );
  }, [country, isCountryModalVisible, countryIndex]);

  useEffect(() => {
    return () => {
      setFilteredResults([]);
    };
  }, []);

  return (
    <>
      <TouchableOpacity
        disabled={disable}
        onPress={() => setCountryModalVisible(true)}>
        <Text style={countryPickerStyles.countryFlag}>
          {_country?.flag ? _country?.flag : '🏳️'}
        </Text>
      </TouchableOpacity>
      <Modal
        visible={isCountryModalVisible}
        onRequestClose={() => setCountryModalVisible(false)}>
        <SafeAreaView style={countryPickerStyles.countryModalSafeArea}>
          <View style={countryPickerStyles.countryModalHeader}>
            <View style={countryPickerStyles.modalSearchContainer}>
              <TextInput
                onChangeText={handleSearch}
                style={countryPickerStyles.countrySearch}
              />
            </View>
            <TouchableOpacity onPress={() => setCountryModalVisible(false)}>
              <Text style={countryPickerStyles.modalClose}>&#x2715;</Text>
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              data={filteredResults.length > 0 ? filteredResults : Countries}
              ref={flatListRef}
              keyExtractor={item => item?.country_code}
              renderItem={item => (
                <CountryItem
                  {...item}
                  onPickCountry={handleSelectCountry}
                  country={_country?.country_code}
                />
              )}
              getItemLayout={(item, index) => ({
                length: listItemHeight,
                offset: listItemHeight * index,
                index,
              })}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};
const CountryItem = ({item, onPickCountry = () => {}, country}) => {
  return (
    <TouchableOpacity onPress={() => onPickCountry(item)}>
      <View style={countryPickerStyles.listItem}>
        <Text
          style={StyleSheet.flatten([
            countryPickerStyles.infoSpacing,
            countryPickerStyles.countryFlag,
          ])}>
          {item?.flag}
        </Text>
        <View style={countryPickerStyles.countryName}>
          <Text>{item?.name}</Text>
          <Text
            style={StyleSheet.flatten([
              countryPickerStyles.infoSpacing,
              countryPickerStyles.countryCode,
            ])}>{`+${item?.dial_code}`}</Text>
        </View>
        {country === item?.country_code ? (
          <Text
            style={StyleSheet.flatten([
              countryPickerStyles.tickIcon,
              countryPickerStyles.infoSpacing,
            ])}>
            &#x2713;
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};
export default CountryPicker;

/*
  const scrollToIndexFailed = (error) => {
    const offset = error.averageItemLength * error.index;
    flatListRef.current.scrollToOffset({ offset });
    setTimeout(
      () => flatListRef.current.scrollToItem({ index: error.index }),
      100
    );
  };
 */
