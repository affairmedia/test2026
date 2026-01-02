import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alarm } from '@noescape/shared';

export type RootStackParamList = {
  Home: undefined;
  AlarmCreate: undefined;
  AlarmEdit: { alarm: Alarm };
  AlarmRing: { alarm: Alarm };
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type AlarmCreateScreenProps = NativeStackScreenProps<RootStackParamList, 'AlarmCreate'>;
export type AlarmEditScreenProps = NativeStackScreenProps<RootStackParamList, 'AlarmEdit'>;
export type AlarmRingScreenProps = NativeStackScreenProps<RootStackParamList, 'AlarmRing'>;
