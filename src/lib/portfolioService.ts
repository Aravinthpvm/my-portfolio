import { supabase } from '@/lib/supabase'
import { localProjects, localCertificates, localTechStack } from './portfolioData'

const isLocalOnly = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const fetchProjects = async () => {
  if (isLocalOnly) {
    return localProjects;
  }
  try {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: true });
    return data && data.length > 0 ? data : localProjects;
  } catch {
    return localProjects;
  }
}

export const fetchCertificates = async () => {
  if (isLocalOnly) {
    return localCertificates;
  }
  try {
    const { data } = await supabase
      .from('certificates')
      .select('*')
      .order('created_at', { ascending: true });
    return data && data.length > 0 ? data : localCertificates;
  } catch {
    return localCertificates;
  }
}

export const fetchTechStacks = async () => {
  if (isLocalOnly) {
    return localTechStack;
  }
  try {
    const { data } = await supabase
      .from('tech_stack')
      .select('*')
      .order('created_at', { ascending: true });
    return data && data.length > 0 ? data : localTechStack;
  } catch {
    return localTechStack;
  }
}