import defaultSettings from '@/settings';

const title = defaultSettings.title || 'Smart Plus';

export default function getPageTitle(pageTitle) {
    if (pageTitle) {
        return `${pageTitle} - ${title}`;
    }
    return `${title}`;
}