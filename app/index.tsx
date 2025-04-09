import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import ProductListItem from "../src/components/ProductListItem";
import { Product } from "../src/types/product";
import { Button } from "react-native";

export default function Index() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://dummyjson.com/products");
      const json = await response.json();
      setProducts(json.products);
    } catch (e) {
      setError((e as Error).message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadProducts();
  }, []);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ marginBottom: 16 }}>{error}</Text>
        <Button title="Retry" onPress={loadProducts} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 6, backgroundColor: "#fafffb" }}>
      <FlatList
        data={products}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        keyExtractor={(item: Product) => item.id.toString()}
        renderItem={({ item }: { item: Product }) => (
          <ProductListItem
            product={item}
            onPress={() => console.log("Pressed:", item.id)}
            style={{ width: "48%" }}
          />
        )}
      />
    </View>
  );
}
