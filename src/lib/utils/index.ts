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

export function parseCommunityCoverImage(community: Community, v2: boolean = false): string {
  let url = `/og/index.png`;

  switch (community.slug) {
    case 'jobs':
      url = `/og/jobs.png`;
      if (v2) url = `/og/v2/jobs.png`;
      return url;
    case 'announcements':
      return `/og/announcements.png`;
    case 'learn':
      return `/og/guides.png`;
    case 'case-studies':
      return `/og/case-studies.png`;
    case 'companies':
      url = `/og/portfolio.png`;
      if (v2) url = `/og/v2/portfolio.png`;
      return url;
    default:
      if (v2) url = `/og/v2/index.png`;
      return url;
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
