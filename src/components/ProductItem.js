import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductItem = ({ product }) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.category}>{product.category}</Text>
      </View>
      <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    backgroundColor: 'white',
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: '#6c757d',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
  },
});

export default ProductItem;
