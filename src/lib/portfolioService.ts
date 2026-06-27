import { localProjects, localCertificates, localTechStack } from './portfolioData'

export const fetchProjects = async () => {
  return localProjects
}

export const fetchCertificates = async () => {
  return localCertificates
}

export const fetchTechStacks = async () => {
  return localTechStack
}