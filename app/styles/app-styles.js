import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 400, // Simulates max-w-lg containment
    alignSelf: 'center', // Simulates mx-auto to center content
    backgroundColor: '#F9FAFB', // bg-gray-50
    width: '100%',
  },
  header: {
    backgroundColor: '#4F46E5', // bg-indigo-600
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#A5B4FC', // text-indigo-200
    fontSize: 14,
  },
  profileButton: {
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 9999, // rounded-full
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Main Content
  scrollArea: {
    flex: 1,
    padding: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    color: '#1F2937', // text-gray-800
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  listContainer: {
    gap: 12, // Native equivalent of space-y-3
  },
  listItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12, // rounded-xl
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // Android shadow
  },
  itemIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#E5E7EB', // bg-gray-200
    borderRadius: 9999,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  itemTextContainer: {
    flex: 1,
    minWidth: 0,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#6B7280', // text-gray-500
  },
  itemViewButton: {
    fontSize: 14,
    color: '#4F46E5', // text-indigo-600
    marginLeft: 16,
    flexShrink: 0,
  },
  bottomSpacer: {
    height: 64, // h-16
  },
  // Bottom Navigation
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB', // border-t border-gray-200
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 10, // shadow-xl equivalent
  },
  tabItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabIcon: {
    fontSize: 24,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  tabLabelActive: {
    color: '#4F46E5', // text-indigo-600
  },
  tabLabelInactive: {
    color: '#6B7280', // text-gray-500
  },
  lockInButton: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 8,
	fontSize: 24,
    backgroundColor: '#333333',
    color: '#DDDDDD', // text-indigo-600
    borderRadius: 9, // rounded-full
    padding: 5,
  }
});

export default styles; // <-- THE EXPORT MAGIC!