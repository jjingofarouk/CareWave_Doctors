import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Color palette
const COLORS = {
  primary: '#2563EB',
  secondary: '#64748B',
  success: '#22C55E',
  background: '#FFFFFF',
  surface: '#F8FAFC',
  text: {
    primary: '#1E293B',
    secondary: '#64748B',
    light: '#94A3B8'
  },
  border: '#E2E8F0',
  shadow: '#0F172A'
};

export const styles = StyleSheet.create({
  // Header Styles
  fullscreenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
  },

  backButtonText: {
    fontSize: 24,
    color: COLORS.primary,
  },

  fullscreenTitleContainer: {
    flex: 1,
    marginHorizontal: 16,
  },

  fullscreenTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    textAlign: 'center',
  },

  navButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    marginHorizontal: 4,
  },

  navButtonText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },

  // Image Gallery Styles
  fullscreenImageContainer: {
    height: SCREEN_HEIGHT * 0.4,
    backgroundColor: COLORS.surface,
    position: 'relative',
  },

  imageItem: {
    width: SCREEN_WIDTH,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  imageNavigationBar: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  imageDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.text.light,
    opacity: 0.5,
  },

  imageDotActive: {
    width: 10,
    height: 10,
    backgroundColor: COLORS.primary,
    opacity: 1,
  },

  // Case Details Styles
  detailsContainer: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingTop: 8,
    flex: 1,
  },

  sectionTabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },

  sectionTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
  },

  activeTab: {
    backgroundColor: COLORS.primary,
  },

  sectionTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text.secondary,
  },

  activeTabText: {
    color: COLORS.background,
  },

  sectionContent: {
    padding: 20,
  },

  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.text.primary,
  },

  findingsSection: {
    marginBottom: 20,
  },

  findingsCategory: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 8,
  },

  findingItem: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.text.secondary,
    marginBottom: 4,
    paddingLeft: 8,
  },

  diagnosisSection: {
    gap: 8,
  },

  diagnosisItem: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.text.primary,
    paddingLeft: 8,
  },

  managementSection: {
    gap: 8,
  },

  managementItem: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.text.primary,
    paddingLeft: 8,
  },

  // Loading State
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});