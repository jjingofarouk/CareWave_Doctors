import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  tipContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#27c7b8',
    borderRadius: 5,
  },
  tipText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    fontSize: 14,
    color: '#666',
  },
  appointmentsList: {
    marginTop: 10,
  },
});
