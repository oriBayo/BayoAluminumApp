import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ItemType } from '../types';
import { Card, Text } from 'react-native-paper';

const ItemRow = ({ item }: { item: ItemType }) => {
  return (
    <View style={styles.itemContainer}>
      <Card>
        <Card.Content>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={styles.column}>
              <Text
                style={styles.listItem}
                variant='bodyLarge'
              >{`הערות:  ${item.comment}`}</Text>
            </View>
            <View style={styles.column}>
              <Text
                style={styles.listItem}
                variant='bodyLarge'
              >{`סוג:   ${item.type}`}</Text>
              <Text
                style={styles.listItem}
                variant='bodyLarge'
              >{`אורך:  ${item.height}`}</Text>
              <Text
                style={styles.listItem}
                variant='bodyLarge'
              >{`רוחב:  ${item.width}`}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  listItem: {
    textAlign: 'right',
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  deleteButtonContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 100,
  },
  column: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default ItemRow;
