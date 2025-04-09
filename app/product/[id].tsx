import { useEffect, useState, useRef } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Product } from "../../src/types/product";
import { FlatList } from "react-native";
import { Image } from "expo-image";

const { width } = Dimensions.get("screen");

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const loadProductDetails = async (productId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://dummyjson.com/products/${productId}`,
      );
      const data = await response.json();
      setProduct(data);
    } catch (e) {
      setError((e as Error).message || "Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadProductDetails(id as string);
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.mainContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.mainContainer}>
        <Text style={{ marginBottom: 16 }}>{error}</Text>
        <Pressable
          style={{
            backgroundColor: "grey",
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 56,
          }}
          onPress={() => loadProductDetails(id as string)}
        >
          <Text>Retry</Text>
        </Pressable>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        data={product.images}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image
              key={item}
              source={{ uri: item }}
              style={styles.productImage}
              placeholder={require("../../assets/images/placeholder.png")}
              contentFit="contain"
              transition={1000}
            />
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        style={styles.imageCarousel}
        onScroll={(event) => {
          const slideSize = event.nativeEvent.layoutMeasurement.width;
          const index = Math.floor(
            event.nativeEvent.contentOffset.x / slideSize,
          );
          setActiveIndex(index);
        }}
        scrollEventThrottle={16}
      />

      <View style={styles.paginationContainer}>
        {product.images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex ? styles.paginationDotActive : {},
            ]}
          />
        ))}
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>Price: ${product.price}</Text>
        <Text style={styles.rating}>Rating: {product.rating} ⭐</Text>
        <Text style={styles.category}>Category: {product.category}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product Details</Text>
          <Text>{product.description}</Text>
          <Text>Weight: {product.weight}g</Text>
          <Text>
            Dimensions: {product.dimensions.width}x{product.dimensions.height}x
            {product.dimensions.depth}cm
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping & Returns</Text>
          <Text>{product.shippingInformation}</Text>
          <Text>{product.returnPolicy}</Text>
          <Text>{product.warrantyInformation}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafffb",
  },
  container: {
    flex: 1,
    backgroundColor: "#fafffb",
    // padding: 16,
  },
  imageCarousel: {
    flex: 1,
    height: 300,
  },
  productImage: {
    width: 300,
    height: 300,
  },
  detailsContainer: {
    marginTop: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: "green",
    marginBottom: 8,
    fontWeight: "bold",
  },
  rating: {
    fontSize: 18,
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  section: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "#333",
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
