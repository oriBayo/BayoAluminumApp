import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Badge, Card, Text } from 'react-native-paper';
import { ProjectType, RootStackParamList } from '../types';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const ProjectRow: React.FC<{ project: ProjectType }> = ({ project }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handleClickProject = () => {
    navigation.navigate('ProjectDetails', { projectId: project.id });
  };

  return (
    <TouchableOpacity onPress={handleClickProject}>
      <View style={styles.ProjectContainer}>
        <Card>
          <Card.Content>
            <View
              style={{
                position: 'absolute',
                right: 0,
                margin: 7,
              }}
            >
              <Badge style={{ backgroundColor: '#073b4c' }}>4</Badge>
            </View>
            <View style={{ marginHorizontal: 10 }}>
              <Text
                style={styles.listItem}
                variant='bodyLarge'
              >{`שם:   ${project.name}`}</Text>
              <Text
                style={styles.listItem}
                variant='bodyLarge'
              >{`עיר:  ${project.city}`}</Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  ProjectContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: 180,
  },
  listItem: {
    textAlign: 'center',
  },
});
export default ProjectRow;
