import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ProjectsGrid from '../components/ProjectsGrid';
import { ActivityIndicator, IconButton, Text } from 'react-native-paper';
import ProjectDialog from '../components/ProjectDialog';
import useFetchProjects from '../hooks/useFetchProjects';

function ProjectsScreen() {
  const [visible, setVisible] = useState(false);
  const { error, loading, projects } = useFetchProjects();

  if (loading) {
    return (
      <ActivityIndicator
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        size='large'
        color='#343a40'
      />
    );
  }

  if (!loading && error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text variant='displaySmall'>{error}</Text>
      </View>
    );
  }

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
