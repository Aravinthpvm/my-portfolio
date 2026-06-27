import { localProjects, localCertificates, localTechStack } from './portfolioData'
import { db, isFirebaseConfigured } from './firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'

export const fetchProjects = async () => {
  if (!isFirebaseConfigured || !db) {
    return localProjects;
  }
  try {
    const q = query(collection(db, 'projects'), orderBy('created_at', 'asc'));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return data.length > 0 ? data : localProjects;
  } catch (e) {
    console.error('fetchProjects Firebase error, using static fallback:', e);
    return localProjects;
  }
}

export const fetchCertificates = async () => {
  if (!isFirebaseConfigured || !db) {
    return localCertificates;
  }
  try {
    const q = query(collection(db, 'certificates'), orderBy('created_at', 'asc'));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return data.length > 0 ? data : localCertificates;
  } catch (e) {
    console.error('fetchCertificates Firebase error, using static fallback:', e);
    return localCertificates;
  }
}

export const fetchTechStacks = async () => {
  if (!isFirebaseConfigured || !db) {
    return localTechStack;
  }
  try {
    const q = query(collection(db, 'tech_stack'), orderBy('created_at', 'asc'));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return data.length > 0 ? data : localTechStack;
  } catch (e) {
    console.error('fetchTechStacks Firebase error, using static fallback:', e);
    return localTechStack;
  }
}