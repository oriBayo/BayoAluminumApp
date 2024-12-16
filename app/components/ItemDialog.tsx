import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { ItemType } from '../types';

const itemType = ['דרייקיפ', 'הזזה', 'כיס יחיד', 'כיס כפול', 'קבוע'];

interface ItemDialogProps {
  item: ItemType;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  setItem: (item: ItemType) => void;
  handleCreateOrUpdateItem: () => void;
}

const ItemDialog = ({
  item,
  visible,
  setVisible,
  setItem,
  handleCreateOrUpdateItem,
}: ItemDialogProps) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => setVisible(false)}>
        <Dialog.Title style={styles.title}>הוסף פריט חדש</Dialog.Title>
        <Dialog.Content>
          <Picker
            selectedValue={item?.type}
            onValueChange={(val) => setItem({ ...item, type: val } as ItemType)}
            style={styles.picker}
          >
            <Picker.Item label='בחר סוג' value='' />
            {itemType.map((type) => (
              <Picker.Item key={type} label={type} value={type} />
            ))}
          </Picker>

          <TextInput
            label='אורך'
            value={item?.height}
            onChangeText={(val) =>
              setItem({ ...item, height: val } as ItemType)
            }
            style={styles.input}
            keyboardType='numeric'
          />
          <TextInput
            label='רוחב'
            value={item?.width}
            onChangeText={(val) => setItem({ ...item, width: val } as ItemType)}
            style={styles.input}
            keyboardType='numeric'
          />
          <TextInput
            label='הערות'
            value={item?.comment}
            onChangeText={(val) =>
              setItem({ ...item, comment: val } as ItemType)
            }
            style={[styles.input, styles.commentInput]}
            multiline={true}
            numberOfLines={5}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleCreateOrUpdateItem}>אישור</Button>
          <Button onPress={() => setVisible(false)}>ביטול</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ItemDialog;

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

  picker: {
    marginVertical: 10,
    backgroundColor: '#f5f5f5',
  },

  commentInput: {
    height: 100, // Adjust as needed
    textAlignVertical: 'top', // Ensures the text starts at the top of the input
  },
});
