import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  mainContainer: {
    flex: 1,
  },
  mainScroll: {
    flex: 1,
  },
  headerContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
  },
  searchInputsContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    gap: 16,
  },
  inputWrapper: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
  },
  searchContainer: {
    position: 'relative',
  },
  searchInput: {
    height: 44,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#0F172A',
  },
  searchInputActive: {
    borderColor: '#3B82F6',
    borderWidth: 2,
  },
  searchInputFilled: {
    backgroundColor: '#F8FAFC',
  },
  suggestionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginTop: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  suggestionsList: {
    maxHeight: 200,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  suggestionText: {
    fontSize: 16,
    color: '#334155',
  },
  resultsContainer: {
    padding: 16,
    gap: 16,
  },
  resultsSection: {
    gap: 12,
  },
  resultsSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  interactionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  interactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  drugName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    flex: 1,
  },
  sourceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  sourceText: {
    fontSize: 12,
    fontWeight: '500',
  },
  interactionText: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
  },
  extendedDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  messageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  noInteractionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#BBF7D0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  iconText: {
    fontSize: 24,
    color: '#166534',
  },
  messageTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
    textAlign: 'center',
  },
  messageText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
  },
  suggestionsSection: {
    width: '100%',
    gap: 12,
    marginTop: 8,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
  },
  suggestionCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
});