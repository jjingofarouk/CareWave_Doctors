import { StyleSheet, Dimensions, Platform, } from 'react-native';

const { width } = Dimensions.get('window');

// Hospital theme colors
const COLORS = {
  primary: '#004C54', // Medical blue
  secondary: '#34A0A4', // Teal accent
  success: '#2D8A6B', // Medical green
  background: '#F5F7FA',
  white: '#FFFFFF',
  text: {
    primary: '#2C3E50',
    secondary: '#5D7285',
    light: '#8896A6'
  },
  border: '#E1E8ED',
  rating: '#FFB400',
  chip: {
    background: '#E8F4F5',
    text: '#2C5282'
  }
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    elevation: 4,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  editButtonText: {
    color: COLORS.white,
    marginLeft: 8,
    fontWeight: '500',
  },
  previewContainer: {
    flex: 1,
  },
  previewHeader: {
    backgroundColor: COLORS.white,
    padding: 20,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  previewProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.secondary,
  },
  previewHeaderInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  previewName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  previewTitle: {
    fontSize: 16,
    color: COLORS.secondary,
    marginBottom: 2,
  },
  previewSpecialty: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 8,
  },
  previewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 8,
    color: COLORS.text.secondary,
    fontSize: 14,
  },
  quickActions: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: 16,
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    elevation: 2,
  },
  actionButtonText: {
    color: COLORS.white,
    marginLeft: 8,
    fontWeight: '500',
  },
  previewSection: {
    backgroundColor: COLORS.white,
    marginTop: 8,
    padding: 16,
  },
  previewSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.secondary,
    paddingBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text.primary,
    marginTop: 12,
    marginBottom: 8,
  },
  previewText: {
    fontSize: 15,
    color: COLORS.text.secondary,
    marginBottom: 6,
    lineHeight: 22,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  specialtyChip: {
    backgroundColor: COLORS.chip.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  specialtyChipText: {
    color: COLORS.chip.text,
    fontSize: 14,
  },
  availabilityContainer: {
    backgroundColor: COLORS.white,
  },
  nextAvailable: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.success,
    marginBottom: 8,
  },
  scheduleText: {
    fontSize: 15,
    color: COLORS.text.secondary,
    marginBottom: 6,
  },
  contactContainer: {
    backgroundColor: COLORS.white,
  },
  contactText: {
    fontSize: 15,
    color: COLORS.text.secondary,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Edit mode styles
  editContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  editSection: {
    backgroundColor: COLORS.white,
    marginBottom: 8,
    padding: 16,
    borderRadius: 8,
    elevation: 1,
  },
  editSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: COLORS.text.primary,
    backgroundColor: COLORS.white,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  imageUploadButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  uploadedImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: COLORS.secondary,
  },
  uploadPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.chip.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  uploadText: {
    color: COLORS.text.secondary,
    marginTop: 8,
    fontSize: 14,
  },
  arrayInputContainer: {
    marginBottom: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  chip: {
    backgroundColor: COLORS.chip.background,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
  },
  chipText: {
    color: COLORS.chip.text,
    marginRight: 8,
    fontSize: 14,
  },
  addItemContainer: {
    marginTop: 8,
  },
  addItemInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: COLORS.text.primary,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: COLORS.success,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
    marginHorizontal: 16,
    elevation: 2,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // or your desired background color
    paddingTop: Platform.OS === 'android' ? 25 : 0, // Optional: Add padding for Android if needed
  },
  container: {
    flex: 1,
  },
});