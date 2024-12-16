import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Text, ActivityIndicator } from 'react-native-paper';
import { ItemType, ItemWithoutId, ProjectDetailsProps } from '../types';
import {
  saveItemToDB,
  deleteItemFromDB,
  updateItemInDB,
} from '../actions/itemActions';
import ItemsGrid from '../components/ItemsGrid';
import ItemDialog from '../components/ItemDialog';
import useProjectDetails from '../hooks/useProjectDetails';

function ProjectDetails(props: ProjectDetailsProps) {
  const { projectId } = props.route.params;

  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
  const [item, setItem] = useState<ItemType>();
  const { items, loading, project, setItems } = useProjectDetails(projectId);

  // Add a new item
  const createNewItem = async () => {
    if (item && item.height && item.width && item.comment && item.type) {
      let baseItem: ItemWithoutId = {
        height: item.height,
        width: item.width,
        type: item.type,
        comment: item.comment,
        projectId,
      };
      const docRef = await saveItemToDB(baseItem);
      const newItem: ItemType = { ...baseItem, id: docRef!.id };
      setItems((prev) => [...prev, newItem]);
    }
  };

  // Update an item
  const updateItem = async () => {
    if (selectedItem) {
      await updateItemInDB(item as ItemType);
      setItems((prev) =>
        prev.map((x) =>
          x.id === selectedItem.id
            ? {
                ...x,
                height: item?.height as string,
                width: item?.width as string,
                type: item?.type as string,
                comment: item?.comment as string,
              }
            : x
        )
      );
    }
  };

  const handleCreateOrUpdateItem = async () => {
    selectedItem ? updateItem() : createNewItem();
    setVisible(false);
    setSelectedItem(null);
    cleanFields();
  };

  // Delete an item
  const deleteItem = async (itemToDelete: ItemType) => {
    if (itemToDelete) {
      setItems((prev) => prev.filter((item) => itemToDelete.id !== item.id));
      setSelectedItem(null);
      cleanFields();
      await deleteItemFromDB(itemToDelete.id);
    }
  };

  const cleanFields = () => {
    setItem((prev) => {
      if (!prev) return;
      return { ...prev, height: '', width: '', comment: '', type: '' };
    });
  };

  if (loading) {
    return (
      <ActivityIndicator
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        size='large'
        color='#343a40'
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={styles.displayTitle}>
          {project?.name} {project?.city}
        </Text>
      </View>

      {/* List of items */}
      <View style={{ flex: 7 }}>
        <ItemsGrid
          items={items}
          setSelectedItem={setSelectedItem}
          setItem={setItem}
          setEditVisible={setVisible}
          deleteItem={deleteItem}
        />
      </View>

      {/* Button to open dialog for new item */}
      <View style={styles.iconButtonContainer}>
        <IconButton
          mode='contained-tonal'
          icon='plus'
          size={40}
          onPress={() => setVisible(true)}
        />
      </View>

      {/* Dialog for adding a new item */}
      <ItemDialog
        handleCreateOrUpdateItem={handleCreateOrUpdateItem}
        item={item as ItemType}
        setItem={setItem}
        setVisible={setVisible}
        visible={visible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  displayTitle: {
    textAlign: 'center',
    fontSize: 40,
  },
  iconButtonContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    width: '100%',
    marginTop: 20,
  },
});

export default ProjectDetails;
