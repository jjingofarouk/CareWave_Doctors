import React, { useState, useEffect, useCallback, useRef } from "react";
import { 
  View, 
  TextInput, 
  Text, 
  FlatList, 
  StatusBar, 
  Animated,
  TouchableOpacity,
  RefreshControl,
  Platform,
  SafeAreaView,
  Modal,
  Pressable
} from "react-native";
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  ChevronDown, 
  X as CloseIcon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react-native';
import debounce from "lodash/debounce";
import { clinicalCases } from "./ClinicalCase";
import { styles } from './CaseStyles';
import { CaseCard } from './CaseCard';
import { EmptyListView } from './EmptyListView';
import { Pagination } from './Pagination';
import { FullscreenView } from './FullScreenView';

const ITEMS_PER_PAGE_OPTIONS = [
  { label: "10 per page", value: 10 },
  { label: "20 per page", value: 20 },
  { label: "30 per page", value: 30 },
  { label: "50 per page", value: 50 },
  { label: "100 per page", value: 100 },
];

const SORT_OPTIONS = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Oldest First', value: 'oldest' },
  { label: 'A-Z', value: 'alphabetical' },
  { label: 'Most Viewed', value: 'views' },
  { label: 'Most Saved', value: 'saves' },
];

const CATEGORIES = [
  'Cardiology',
  'Neurology',
  'Pediatrics',
  'Emergency',
  'Oncology',
  'Orthopedics',
  'Internal Medicine',
  'Surgery'
];

