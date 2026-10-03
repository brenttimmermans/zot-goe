import type { ImageMetadata } from 'astro';
import portrait from '~/assets/site/portrait.png';
import contactStandIn from '~/assets/stand-in/08.jpg';
import spaCover from '~/content/projects/spa-24h/02.jpg';

export const PORTRAIT: ImageMetadata = portrait;
export const CONTACT_IMAGE: ImageMetadata = contactStandIn;
export const DEFAULT_OG_IMAGE: ImageMetadata = spaCover;
