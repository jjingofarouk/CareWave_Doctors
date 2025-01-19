import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet
} from 'react-native';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e4e8',
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004C54',
  },
  
  inputContainer: {
    padding: 20,
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  
  inputGroup: {
    flex: 1,
    marginHorizontal: 8,
  },
  
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#004C54',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  
  input: {
    borderWidth: 1.5,
    borderColor: '#e1e4e8',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  
  alertInput: {
    borderColor: '#ff4444',
    borderWidth: 2,
    backgroundColor: '#fff8f8',
    shadowColor: '#ff4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#004C54',
    marginBottom: 20,
    marginTop: 8,
    letterSpacing: 0.5,
  },
  
  bpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  bpInput: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#e1e4e8',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  
  bpSeparator: {
    fontSize: 24,
    marginHorizontal: 8,
    color: '#004C54',
    fontWeight: '500',
  },
  
  notesContainer: {
    marginTop: 16,
  },
  
  notesInput: {
    borderWidth: 1.5,
    borderColor: '#e1e4e8',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#fff',
    height: 100,
    textAlignVertical: 'top',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  
  saveButton: {
    backgroundColor: '#004C54',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  
  trendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f0f1',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  
  trendButtonText: {
    color: '#004C54',
    marginLeft: 8,
    fontWeight: '500',
    fontSize: 14,
  },
  
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004C54',
    letterSpacing: 0.5,
  },
  
  closeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#e8f0f1',
  },
  
  bmiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f0f1',
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  
  bmiLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#004C54',
    marginRight: 8,
    letterSpacing: 0.3,
  },
  
  bmiValue: {
    fontSize: 16,
    color: '#004C54',
    fontWeight: '500',
  }
});