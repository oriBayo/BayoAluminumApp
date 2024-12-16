import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';
import { ProjectType, RootStackParamList } from '../types';
import { saveProjectToDB } from '../actions/projectActions';
import { NavigationProp, useNavigation } from '@react-navigation/native';

interface ProjectDialogProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const ProjectDialog = ({ visible, setVisible }: ProjectDialogProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [project, setProject] = useState<ProjectType>({
    city: '',
    name: '',
    id: '',
  });

  const handleCreateProject = async () => {
    try {
      const docRef = await saveProjectToDB(project);
      const projectId = docRef?.id;
      navigation.navigate('ProjectDetails', { projectId });
      setVisible(false);
    } catch (error) {
      const err = error as Error;
      console.log(err.message);
    }
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => setVisible(false)}>
        <Dialog.Title style={styles.title}>הוסף פרויקט חדש</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label='שם'
            value={project?.name}
            onChangeText={(val) =>
              setProject({ ...project, name: val } as ProjectType)
            }
            style={styles.input}
          />
          <TextInput
            label='עיר'
            value={project?.city}
            onChangeText={(val) =>
              setProject({ ...project, city: val } as ProjectType)
            }
            style={styles.input}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleCreateProject}>אישור</Button>
          <Button onPress={() => setVisible(false)}>ביטול</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ProjectDialog;

const styles = StyleSheet.create({
  title: {
    textAlign: 'right',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    textAlign: 'right',
  },
});
