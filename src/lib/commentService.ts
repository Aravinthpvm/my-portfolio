import { db, storage, isFirebaseConfigured } from './firebase'
import { collection, getDocs, addDoc, doc, updateDoc, increment, query, orderBy } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

// Fallback comments stored in localStorage
const getLocalComments = (): any[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('portfolio-comments-v2');
  if (stored) {
    try { return JSON.parse(stored); } catch { return []; }
  }
  const defaultComments: any[] = [];
  localStorage.setItem('portfolio-comments-v2', JSON.stringify(defaultComments));
  return defaultComments;
};

const saveLocalComments = (comments: any[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('portfolio-comments-v2', JSON.stringify(comments));
  }
};

export const fetchCommentsService = async () => {
  if (!isFirebaseConfigured || !db) {
    return getLocalComments();
  }
  try {
    const q = query(collection(db, 'comments'), orderBy('is_pinned', 'desc'), orderBy('created_at', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (e) {
    console.error('fetchComments Firebase error, using static fallback:', e);
    return getLocalComments();
  }
}

export const likeCommentService = async (
  id: string | number,
  currentLikes: number
) => {
  const newLikes = (currentLikes || 0) + 1;
  if (!isFirebaseConfigured || !db) {
    const comments = getLocalComments();
    const updated = comments.map(c => c.id === id ? { ...c, likes: newLikes } : c);
    saveLocalComments(updated);
    return newLikes;
  }
  try {
    const docRef = doc(db, 'comments', id.toString());
    await updateDoc(docRef, { likes: increment(1) });
    return newLikes;
  } catch (e) {
    console.error('likeComment Firebase error, using fallback:', e);
    const comments = getLocalComments();
    const updated = comments.map(c => c.id === id ? { ...c, likes: newLikes } : c);
    saveLocalComments(updated);
    return newLikes;
  }
}

export const uploadCommentImageService = async (image: File): Promise<string> => {
  if (!isFirebaseConfigured || !storage) {
    // Fallback to base64 Data URL if storage is unconfigured
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(image);
    });
  }
  try {
    const fileName = `comments/${Date.now()}-${image.name}`;
    const fileRef = ref(storage, fileName);
    await uploadBytes(fileRef, image);
    return await getDownloadURL(fileRef);
  } catch (e) {
    console.error('uploadCommentImage Firebase error, using base64 fallback:', e);
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(image);
    });
  }
}

export const createCommentService = async ({
  name,
  comment,
  imageUrl,
}: {
  name: string
  comment: string
  imageUrl: string | null
}) => {
  if (!isFirebaseConfigured || !db) {
    const comments = getLocalComments();
    const newComment = {
      id: Date.now().toString(),
      name,
      comment,
      image_url: imageUrl,
      likes: 0,
      replies: [],
      is_pinned: false,
      created_at: new Date().toISOString(),
      liked_by_admin: false
    };
    saveLocalComments([newComment, ...comments]);
    return newComment;
  }
  try {
    const newCommentData = {
      name,
      comment,
      image_url: imageUrl,
      likes: 0,
      replies: [],
      is_pinned: false,
      created_at: new Date().toISOString(),
      liked_by_admin: false
    };
    const docRef = await addDoc(collection(db, 'comments'), newCommentData);
    return {
      id: docRef.id,
      ...newCommentData
    };
  } catch (e) {
    console.error('createComment Firebase error, using fallback:', e);
    const comments = getLocalComments();
    const newComment = {
      id: Date.now().toString(),
      name,
      comment,
      image_url: imageUrl,
      likes: 0,
      replies: [],
      is_pinned: false,
      created_at: new Date().toISOString(),
      liked_by_admin: false
    };
    saveLocalComments([newComment, ...comments]);
    return newComment;
  }
}