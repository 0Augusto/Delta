import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity,
  ActivityIndicator,
  Dimensions 
} from 'react-native';
import ProductItem from '../components/ProductItem';
import { fetchProducts } from '../utils/api';

const ProductSearchScreen = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        setLoading(false);
      }
    };
    
    loadProducts();
  }, []);
  
  useEffect(() => {
    // Aplicar filtro e ordenação
    let result = [...products];
    
    // Filtro
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Ordenação
    result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    // Paginação
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = result.slice(startIndex, startIndex + itemsPerPage);
    
    setFilteredProducts(paginatedItems);
  }, [products, searchTerm, sortConfig, currentPage]);
  
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  const totalPages = Math.ceil(
    products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
    ).length / itemsPerPage
  );
  
  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.headerCell} 
        onPress={() => handleSort('name')}
      >
        <Text style={styles.headerText}>Nome</Text>
        {sortConfig.key === 'name' && (
          <Text>{sortConfig.direction === 'asc' ? '↑' : '↓'}</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.headerCell} 
        onPress={() => handleSort('category')}
      >
        <Text style={styles.headerText}>Categoria</Text>
        {sortConfig.key === 'category' && (
          <Text>{sortConfig.direction === 'asc' ? '↑' : '↓'}</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.headerCell} 
        onPress={() => handleSort('price')}
      >
        <Text style={styles.headerText}>Preço</Text>
        {sortConfig.key === 'price' && (
          <Text>{sortConfig.direction === 'asc' ? '↑' : '↓'}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar produtos..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      
      {renderHeader()}
      
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <ProductItem product={item} />}
        contentContainerStyle={styles.listContent}
      />
      
      <View style={styles.pagination}>
        <TouchableOpacity
          disabled={currentPage === 1}
          onPress={() => setCurrentPage(currentPage - 1)}
          style={[styles.paginationButton, currentPage === 1 && styles.disabledButton]}
        >
          <Text style={styles.paginationText}>Anterior</Text>
        </TouchableOpacity>
        
        <Text style={styles.pageInfo}>
          Página {currentPage} de {totalPages}
        </Text>
        
        <TouchableOpacity
          disabled={currentPage === totalPages}
          onPress={() => setCurrentPage(currentPage + 1)}
          style={[styles.paginationButton, currentPage === totalPages && styles.disabledButton]}
        >
          <Text style={styles.paginationText}>Próxima</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
    paddingVertical: 10,
    backgroundColor: '#e9ecef',
  },
  headerCell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  headerText: {
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#dee2e6',
  },
  paginationButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 4,
  },
  disabledButton: {
    backgroundColor: '#adb5bd',
  },
  paginationText: {
    color: 'white',
    fontWeight: 'bold',
  },
  pageInfo: {
    fontSize: 16,
  },
});

export default ProductSearchScreen;
