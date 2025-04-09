import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { Product } from "../types/product";
import { useRouter } from "expo-router";
import { Image } from "expo-image";

interface ProductListItemProps extends TouchableOpacityProps {
  product: Product;
}

const ProductListItem: React.FC<ProductListItemProps> = ({
  product,
  ...props
}) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <TouchableOpacity {...props} style={styles.container} onPress={handlePress}>
      <View style={styles.imageContainer}>
        <Image
          placeholder={require("../../assets/images/placeholder.png")}
          contentFit="contain"
          transition={1000}
          source={{ uri: product.images[0] }}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {product.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    backgroundColor: "#ededed",
    borderRadius: 4,
    marginBottom: 8,
  },
  container: {
    flex: 1,
    margin: 2,
    backgroundColor: "transparent",
    borderRadius: 8,
    padding: 8,
  },
  image: {
    aspectRatio: 3 / 4,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#363535",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
});

export default ProductListItem;
