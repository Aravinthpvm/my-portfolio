export interface Project {
  id: string;
  title: string;
  description: string;
  live_url: string;
  github_url?: string;
  technologies: string[];
  key_features: string[];
  image_url: string;
}

export interface Certificate {
  id: number;
  title: string;
  image_url: string;
}

export interface TechStack {
  id: number;
  name: string;
  logo_url: string;
}

export const localProjects: Project[] = [
  {
    id: "alumni-portal",
    title: "Alumni Portal – College Networking Platform",
    description: "A multi-role platform (Student, Alumni, Admin) designed to streamline networking and mentorship. It features real-time messaging, events management, an active forum, a job portal, and a searchable alumni directory with dynamic filters.",
    live_url: "https://ouralumini.netlify.app/",
    github_url: "https://github.com/Aravinthpvm/Alumini-Connect",
    technologies: ["Java", "Spring Boot", "React.js", "MongoDB", "JWT"],
    key_features: [
      "Architected multi-role platform (Student, Alumni, Admin) using OOP and role-based access control",
      "Designed 45+ RESTful endpoints across 11 MongoDB collections",
      "Built alumni directory with dynamic search and filters for company, domain, and graduation year",
      "Implemented a mentorship request-approval workflow and real-time-ready messaging"
    ],
    image_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "nearfix",
    title: "NearFix – Local Service Finder Application",
    description: "A scalable, microservices-style local service finder platform facilitating communication and scheduling between customers and service providers. Deployed with CI/CD on Microsoft Azure.",
    live_url: "https://nearfix.me",
    github_url: "https://github.com/Aravinthpvm/NearFix",
    technologies: ["Java", "Spring Boot", "MongoDB", "Azure", "GitHub Actions"],
    key_features: [
      "Architected scalable backend with role-based auth and service request workflows across 4+ roles",
      "Designed 6+ RESTful endpoints with proper DTO structures, optimizing payload size",
      "Implemented MongoDB indexing to improve query retrieval efficiency by ~25% on 1,000+ records",
      "Deployed Spring Boot on Microsoft Azure with CI/CD via GitHub Actions"
    ],
    image_url: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "hostel-management",
    title: "Hostel Management System",
    description: "A secure, robust management system handling room bookings, complaints tracking, and visitor logging. Features stateless session management and a modern, responsive user interface.",
    live_url: "",
    github_url: "https://github.com/Aravinthpvm/Hostel-Management-System",
    technologies: ["Java", "Spring Boot", "React.js", "MySQL", "JWT", "Tailwind CSS"],
    key_features: [
      "Built a 4-role system (Owner, Warden, Student, Guard) with JWT auth and protected routes",
      "Developed room booking, complaint tracking, and visitor management with full CRUD",
      "Implemented BCrypt hashing, stateless session management, and CORS",
      "Designed responsive React frontend with Tailwind CSS and Axios interceptors"
    ],
    image_url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&auto=format&fit=crop&q=60"
  }
];

export const localCertificates: Certificate[] = [
  {
    id: 1,
    title: "Oracle Java Foundations Completion Badge – Oracle",
    image_url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    title: "IBM SkillsBuild Python Programming Completion – IBM",
    image_url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    title: "Oracle Cloud Infrastructure 2023 AI Certified Foundations Associate – Oracle",
    image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60"
  }
];

export const localTechStack: TechStack[] = [
  {
    id: 1,
    name: "Java",
    logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
  },
  {
    id: 2,
    name: "Spring Boot",
    logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg"
  },
  {
    id: 3,
    name: "React.js",
    logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
  },
  {
    id: 4,
    name: "MongoDB",
    logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
  },
  {
    id: 5,
    name: "MySQL",
    logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
  },
  {
    id: 6,
    name: "Python",
    logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
  },
  {
    id: 7,
    name: "Azure",
    logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg"
  },
  {
    id: 8,
    name: "Docker",
    logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
  }
];
