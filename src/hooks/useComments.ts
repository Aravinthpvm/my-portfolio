'use client'

import { useEffect, useState } from 'react'
import { db, isFirebaseConfigured } from '@/lib/firebase'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import {
  fetchCommentsService,
  createCommentService,
  likeCommentService,
  uploadCommentImageService,
} from '@/lib/commentService'

export default function useComments() {
  const [comments, setComments] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchInitialComments()

    if (!isFirebaseConfigured || !db) return;

    const q = query(collection(db, 'comments'), orderBy('is_pinned', 'desc'), orderBy('created_at', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveComments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setComments(liveComments);
    }, (error) => {
      console.error('Firestore real-time subscription error:', error);
    });

    return () => {
      unsubscribe();
    }
  }, [])

  const fetchInitialComments = async () => {
    try {
      const data = await fetchCommentsService()
      setComments(data)
    } catch (err) {
      console.log(err)
    }
  }

  const addComment = async ({
    name,
    comment,
    image,
  }: {
    name: string
    comment: string
    image: File | null
  }) => {
    if (!name.trim()) return
    if (!comment.trim()) return

    setLoading(true)

    try {
      let imageUrl: string | null = null

      if (image) {
        imageUrl = await uploadCommentImageService(image)
      }

      const newComment = await createCommentService({
        name,
        comment,
        imageUrl,
      })

      // Instant UI update for better UX (while snapshot is synced)
      setComments((prev) => {
        const exists = prev.some(c => c.id === newComment.id);
        if (exists) return prev;
        return [newComment, ...prev];
      })
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const likeComment = async (
    id: string | number,
    currentLikes: number
  ) => {
    const liked = localStorage.getItem(`liked-${id}`)

    if (liked) return

    try {
      const newLikes = await likeCommentService(
        id,
        currentLikes
      )

      localStorage.setItem(`liked-${id}`, 'true')

      setComments((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, likes: newLikes }
            : item
        )
      )
    } catch (err) {
      console.log(err)
    }
  }

  return {
    comments,
    loading,
    addComment,
    likeComment,
  }
}