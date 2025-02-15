
// ----- STYLES -----
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 10,
  },
  timerOverlay: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0,122,255,0.7)',
    padding: 10,
    borderRadius: 25,
  },
  timerText: {
    fontSize: 24,
    color: '#fff',
  },
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  vitalBox: {
    width: '48%',
    backgroundColor: '#e6f0ff',
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  vitalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginVertical: 5,
  },
  vitalValue: {
    fontSize: 14,
    color: '#007AFF',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    width: '40%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  picker: {
    height: 50,
    width: 150,
    color: '#007AFF',
  },
  chartContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
  },
  videoCallContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoFeed: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vitalsOverlay: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  hangupButton: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 50,
  },
  hangupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});