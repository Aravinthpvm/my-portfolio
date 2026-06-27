import { supabase } from '@/lib/supabase'

const isLocalOnly = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Fallback comments stored in localStorage
const getLocalComments = (): any[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('portfolio-comments');
  if (stored) {
    try { return JSON.parse(stored); } catch { return []; }
  }
  const defaultComments = [
    {
      id: 1,
      name: "Alex",
      comment: "This portfolio looks absolutely fantastic! The 3D background is so smooth.",
      image_url: null,
      likes: 5,
      is_pinned: true,
      replies: [],
      created_at: new Date().toISOString(),
      liked_by_admin: true
    },
    {
      id: 2,
      name: "Sarah",
      comment: "Love the micro-animations. Extremely premium and responsive!",
      image_url: null,
      likes: 2,
      is_pinned: false,
      replies: [],
      created_at: new Date().toISOString(),
      liked_by_admin: false
    }
  ];
  localStorage.setItem('portfolio-comments', JSON.stringify(defaultComments));
  return defaultComments;
};

const saveLocalComments = (comments: any[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('portfolio-comments', JSON.stringify(comments));
  }
};

export const fetchCommentsService = async () => {
  if (isLocalOnly) {
    return getLocalComments();
  }

  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) throw error

  return data || []
}

export const likeCommentService = async (
  id: number,
  currentLikes: number
) => {
  const newLikes = (currentLikes || 0) + 1

  if (isLocalOnly) {
    const comments = getLocalComments();
    const updated = comments.map(c => c.id === id ? { ...c, likes: newLikes } : c);
    saveLocalComments(updated);
    return newLikes;
  }

  const { error } = await supabase
    .from('comments')
    .update({ likes: newLikes })
    .eq('id', id)

  if (error) throw error

  return newLikes;
}

export const uploadCommentImageService = async (
  image: File
) => {
  if (isLocalOnly) {
    // Return a base64 or temporary URL
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(image);
    });
  }

  const fileName = `${Date.now()}-${image.name}`

  const { error } = await supabase.storage
    .from('comments')
    .upload(fileName, image)

  if (error) throw error

  const { data } = supabase.storage
    .from('comments')
    .getPublicUrl(fileName)

  return data.publicUrl
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
  if (isLocalOnly) {
    const comments = getLocalComments();
    const newComment = {
      id: Date.now(),
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

  const { data, error } = await supabase
    .from('comments')
    .insert([
      {
        name,
        comment,
        image_url: imageUrl,
        likes: 0,
        replies: [],
        is_pinned: false,
      },
    ])
    .select()
    .single()

  if (error) throw error

  return data
}