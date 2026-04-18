jest.mock('expo-font');
jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));
jest.mock('@expo-google-fonts/fira-code', () => ({
  useFonts: jest.fn().mockReturnValue([true]),
  FiraCode_400Regular: {},
  FiraCode_500Medium: {},
  FiraCode_600SemiBold: {},
  FiraCode_700Bold: {},
}));
