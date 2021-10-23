import {StyleSheet} from 'react-native';

const colors = {
  grey: '#9e9e9e',
};

export const listItemHeight = 50;

export const phoneInputContainer = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    // opacity: 0.5,
  },
  flagContainer: {
    padding: 12,
  },
  inputContainer: {
    flex: 1,
    fontSize: 16,
  },
});

export const countryPickerStyles = StyleSheet.create({
  countryModalHeader: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  countrySearch: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 10,
    minHeight: 35,
    padding: 5,
  },
  modalSearchContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  modalClose: {
    fontSize: 18,
  },

  countryItem: {
    flexDirection: 'row',
    margin: 16,
  },
  countryItemLabel: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  spacing: {
    padding: 5,
  },
  countryFlag: {
    fontSize: 18,
  },
  countryNameTitle: {},
  countryName: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCode: {
    color: colors.grey,
  },
  listItem: {
    height: listItemHeight,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  listItemInfo: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  infoSpacing: {
    padding: 5,
  },
  countryModalSafeArea: {
    flex: 1,
  },
  tickIcon: {
    fontSize: 18,
  },
});
