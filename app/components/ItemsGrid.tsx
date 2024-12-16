import { View, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler';
import { ItemType } from '../types';
import { IconButton } from 'react-native-paper';
import ItemRow from './ItemRow';

interface itemsGridProps {
  items: ItemType[];
  setSelectedItem: (item: ItemType) => void;
  setItem: (item: ItemType) => void;
  setEditVisible: (visible: boolean) => void;
  deleteItem: (item: ItemType) => void;
}

const ItemsGrid: React.FC<itemsGridProps> = ({
  items,
  setSelectedItem,
  setItem,
  setEditVisible,
  deleteItem,
}) => {
  const openEditModal = (currentItem: ItemType) => {
    setSelectedItem(currentItem);
    setItem(currentItem);
    setEditVisible(true);
  };

  const renderRightActions = (item: ItemType) => (
    <View style={styles.deleteButtonContainer}>
      <TouchableOpacity onPress={() => deleteItem(item)}>
        <IconButton
          mode='contained-tonal'
          iconColor='black'
          icon='delete'
          size={40}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => openEditModal(item)}>
          <Swipeable renderLeftActions={() => renderRightActions(item)}>
            <ItemRow item={item} />
          </Swipeable>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  deleteButtonContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 100,
  },
});

export default ItemsGrid;
