import insane from 'insane';
import type { Community } from '$lib/types/api';

export function scrollToElement(id: string, offset = 0) {
  const el = document.getElementById(id);
  const top = findPos(el) - offset;

  window.scrollTo({
    left: 0,
    top: top,
    behavior: 'smooth',
  });
}

function findPos(obj: any) {
  let curtop = 0;
  if (obj.offsetParent) {
    do {
      curtop += obj.offsetTop;
    } while ((obj = obj.offsetParent));
    return curtop;
  }
  return curtop;
}

export const sanitizeHtml = (s: string) => insane(s, {}, true);

export function parseCommunityCoverImage(community: Community): string {
  switch (community.slug) {
    case 'jobs':
      return `/og/jobs.png`;
    case 'announcements':
      return `/og/announcements.png`;
    case 'learn':
      return `/og/guides.png`;
    case 'case-studies':
      return `/og/case-studies.png`;
    case 'companies':
      return `/og/portfolio.png`;
    default:
      return `/og/index.png`;
  }
}

export const trimJoinArray = (target: string[]): string => {
  return target.join(' ').replace(/\s([.,])/g, '$1');
};

export const formatUrlToTitle = (url: string): string => {
  try {
    const domain = new URL(url).hostname
      .replace('www.', '')
      .split('.')[0]
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    return domain;
  } catch {
    return url;
  }
};
