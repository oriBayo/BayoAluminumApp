import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ProjectRow from './ProjectRow';
import { ProjectType } from '../types';

const ProjectsGrid = ({ projects }: { projects: ProjectType[] }) => {
  return (
    <View>
      <FlatList
        data={projects}
        renderItem={({ item }) => <ProjectRow project={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ProjectsGrid;
