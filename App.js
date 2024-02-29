import { useState, useEffect } from "react";
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue } from 'firebase/database';
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
  appId: "1:56792106804:web:29c5c1a3036bd8cd414761"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function App() {
  const [amount, setAmount] = useState("");
  const [product, setProduct] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    onValue(ref(database, 'items/'), snapshot => {
      console.log(snapshot.val());
      const data = snapshot.val();
      setItems(Object.values(data));
    })
  }, []);

  const saveItem = () => {
    push(ref(database, 'items/'), { product, amount})
  };


  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Product"
        style={{
          marginTop: 30,
        }}
        onChangeText={(product) => setProduct(product)}
        value={product}
      />
      <TextInput
        placeholder="Amount"
        keyboardType="numeric"
        style={{ marginTop: 10 }}
        onChangeText={(amount) => setAmount(amount)}
        value={amount}
      />
      <Button onPress={saveItem} title="Save" />
      <Text style={{ marginTop: 30, fontSize: 20 }}>Shopping List</Text>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <Text>{`${item.product}, ${item.amount}`}</Text>
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
});

