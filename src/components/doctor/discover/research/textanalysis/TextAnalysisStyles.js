import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  Alert,
  Modal,
  ActivityIndicator,
  Animated,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7F9',
  },
  headerContainer: {
    padding: 20,
    backgroundColor: '#002432',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    color: '#27C7B8',
    marginBottom: 8,
  },
  section: {
    marginVertical: 12,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#002432',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#002432',
    marginBottom: 16,
  },
  uploadContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#27C7B8',
    borderRadius: 12,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7F9',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  uploadButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#27C7B8',
    fontWeight: '500',
  },
  supportedFormats: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
  },
  textArea: {
    minHeight: 120,
    backgroundColor: '#F5F7F9',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#002432',
    textAlignVertical: 'top',
  },
  analyzeButton: {
    backgroundColor: '#27C7B8',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  resultsContainer: {
    backgroundColor: '#fff',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#F5F7F9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#002432',
  },
  detailedAnalysis: {
    marginTop: 20,
  },
  analysisHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#002432',
    marginBottom: 12,
  },
  termsScroll: {
    marginBottom: 20,
  },
  termChip: {
    backgroundColor: '#27C7B8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  termText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  topicsContainer: {
    marginTop: 12,
  },
  topicItem: {
    marginBottom: 12,
  },
  topicName: {
    fontSize: 14,
    color: '#002432',
    marginBottom: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F5F7F9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#27C7B8',
  },
  topicPercentage: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  chartsContainer: {
    marginTop: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#002432',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 8,
  },
  chartControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  chartButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 8,
    backgroundColor: '#F5F7F9',
  },
  activeChartButton: {
    backgroundColor: '#27C7B8',
  },
  chartButtonText: {
    color: '#002432',
    fontWeight: '500',
  },
  notesInput: {
    minHeight: 150,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27C7B8',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  lastSaved: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  projectList: {
    maxHeight: 300,
  },
  projectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F7F9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  activeProject: {
    backgroundColor: '#E6F7F5',
    borderColor: '#27C7B8',
    borderWidth: 1,
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#002432',
  },
  projectDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  exportContainer: {
    alignItems: 'center',
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#002432',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  formatSelector: {
    flexDirection: 'row',
    marginTop: 8,
  },
  formatButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 8,
    backgroundColor: '#F5F7F9',
  },
  activeFormat: {
    backgroundColor: '#27C7B8',
  },
  formatText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#002432',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 36, 50, 0.5)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#002432',
  },
  closeButton: {
    padding: 8,
  },
  settingsSection: {
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F7F9',
  },
  settingLabel: {
    fontSize: 16,
    color: '#002432',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 8,
  },
  infoText: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 12,
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 36, 50, 0.9)',
    padding: 8,
    borderRadius: 4,
    maxWidth: 200,
  },
  tooltipText: {
    color: '#fff',
    fontSize: 12,
  },
  tooltipArrow: {
    position: 'absolute',
    bottom: -8,
    left: '50%',
    marginLeft: -8,
    borderTopWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 0,
    borderLeftWidth: 8,
    borderTopColor: 'rgba(0, 36, 50, 0.9)',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7F9',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#002432',
  },
  searchIcon: {
    marginRight: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7F9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  filterButtonText: {
    fontSize: 14,
    color: '#002432',
    marginLeft: 4,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F7F5',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  chipText: {
    fontSize: 14,
    color: '#27C7B8',
    marginRight: 4,
  },
  removeChip: {
    padding: 2,
  },
  highlightedText: {
    backgroundColor: '#E6F7F5',
    borderRadius: 2,
  },
});