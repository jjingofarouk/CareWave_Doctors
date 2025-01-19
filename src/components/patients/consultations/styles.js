import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',  // Light gray background
    },
    headerContainer: {
      backgroundColor: '#075E54', // Dark Green (WhatsApp-inspired)
      paddingHorizontal: 16,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      paddingTop: Platform.OS === 'ios' ? 0 : 12,
      paddingBottom: 12,
    },
    headerContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 8,
    },
    headerProfile: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerText: {
      marginLeft: 12,
    },
    headerName: {
      color: '#FFFFFF', // White text for contrast
      fontSize: 18,
      fontWeight: '600',
    },
    headerStatus: {
      color: '#25D366', // Light Green for status
      fontSize: 14,
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerButton: {
      padding: 8,
      marginLeft: 8,
    },
    avatarContainer: {
      position: 'relative',
      marginRight: 8,
    },
    avatarSmall: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#DDD',
    },
    avatarMedium: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#DDD',
    },
    statusIndicator: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 10,
      height: 10,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: 'white',
    },
    messagesList: {
      padding: 16,
    },
    messageContainer: {
      flexDirection: 'row',
      marginBottom: 16,
      maxWidth: '80%',
    },
    doctorMessage: {
      alignSelf: 'flex-start',
    },
    patientMessage: {
      alignSelf: 'flex-end',
    },
    messageBubble: {
      borderRadius: 20,
      padding: 12,
      maxWidth: '100%',
    },
    doctorBubble: {
      backgroundColor: 'white',
      borderTopLeftRadius: 4,
    },
    patientBubble: {
      backgroundColor: '#25D366', // Lighter Green for patient bubbles
      borderTopRightRadius: 4,
    },
    messageText: {
      fontSize: 16,
      lineHeight: 22,
    },
    doctorText: {
      color: '#333',
    },
    patientText: {
      color: 'white',
    },
    messageFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginTop: 4,
    },
    timestampText: {
      fontSize: 12,
      color: '#888',
      marginRight: 4,
    },
    statusText: {
      fontSize: 12,
      color: '#075E54', // Dark Green for status
    },
    attachmentContainer: {
      marginTop: 8,
      borderRadius: 8,
      overflow: 'hidden',
    },
    attachmentImage: {
      width: '100%',
      height: 200,
      borderRadius: 8,
    },
    documentAttachment: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
      backgroundColor: '#F5F5F5', // Light gray
      borderRadius: 8,
    },
    documentName: {
      marginLeft: 8,
      fontSize: 14,
      color: '#333',
      flex: 1,
    },
    attachmentPreviewContainer: {
      padding: 8,
      borderTopWidth: 1,
      borderTopColor: '#EEE',
    },
    attachmentPreview: {
      marginRight: 8,
      position: 'relative',
    },
    attachmentPreviewImage: {
      width: 60,
      height: 60,
      borderRadius: 8,
    },
    documentPreview: {
      width: 60,
      height: 60,
      borderRadius: 8,
      backgroundColor: '#F5F5F5', // Light gray
      justifyContent: 'center',
      alignItems: 'center',
    },
    documentPreviewName: {
      fontSize: 10,
      color: '#333',
      textAlign: 'center',
      marginTop: 4,
    },
    removeAttachmentButton: {
      position: 'absolute',
      top: -4,
      right: -4,
      backgroundColor: '#F78837', // Tangerine Tango for delete button
      width: 20,
      height: 20,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'white',
    },
    inputContainer: {
      borderTopWidth: 1,
      borderTopColor: '#EEE',
      backgroundColor: 'white',
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      padding: 8,
    },
    inputActions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    actionButton: {
      padding: 8,
      marginRight: 4,
    },
    input: {
      flex: 1,
      marginHorizontal: 8,
      maxHeight: 100,
      minHeight: 40,
      backgroundColor: '#F5F5F5', // Light gray
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 20,
      paddingTop: 8,
      fontSize: 16,
      color: '#333',
    },
    sendButton: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: '#075E54', // Dark Green for send button
      justifyContent: 'center',
      alignItems: 'center',
    },
    sendButtonDisabled: {
      opacity: 0.5,
    },
  }); 