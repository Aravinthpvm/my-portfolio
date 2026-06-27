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

let isDbConnected: boolean | null = null;

async function checkDbConfig(): Promise<boolean> {
  if (isDbConnected !== null) return isDbConnected;
  try {
    const res = await fetch('/api/config');
    const data = await res.json();
    isDbConnected = !!data.dbConnected;
  } catch {
    isDbConnected = false;
  }
  return isDbConnected;
}

export const fetchCommentsService = async () => {
  const dbActive = await checkDbConfig();
  if (!dbActive) {
    return getLocalComments();
  }
  try {
    const res = await fetch('/api/comments');
    if (!res.ok) throw new Error('API failed');
    return await res.json();
  } catch (e) {
    console.error('fetchComments client API error, using static fallback:', e);
    return getLocalComments();
  }
}

export const likeCommentService = async (
  id: string | number,
  currentLikes: number
) => {
  const newLikes = (currentLikes || 0) + 1;
  const dbActive = await checkDbConfig();
  if (!dbActive) {
    const comments = getLocalComments();
    const updated = comments.map(c => c.id === id ? { ...c, likes: newLikes } : c);
    saveLocalComments(updated);
    return newLikes;
  }
  try {
    const res = await fetch('/api/comments/like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commentId: id.toString() })
    });
    if (!res.ok) throw new Error('API failed');
    const data = await res.json();
    return data.likes;
  } catch (e) {
    console.error('likeComment client API error, using fallback:', e);
    const comments = getLocalComments();
    const updated = comments.map(c => c.id === id ? { ...c, likes: newLikes } : c);
    saveLocalComments(updated);
    return newLikes;
  }
}

export const uploadCommentImageService = async (image: File): Promise<string> => {
  // Convert image file to self-contained Base64 Data URL for storage in MongoDB
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(image);
  });
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
  const dbActive = await checkDbConfig();
  if (!dbActive) {
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
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, comment, image_url: imageUrl })
    });
    if (!res.ok) throw new Error('API failed');
    return await res.json();
  } catch (e) {
    console.error('createComment client API error, using fallback:', e);
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