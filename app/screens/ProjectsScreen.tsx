import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProjectsGrid from '../components/ProjectsGrid';
import { ProjectType } from '../types';
import { fetchProjectsFromDB } from '../actions/projectActions';
import { IconButton } from 'react-native-paper';
import ProjectDialog from '../components/ProjectDialog';

function ProjectsScreen() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsData = await fetchProjectsFromDB();
      setProjects(projectsData);
    };
    fetchProjects();
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'center', marginBottom: 20 }}>
        <Text style={styles.title}>פרוייקטים קיימים</Text>
      </View>
      <View style={{ flex: 1 }}>
        <ProjectsGrid projects={projects} />
      </View>

      <ProjectDialog setVisible={setVisible} visible={visible} />

      <View style={styles.iconButtonContainer}>
        <IconButton
          mode='contained-tonal'
          icon='plus'
          size={40}
          onPress={() => setVisible(true)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  iconButtonContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    width: '100%',
    marginTop: 10,
  },
});

export default ProjectsScreen;
