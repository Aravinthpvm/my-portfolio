import { localProjects, localCertificates, localTechStack } from './portfolioData'

export const fetchProjects = async () => {
  try {
    const res = await fetch('/api/projects');
    if (!res.ok) throw new Error('API failed');
    const data = await res.json();
    return data && data.length > 0 ? data : localProjects;
  } catch (e) {
    console.error('fetchProjects client API error, using static fallback:', e);
    return localProjects;
  }
}

export const fetchCertificates = async () => {
  try {
    const res = await fetch('/api/certificates');
    if (!res.ok) throw new Error('API failed');
    const data = await res.json();
    return data && data.length > 0 ? data : localCertificates;
  } catch (e) {
    console.error('fetchCertificates client API error, using static fallback:', e);
    return localCertificates;
  }
}

export const fetchTechStacks = async () => {
  try {
    const res = await fetch('/api/tech-stack');
    if (!res.ok) throw new Error('API failed');
    const data = await res.json();
    return data && data.length > 0 ? data : localTechStack;
  } catch (e) {
    console.error('fetchTechStacks client API error, using static fallback:', e);
    return localTechStack;
  }
}