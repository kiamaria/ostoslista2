import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, push, ref, onValue, remove } from "firebase/database";
import {
  StyleSheet,
  View,
  FlatList,
} from "react-native";
import { Header, Input, Button, ListItem, Icon } from "@rneui/themed";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDym0vaqhc9KiFabjLslyCHa89hnvVT4NE",
  authDomain: "ostoslista2-752cc.firebaseapp.com",
  projectId: "ostoslista2-752cc",
  storageBucket: "ostoslista2-752cc.appspot.com",
  messagingSenderId: "56792106804",
  appId: "1:56792106804:web:29c5c1a3036bd8cd414761",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function App() {
  const [amount, setAmount] = useState("");
  const [product, setProduct] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    onValue(ref(database, "items/"), (snapshot) => {
      const shoppinglist = [];
      snapshot.forEach((s) => {
        shoppinglist.push(Object.assign({ id: s.key, ...s.val() }));
      });
      setItems(shoppinglist);
    });
  }, []);

  const saveItem = () => {
    push(ref(database, "items/"), { product, amount });
  };

  const deleteItem = (id) => {
    const itemRef = ref(database, `items/${id}`);
    remove(itemRef);
  };

  return (
    <View style={styles.container}>
      <Header
        backgroundColor="#FFC0CB"
        centerComponent={{
          text: "SHOPPING LIST",
          style: {
            color: "#FFF",
            padding: 10,
            fontSize: 24,
            fontWeight: "bold",
          },
        }}
      />
      <Input
        placeholder="Product"
        label="PRODUCT"
        onChangeText={(product) => setProduct(product)}
        value={product}
        containerStyle={{ marginTop: 20 }}
      />
      <Input
        placeholder="Amount"
        label="AMOUNT"
        onChangeText={(amount) => setAmount(amount)}
        value={amount}
      />
      <Button
        raised
        icon={{ name: "save" }}
        onPress={saveItem}
        title="SAVE"
        buttonStyle={{ backgroundColor: "#FFC0CB" }}
      />
      <FlatList
        style={styles.list}
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>
                {item.product}
              </ListItem.Title>
              <ListItem.Subtitle>Amount: {item.amount}</ListItem.Subtitle>
            </ListItem.Content>
            <Icon
              name="delete"
              color="red"
              onPress={() => deleteItem(item.id)}
            />
          </ListItem>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 50,
  },
  list: {
    width: "100%",
  },
});

