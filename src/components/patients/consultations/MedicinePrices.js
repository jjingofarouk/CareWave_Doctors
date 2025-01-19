import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

const MedicinePrices = ({ productData = [] }) => {  // Default to an empty array if undefined
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Set the number of items per page
  const [searchTerm, setSearchTerm] = useState('');
  const [isGridView, setIsGridView] = useState(true); // Track view type

  // Filter products based on the search term
  const filteredProducts = productData.filter((product) => {
    const productName = product.name ? product.name.toLowerCase() : '';
    const productDescription = product.description ? product.description.toLowerCase() : '';
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return productName.includes(lowerCaseSearchTerm) || productDescription.includes(lowerCaseSearchTerm);
  });

  // Get total number of products after filtering
  const totalProducts = filteredProducts.length;

  // Calculate total pages
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  // Get current products to display
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Change search term
  const handleSearch = (text) => {
    setSearchTerm(text);
    setCurrentPage(1); // Reset to first page on search
  };

  // Toggle view type
  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  // Generate pagination buttons
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtonsToShow = 5; // Total number of buttons to display
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    // Adjust start and end page to ensure we have the right amount of buttons
    if (endPage - startPage < maxButtonsToShow - 1) {
      if (startPage === 1) {
        endPage = Math.min(maxButtonsToShow, totalPages);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, totalPages - (maxButtonsToShow - 1));
      }
    }

    // Create pagination buttons
    if (totalPages > 1) {
      buttons.push(
        <TouchableOpacity key="first" onPress={() => paginate(1)} disabled={currentPage === 1}>
          <Text style={styles.paginationButton}>First</Text>
        </TouchableOpacity>
      );
      buttons.push(
        <TouchableOpacity key="prev" onPress={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          <Text style={styles.paginationButton}>Previous</Text>
        </TouchableOpacity>
      );

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <TouchableOpacity
            key={i}
            onPress={() => paginate(i)}
            style={[styles.paginationButton, currentPage === i && styles.activePageButton]}>
            <Text>{i}</Text>
          </TouchableOpacity>
        );
      }

      buttons.push(
        <TouchableOpacity key="next" onPress={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
          <Text style={styles.paginationButton}>Next</Text>
        </TouchableOpacity>
      );
      buttons.push(
        <TouchableOpacity key="last" onPress={() => paginate(totalPages)} disabled={currentPage === totalPages}>
          <Text style={styles.paginationButton}>Last</Text>
        </TouchableOpacity>
      );
    }

    return buttons;
  };

  // Handle empty product data or filtered products
  if (totalProducts === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Current Medicine Prices</Text>

        {/* Search Input */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search for medicines..."
          value={searchTerm}
          onChangeText={handleSearch}
        />

        {/* View Toggle Button */}
        <Button title={isGridView ? 'Switch to List View' : 'Switch to Grid View'} onPress={toggleView} />

        {/* No products found */}
        <Text style={styles.noProductsText}>No medicines found matching your search.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Medicine Prices</Text>

      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search for medicines..."
        value={searchTerm}
        onChangeText={handleSearch}
      />

      {/* View Toggle Button */}
      <Button title={isGridView ? 'Switch to List View' : 'Switch to Grid View'} onPress={toggleView} />

      {/* Product List */}
      <View style={[styles.productList, isGridView ? styles.gridView : styles.listView]}>
        <FlatList
          data={currentProducts}
          keyExtractor={(item) => item.id.toString()}
          numColumns={isGridView ? 2 : 1}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productDescription}>{item.description}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
            </View>
          )}
        />
      </View>

      {/* Pagination Controls */}
      <View style={styles.pagination}>{renderPaginationButtons()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004C54',
    marginBottom: 20,
  },
  searchInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
  },
  productList: {
    marginBottom: 20,
  },
  gridView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  listView: {
    flexDirection: 'column',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  productDescription: {
    fontSize: 14,
    color: '#777',
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#FF7043',
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  paginationButton: {
    padding: 10,
    margin: 5,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  activePageButton: {
    backgroundColor: '#009688',
    color: '#fff',
  },
  noProductsText: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MedicinePrices;
