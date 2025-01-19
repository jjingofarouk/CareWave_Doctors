import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_MARGIN = 8;
const GRID_COLUMNS = 2;
const CARD_WIDTH = (SCREEN_WIDTH - (CARD_MARGIN * (GRID_COLUMNS + 1) * 2)) / GRID_COLUMNS;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  // Header Styles
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 10,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },

  headerSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
  },

  // Search and Filter Styles
  searchAndFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },

  searchIcon: {
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A',
    paddingVertical: 8,
    ...Platform.select({
      ios: {
        paddingTop: 8,
      },
    }),
  },

  clearSearch: {
    padding: 4,
  },

  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  filterButtonActive: {
    backgroundColor: '#0F172A',
  },

  // Controls Container Styles
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  viewModeContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    padding: 4,
  },

  viewModeButton: {
    padding: 8,
    borderRadius: 8,
  },

  activeViewMode: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  itemsPerPageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 4,
  },

  itemsPerPageText: {
    fontSize: 14,
    color: '#64748B',
  },

  // Filter Panel Styles
  filterPanel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    margin: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    maxHeight: '70%',
  },

  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  filterTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
  },

  closeFilter: {
    padding: 4,
  },

  filterSection: {
    marginBottom: 24,
  },

  filterSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 12,
  },

  // Sort Options Styles
  sortOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  sortOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },

  activeSortOption: {
    backgroundColor: '#0F172A',
  },

  sortOptionText: {
    fontSize: 14,
    color: '#64748B',
  },

  activeSortOptionText: {
    color: '#FFFFFF',
  },

  // Category Options Styles
  categoryOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  categoryOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
  },

  activeCategoryOption: {
    backgroundColor: '#0F172A',
  },

  categoryOptionText: {
    fontSize: 13,
    color: '#64748B',
  },

  activeCategoryOptionText: {
    color: '#FFFFFF',
  },

  resetFiltersButton: {
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
  },

  resetFiltersText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DC2626',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: '80%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 16,
  },

  modalOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },

  activeModalOption: {
    backgroundColor: '#F1F5F9',
  },

  modalOptionText: {
    fontSize: 15,
    color: '#64748B',
  },

  activeModalOptionText: {
    color: '#0F172A',
    fontWeight: '500',
  },

  // List and Grid Styles
  listContent: {
    padding: 16,
  },

  gridContent: {
    padding: 8,
  },

  listItem: {
    marginBottom: 16,
    width: '100%',
  },

  gridItem: {
    width: CARD_WIDTH,
    margin: CARD_MARGIN,
  },

  // Animation Constants
  animationConfig: {
    tension: 50,
    friction: 7,
    useNativeDriver: true,
  },
});