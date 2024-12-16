import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type ItemType = {
  id: string;
  height: string;
  width: string;
  type: string;
  comment: string;
  projectId: string;
};

export type ItemWithoutId = Omit<ItemType, 'id'>;

export type ProjectType = {
  id: string;
  name: string;
  city: string;
};

export type RootStackParamList = {
  Home: undefined;
  ProjectsScreen: undefined;
  ProjectInfo: undefined;
  ProjectRow: undefined;
  ProjectDialog: undefined;
  ProjectDetails: { projectId: string };
};

export type ProjectDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'ProjectDetails'
>;
export type ProjectInfoProps = NativeStackScreenProps<
  RootStackParamList,
  'ProjectInfo'
>;

export type ProjectRowProps = {
  project: ProjectType;
  navigation: ProjectDetailsProps['navigation'];
};
