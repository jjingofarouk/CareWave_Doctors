import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems
}) => {
  const styles = StyleSheet.create({
    container: {
      paddingVertical: 12,
      paddingHorizontal: 8,
      backgroundColor: '#ffffff',
      borderTopWidth: 1,
      borderTopColor: '#f1f5f9',
    },
    
    contentWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 8,
    },
    
    infoText: {
      fontSize: 12,
      color: '#64748b',
      flexShrink: 1,
    },
    
    paginationControls: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      flexShrink: 0,
    },
    
    navigationButton: {
      height: 32,
      paddingHorizontal: 8,
      borderRadius: 6,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8fafc',
    },
    
    navigationButtonDisabled: {
      opacity: 0.5,
    },
    
    navigationText: {
      fontSize: 13,
      fontWeight: '500',
      color: '#0f172a',
    },
    
    pageNumbers: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    
    pageButton: {
      minWidth: 32,
      height: 32,
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8fafc',
      paddingHorizontal: 4,
    },
    
    currentPage: {
      backgroundColor: '#0f172a',
    },
    
    pageText: {
      fontSize: 13,
      fontWeight: '500',
      color: '#0f172a',
    },
    
    currentPageText: {
      color: '#ffffff',
    },
    
    ellipsis: {
      width: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    ellipsisText: {
      fontSize: 13,
      color: '#64748b',
    },
  });

  const getVisiblePages = () => {
    // For smaller screens, show fewer page numbers
    const maxVisiblePages = Dimensions.get('window').width < 375 ? 3 : 5;
    const pages = [];
    
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    if (currentPage <= 2) {
      // Near start
      pages.push(2);
      if (maxVisiblePages > 3) pages.push(3);
      pages.push('ellipsis');
    } else if (currentPage >= totalPages - 1) {
      // Near end
      pages.push('ellipsis');
      if (maxVisiblePages > 3) pages.push(totalPages - 2);
      pages.push(totalPages - 1);
    } else {
      // Middle
      pages.push('ellipsis');
      pages.push(currentPage);
      if (maxVisiblePages > 3) {
        if (currentPage + 1 < totalPages) pages.push(currentPage + 1);
        if (currentPage - 1 > 1) pages.unshift(currentPage - 1);
      }
      pages.push('ellipsis');
    }

    // Always show last page
    pages.push(totalPages);

    return pages;
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <Text style={styles.infoText} numberOfLines={1}>
          {totalItems} items • Page {currentPage} of {totalPages}
        </Text>
        
        <View style={styles.paginationControls}>
          <TouchableOpacity
            style={[
              styles.navigationButton,
              currentPage === 1 && styles.navigationButtonDisabled
            ]}
            onPress={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} color="#0f172a" />
          </TouchableOpacity>

          <View style={styles.pageNumbers}>
            {getVisiblePages().map((page, index) => {
              if (page === 'ellipsis') {
                return (
                  <View key={`ellipsis-${index}`} style={styles.ellipsis}>
                    <Text style={styles.ellipsisText}>••</Text>
                  </View>
                );
              }

              return (
                <TouchableOpacity
                  key={page}
                  style={[
                    styles.pageButton,
                    currentPage === page && styles.currentPage
                  ]}
                  onPress={() => onPageChange(page)}
                >
                  <Text 
                    style={[
                      styles.pageText,
                      currentPage === page && styles.currentPageText
                    ]}
                  >
                    {page}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            style={[
              styles.navigationButton,
              currentPage === totalPages && styles.navigationButtonDisabled
            ]}
            onPress={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={16} color="#0f172a" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};