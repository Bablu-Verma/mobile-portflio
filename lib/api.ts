import type {
  AboutData,
  EducationResponse,
  Experience,
  FAQItem,
  GalleryImage,
  Project,
  Service,
  SkillGroup,
  Testimonial,
  WorkflowStep,
} from '@/types';
import { useQuery } from '@tanstack/react-query';

const API_BASE = `${process.env.EXPO_PUBLIC_SERVER_BASE_URL}/api`;

async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  return res.json();
}

export function useAbout() {
  return useQuery<AboutData>({
    queryKey: ['about'],
    queryFn: () => fetcher<AboutData>(`${API_BASE}/about`),
  });
}

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: () => fetcher<Project[]>(`${API_BASE}/projects`),
  });
}

export function useProjectBySlug(slug: string) {
  return useQuery<Project | undefined>({
    queryKey: ['project', slug],
    queryFn: async () => {
      const projects = await fetcher<Project[]>(`${API_BASE}/projects`);
      return projects.find((p) => p.slug === slug);
    },
    enabled: !!slug,
  });
}

export function useExperiences() {
  return useQuery<Experience[]>({
    queryKey: ['experiences'],
    queryFn: () => fetcher<Experience[]>(`${API_BASE}/experiences`),
  });
}

export function useEducation() {
  return useQuery<EducationResponse>({
    queryKey: ['education'],
    queryFn: () => fetcher<EducationResponse>(`${API_BASE}/education`),
  });
}

export function useServices() {
  return useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: () => fetcher<Service[]>(`${API_BASE}/services`),
  });
}

export function useTestimonials() {
  return useQuery<Testimonial[]>({
    queryKey: ['testimonials'],
    queryFn: () => fetcher<Testimonial[]>(`${API_BASE}/testimonials`),
  });
}

export function useFaqs() {
  return useQuery<FAQItem[]>({
    queryKey: ['faqs'],
    queryFn: () => fetcher<FAQItem[]>(`${API_BASE}/faqs`),
  });
}

export function useSkills() {
  return useQuery<SkillGroup[]>({
    queryKey: ['skills'],
    queryFn: () => fetcher<SkillGroup[]>(`${API_BASE}/skills`),
  });
}

export function useWorkflowSteps() {
  return useQuery<WorkflowStep[]>({
    queryKey: ['workflow'],
    queryFn: () => fetcher<WorkflowStep[]>(`${API_BASE}/workflow`),
  });
}

export function useGalleryImages() {
  return useQuery<GalleryImage[]>({
    queryKey: ['gallery'],
    queryFn: () => fetcher<GalleryImage[]>(`${API_BASE}/gallery`),
  });
}
