// ProductSearchScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ProductSearchScreen = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    period: '',
  });
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });

  const ITEMS_PER_PAGE = 10;

  // Simulated product data
  useEffect(() => {
    const generateProducts = () => {
      const types = ['AUTO PEÇA', 'FERRAMENTA', 'ACESSÓRIO'];
      const statuses = ['DISPONÍVEL', 'INDISPONÍVEL', 'SOB ENCOMENDA'];
      
      return Array.from({ length: 20 }, (_, index) => ({
        id: `PROD${String(index + 1).padStart(3, '0')}`,
        name: `Produto ${index + 1}`,
        type: types[Math.floor(Math.random() * types.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        price: (Math.random() * 1000 + 50).toFixed(2),
      }));
    };

    setProducts(generateProducts());
  }, []);

  // Filter and sort logic
  useEffect(() => {
    let result = [...products];

    // Apply filters
    if (filters.status) {
      result = result.filter(product => product.status === filters.status);
    }
    if (filters.type) {
      result = result.filter(product => product.type === filters.type);
    }
    if (searchText) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.id.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredProducts(result);
  }, [products, filters, searchText, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'ascending' 
        ? 'descending' 
        : 'ascending'
    }));
  };

  const renderItem = ({ item }) => (
    <View style={styles.productItem}>
      <Text style={styles.productId}>{item.id}</Text>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productType}>{item.type}</Text>
      <Text style={styles.productStatus}>{item.status}</Text>
      <Text style={styles.productPrice}>R$ {item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.filterButton}>
          <FontAwesome name="filter" size={24} color="#2171B5" />
        </TouchableOpacity>
      </View>

      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.headerCell} onPress={() => handleSort('id')}>
          <Text>ID</Text>
          <FontAwesome name="sort" size={14} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerCell} onPress={() => handleSort('name')}>
          <Text>Nome</Text>
          <FontAwesome name="sort" size={14} color="#666" />
        </TouchableOpacity>
        {/* Add other header cells */}
      </View>

      <FlatList
        data={filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      <View style={styles.pagination}>
        <TouchableOpacity 
          style={styles.pageButton}
          onPress={() => setCurrentPage(prev => Math.max(1, prev - 1))}
        >
          <Text>Anterior</Text>
        </TouchableOpacity>
        <Text>{currentPage}</Text>
        <TouchableOpacity 
          style={styles.pageButton}
          onPress={() => setCurrentPage(prev => 
            Math.min(Math.ceil(filteredProducts.length / ITEMS_PER_PAGE), prev + 1)
          )}
        >
          <Text>Próxima</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  filterButton: {
    padding: 8,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  productItem: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  pageButton: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
});

export default ProductSearchScreen;
