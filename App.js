import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, push, ref, onValue, remove } from "firebase/database";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList,
} from "react-native";

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
        shoppinglist.push(Object.assign({id:s.key, ...s.val()}))
      });
      setItems(shoppinglist)
    });
  }, []);

  const saveItem = () => {
    push(ref(database, "items/"), { product, amount });
  };

  const deleteItem = (id) => {
    const itemRef = ref(database, `items/${id}`);
    remove(itemRef);
  };

  console.log(items);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Product"
        onChangeText={(product) => setProduct(product)}
        value={product}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        onChangeText={(amount) => setAmount(amount)}
        value={amount}
      />
      <Button onPress={saveItem} title="Save" />
      <Text style={{ marginTop: 30, fontSize: 20 }}>Shopping List</Text>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View style={styles.listcontainer} key={item.id}>
            <Text>{`${item.product}, ${item.amount}`}</Text>
            <Button title="Delete" onPress={() => deleteItem(item.id)} />
          </View>
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
    justifyContent: "center",
    paddingTop: 200,
  },
  listcontainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  input: {
    marginTop: 10,
    padding: 20,
    height: 20,
    fontSize: 20,
    borderColor: "black",
    borderWidth: 1,
  },
});
