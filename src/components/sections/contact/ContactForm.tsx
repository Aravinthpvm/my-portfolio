import { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import {
  Send,
  User,
  Mail,
  MessageSquare,
  ArrowUpRight,
  Loader2,
} from 'lucide-react'

import {
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
  FaYoutube,
  FaTiktok,
} from 'react-icons/fa'

import { db, isFirebaseConfigured } from '@/lib/firebase'
import { collection, addDoc } from 'firebase/firestore'

const smoothEase: [number, number, number, number] = [
  0.22,
  1,
  0.36,
  1,
]

const fieldVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 26,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: smoothEase,
    },
  },
}

const socialLinks = [
  {
    title: 'LinkedIn',
    user: 'aravinthanb1810',
    icon: FaLinkedinIn,
    link: 'https://linkedin.com/in/aravinthanb1810',
  },
  {
    title: 'Github',
    user: 'Aravinthpvm',
    icon: FaGithub,
    link: 'https://github.com/Aravinthpvm',
  },
]

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; text: string }>({ type: null, text: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: 'error', text: 'Please fill in all fields.' })
      return
    }
    setLoading(true)
    setStatus({ type: null, text: '' })

    try {
      if (isFirebaseConfigured && db) {
        await addDoc(collection(db, 'messages'), {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          message: message.trim(),
          created_at: new Date().toISOString(),
        })
      } else {
        const localMsgs = localStorage.getItem('portfolio-messages')
        const msgs = localMsgs ? JSON.parse(localMsgs) : []
        msgs.unshift({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          message: message.trim(),
          created_at: new Date().toISOString(),
        })
        localStorage.setItem('portfolio-messages', JSON.stringify(msgs))
      }

      // Send email notification via Web3Forms
      const web3AccessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
      if (web3AccessKey && web3AccessKey !== 'YOUR_WEB3FORMS_ACCESS_KEY_HERE') {
        try {
          await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              access_key: web3AccessKey,
              subject: 'Someone contacted you via the portfolio',
              from_name: name.trim(),
              email: email.trim().toLowerCase(),
              message: message.trim(),
            }),
          })
        } catch (e) {
          console.error('Failed to send email via Web3Forms:', e)
        }
      }

      setStatus({ type: 'success', text: 'Thank you! Your message was sent successfully.' })
      setName('')
      setEmail('')
      setMessage('')
    } catch (err) {
      console.error(err)
      setStatus({ type: 'error', text: 'Failed to send message. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: smoothEase }}
      viewport={{ once: false, amount: 0.2 }}
      className="rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 md:p-8 flex flex-col h-full"
    >
      {/* HEADER */}
      <motion.div
        variants={fieldVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        transition={{ delay: 0.05 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Get In Touch
        </h2>

        <p className="text-sm text-white/50 mb-7">
          Feel free to reach out if you want to collaborate,
          discuss ideas, or simply say hello.
        </p>
      </motion.div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* STATUS MESSAGE */}
        {status.type && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl text-xs font-medium border ${
              status.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
            }`}
          >
            {status.text}
          </motion.div>
        )}

        {/* NAME */}
        <motion.div
          variants={fieldVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />

            <input
              required
              disabled={loading}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full rounded-2xl border border-white/15 bg-black/20 pl-12 pr-4 py-4 outline-none transition duration-200 focus:border-white focus:ring-1 focus:ring-white/40 disabled:opacity-50"
            />
          </div>
        </motion.div>

        {/* EMAIL */}
        <motion.div
          variants={fieldVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          transition={{ delay: 0.16 }}
        >
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />

            <input
              required
              type="email"
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="w-full rounded-2xl border border-white/15 bg-black/20 pl-12 pr-4 py-4 outline-none transition duration-200 focus:border-white focus:ring-1 focus:ring-white/40 disabled:opacity-50"
            />
          </div>
        </motion.div>

        {/* MESSAGE */}
        <motion.div
          variants={fieldVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          transition={{ delay: 0.22 }}
        >
          <div className="relative">
            <MessageSquare className="absolute left-4 top-5 text-white/40" />

            <textarea
              required
              rows={5}
              disabled={loading}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message"
              className="w-full rounded-2xl border border-white/15 bg-black/20 pl-12 pr-4 py-4 outline-none resize-none transition duration-200 focus:border-white focus:ring-1 focus:ring-white/40 disabled:opacity-50"
            />
          </div>
        </motion.div>

        {/* BUTTON */}
        <motion.button
          type="submit"
          disabled={loading}
          variants={fieldVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          transition={{ delay: 0.28 }}
          whileHover={loading ? {} : {
            scale: 1.04,
            transition: { duration: 0.12 },
          }}
          whileTap={loading ? {} : { scale: 0.97 }}
          className="w-full rounded-2xl py-4 bg-white/10 border border-white/10 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            <Send size={16} />
          )}
          {loading ? 'Sending...' : 'Send Message'}
        </motion.button>
      </form>

      {/* SOCIAL */}
      <div className="border-t border-white/10 pt-5 mt-6">
        <motion.p
          variants={fieldVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          transition={{ delay: 0.34 }}
          className="text-sm text-white/55 mb-4"
        >
          Connect With Me
        </motion.p>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {socialLinks.map((item, i) => {
            const Icon = item.icon

            return (
              <motion.a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={fieldVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false }}
                transition={{
                  delay: 0.36 + i * 0.05,
                }}
                whileHover={{
                  scale: 1.06,
                  transition: { duration: 0.12 },
                }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-3 flex items-center justify-between"
              >
                <div className="absolute inset-0 bg-white/[0.04] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out" />

                <div className="relative z-10 flex items-center gap-3">
                  <Icon />

                  <div>
                    <p className="text-sm">{item.title}</p>
                    <p className="text-[11px] text-white/35">
                      {item.user}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 opacity-0 group-hover:opacity-100 transition">
                  <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center">
                    <ArrowUpRight size={12} />
                  </div>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}