const ClinicalCases = () => {
  // State declarations
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [selectedCase, setSelectedCase] = useState(null);
  const [filteredCases, setFilteredCases] = useState(clinicalCases);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreenView, setIsFullscreenView] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [selectedSection, setSelectedSection] = useState('description');
  
  // New state declarations
  const [viewMode, setViewMode] = useState('grid');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showItemsPerPageModal, setShowItemsPerPageModal] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);

  // Ref declarations
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const fullscreenAnimation = useRef(new Animated.Value(0)).current;
  const filterAnimation = useRef(new Animated.Value(0)).current;
  const searchBarWidth = useRef(new Animated.Value(1)).current;
  const flatListRef = useRef(null);
  const fullscreenScrollRef = useRef(null);
  const searchInputRef = useRef(null);

  // Derived values
  const totalCases = filteredCases.length;
  const totalPages = Math.ceil(totalCases / itemsPerPage);
  const paginatedData = filteredCases.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Callbacks
  const handleSearch = useCallback(
    debounce((value) => {
      setSearchTerm(value);
      setCurrentPage(1);
    }, 300),
    []
  );

  const resetSearch = useCallback(() => {
    setSearchTerm("");
    setFilteredCases(clinicalCases);
    setCurrentPage(1);
    setSelectedCategories([]);
    setSortBy('newest');
    if (searchInputRef.current) {
      searchInputRef.current.blur();
    }
  }, []);

  const navigateToCase = useCallback((direction) => {
    if (!selectedCase) return;
    
    const currentIndex = filteredCases.findIndex(item => item.id === selectedCase.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = currentIndex + 1;
      if (newIndex >= filteredCases.length) return;
    } else {
      newIndex = currentIndex - 1;
      if (newIndex < 0) return;
    }
    
    setSelectedCase(filteredCases[newIndex]);
    setCurrentImageIndex(0);
    setImageError(false);
    setIsImageLoading(true);
  }, [selectedCase, filteredCases]);

  const handleImageSwipe = useCallback((direction) => {
    if (!selectedCase?.imageUrl) return;
    
    const images = Array.isArray(selectedCase.imageUrl) ? selectedCase.imageUrl : [selectedCase.imageUrl];
    const newIndex = direction === 'next' 
      ? Math.min(currentImageIndex + 1, images.length - 1)
      : Math.max(currentImageIndex - 1, 0);
    
    setCurrentImageIndex(newIndex);
    setImageError(false);
    setIsImageLoading(true);
  }, [currentImageIndex, selectedCase]);

  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, []);

  const handleCaseSelect = useCallback((item) => {
    setSelectedCase(item);
    setCurrentImageIndex(0);
    setImageError(false);
    setIsImageLoading(true);
    setIsFullscreenView(true);
    setSelectedSection('description');
    
    Animated.timing(fullscreenAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  
    if (fullscreenScrollRef.current) {
      fullscreenScrollRef.current.scrollTo({ x: 0, y: 0, animated: false });
    }
  }, [fullscreenAnimation]); // Add fullscreenAnimation to dependencies

  const handleCloseFullscreen = useCallback(() => {
    Animated.timing(fullscreenAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsFullscreenView(false);
      setSelectedCase(null);
      setCurrentImageIndex(0);
      setImageError(false);
      setIsImageLoading(false);
      setSelectedSection('description');
    });
  }, []);

  // New callbacks
  const toggleFilters = useCallback(() => {
    Animated.spring(filterAnimation, {
      toValue: showFilters ? 0 : 1,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
    setShowFilters(!showFilters);
  }, [showFilters, filterAnimation]);

  const handleViewModeChange = useCallback((mode) => {
    setViewMode(mode);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, []);

  const toggleCategory = useCallback((category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  }, []);

  const handleSort = useCallback((sortOption) => {
    setSortBy(sortOption);
    const sorted = [...filteredCases].sort((a, b) => {
      switch (sortOption) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'views':
          return b.views - a.views;
        case 'saves':
          return b.saves - a.saves;
        default:
          return 0;
      }
    });
    setFilteredCases(sorted);
  }, [filteredCases]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Reset to initial state
    resetSearch();
    setIsRefreshing(false);
  }, [resetSearch]);

  // Effects
  useEffect(() => {
    let results = clinicalCases;
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(caseItem =>
        caseItem.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filters
    if (selectedCategories.length > 0) {
      results = results.filter(caseItem =>
        selectedCategories.some(category => 
          caseItem.categories?.includes(category)
        )
      );
    }
    
    // Apply sorting
    handleSort(sortBy);
    
    setFilteredCases(results);
    setCurrentPage(1);
  }, [searchTerm, selectedCategories, sortBy]);

  useEffect(() => {
    Animated.spring(slideAnimation, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  }, [filteredCases]);

  // Render functions
  const renderHeader = () => (
    <Animated.View style={[styles.header]}>
      <Text style={styles.headerTitle}>Clinical Library</Text>
      <Text style={styles.headerSubtitle}>Explore detailed medical cases and findings</Text>
      
      <View style={styles.searchAndFilterContainer}>
        <Animated.View style={[
          styles.searchContainer,
          { flex: searchBarWidth }
        ]}>
          <Search style={styles.searchIcon} size={20} color="#64748B" />
          <TextInput
            ref={searchInputRef}
            style={styles.searchInput}
            placeholder="Search cases..."
            placeholderTextColor="#94A3B8"
            onChangeText={handleSearch}
            value={searchTerm}
            onFocus={() => {
              setSearchFocused(true);
              Animated.spring(searchBarWidth, {
                toValue: 0.85,
                useNativeDriver: false,
              }).start();
            }}
            onBlur={() => {
              setSearchFocused(false);
              Animated.spring(searchBarWidth, {
                toValue: 1,
                useNativeDriver: false,
              }).start();
            }}
          />
          {searchTerm !== "" && (
            <TouchableOpacity
              style={styles.clearSearch}
              onPress={resetSearch}
            >
              <CloseIcon size={16} color="#64748B" />
            </TouchableOpacity>
          )}
        </Animated.View>

        <TouchableOpacity 
          style={[
            styles.filterButton,
            showFilters && styles.filterButtonActive
          ]}
          onPress={toggleFilters}
        >
          <Filter size={20} color={showFilters ? "#FFFFFF" : "#0F172A"} />
        </TouchableOpacity>
      </View>

      <View style={styles.controlsContainer}>
        <View style={styles.viewModeContainer}>
          <TouchableOpacity 
            style={[
              styles.viewModeButton,
              viewMode === 'grid' && styles.activeViewMode
            ]}
            onPress={() => handleViewModeChange('grid')}
          >
            <Grid size={20} color={viewMode === 'grid' ? "#0F172A" : "#64748B"} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.viewModeButton,
              viewMode === 'list' && styles.activeViewMode
            ]}
            onPress={() => handleViewModeChange('list')}
          >
            <List size={20} color={viewMode === 'list' ? "#0F172A" : "#64748B"} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.itemsPerPageButton}
          onPress={() => setShowItemsPerPageModal(true)}
        >
          <Text style={styles.itemsPerPageText}>{itemsPerPage} per page</Text>
          <ChevronDown size={16} color="#64748B" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const renderFilterPanel = () => (
    <Animated.View style={[
      styles.filterPanel,
      {
        transform: [{
          translateY: filterAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [-300, 0]
          })
        }]
      }
    ]}>
      <View style={styles.filterHeader}>
        <Text style={styles.filterTitle}>Filters</Text>
        <TouchableOpacity
          style={styles.closeFilter}
          onPress={toggleFilters}
        >
          <CloseIcon size={20} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterSection}>
        <Text style={styles.filterSectionTitle}>Sort By</Text>
        <View style={styles.sortOptions}>
          {SORT_OPTIONS.map(option => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.sortOption,
                sortBy === option.value && styles.activeSortOption
              ]}
              onPress={() => handleSort(option.value)}
            >
              <Text style={[
                styles.sortOptionText,
                sortBy === option.value && styles.activeSortOptionText
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.filterSection}>
        <Text style={styles.filterSectionTitle}>Categories</Text>
        <View style={styles.categoryOptions}>
          {CATEGORIES.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryOption,
                selectedCategories.includes(category) && styles.activeCategoryOption
              ]}
              onPress={() => toggleCategory(category)}
            >
              <Text style={[
                styles.categoryOptionText,
                selectedCategories.includes(category) && styles.activeCategoryOptionText
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {(selectedCategories.length > 0 || sortBy !== 'newest') && (
        <TouchableOpacity
          style={styles.resetFiltersButton}
          onPress={() => {
            setSelectedCategories([]);
            setSortBy('newest');
          }}
        >
          <Text style={styles.resetFiltersText}>Reset Filters</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );

  const renderItemsPerPageModal = () => (
    <Modal
      visible={showItemsPerPageModal}
      transparent
      animationType="fade"
      onRequestClose={() => setShowItemsPerPageModal(false)}
    >
      <Pressable 
        style={styles.modalOverlay}
        onPress={() => setShowItemsPerPageModal(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Items per page</Text>
          {ITEMS_PER_PAGE_OPTIONS.map(option => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.modalOption,
                itemsPerPage === option.value && styles.activeModalOption
              ]}
              onPress={() => {
                setItemsPerPage(option.value);
                setShowItemsPerPageModal(false);
                setCurrentPage(1);
              }}
            >
              <Text style={[
                styles.modalOptionText,
                itemsPerPage === option.value && styles.activeModalOptionText
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Pressable>
    </Modal>
  );

  const renderListEmptyComponent = () => (
    <EmptyListView 
      message={
        searchTerm
          ? "No cases match your search criteria"
          : "No clinical cases available"
      }
    />
  );

  const renderCase = useCallback(({ item, index }) => (
    <CaseCard
      item={item}
      index={index}
      handleCaseSelect={handleCaseSelect}  // Change from onPress to handleCaseSelect
      slideAnimation={slideAnimation}
      viewMode={viewMode}
      style={viewMode === 'grid' ? styles.gridItem : styles.listItem}
    />
  ), [viewMode, handleCaseSelect, slideAnimation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {renderHeader()}
      {showFilters && renderFilterPanel()}
      {renderItemsPerPageModal()}

      <FlatList
        ref={flatListRef}
        data={paginatedData}
        renderItem={renderCase}
        keyExtractor={item => item.id}
        contentContainerStyle={[
          styles.listContent,
          viewMode === 'grid' && styles.gridContent
        ]}
        numColumns={viewMode === 'grid' ? 2 : 1}
        key={viewMode} // Force re-render on view mode change
        ListEmptyComponent={renderListEmptyComponent()}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor="#0F172A"
          />
        }
      />

<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}  // Changed from handlePageChange to onPageChange to match child
  itemsPerPage={itemsPerPage}
  totalItems={totalCases}
/>

      {isFullscreenView && selectedCase && (
        <FullscreenView
  selectedCase={selectedCase}
  isFullscreenView={isFullscreenView}  // Add this
  currentImageIndex={currentImageIndex}
  setCurrentImageIndex={setCurrentImageIndex}  // Add this
  isImageLoading={isImageLoading}
  imageError={imageError}
  selectedSection={selectedSection}
  onClose={handleCloseFullscreen}
  onImageSwipe={handleImageSwipe}
  onSectionChange={setSelectedSection}
  onNavigate={navigateToCase}
  animation={fullscreenAnimation}
  scrollRef={fullscreenScrollRef}
  setImageError={setImageError}
  setIsImageLoading={setIsImageLoading}
  filteredCases={filteredCases}  // Add this
/>
      )}
    </View>
  );
};

export default ClinicalCases;