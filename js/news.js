/**
 * microCMS News Integration
 * 
 * TODO: Replace these values with your actual microCMS credentials
 */
const MICROCMS_SERVICE_DOMAIN = 'productx'; // e.g. 'productx'
const MICROCMS_API_KEY = '3khSz3sTkwz0uGPfxAGznTdrSpIYfBSTwf4k'; // e.g. 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'

/**
 * Fetch news from microCMS
 * @param {number} limit - Number of items to fetch (default 100)
 * @returns {Promise<Array>}
 */
async function fetchNews(limit = 100) {
    if (MICROCMS_SERVICE_DOMAIN === 'YOUR_SERVICE_DOMAIN' || MICROCMS_API_KEY === 'YOUR_API_KEY') {
        console.warn('microCMS credentials are not set. Please update js/news.js');
        return [];
    }

    const apiUrl = `https://${MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/news?limit=${limit}`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'X-MICROCMS-API-KEY': MICROCMS_API_KEY,
            },
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        return data.contents;
    } catch (error) {
        console.error('Failed to fetch news:', error);
        return [];
    }
}

/**
 * Fetch a single news item by ID
 * @param {string} id
 * @returns {Promise<Object>}
 */
async function fetchNewsDetail(id) {
    if (MICROCMS_SERVICE_DOMAIN === 'YOUR_SERVICE_DOMAIN' || MICROCMS_API_KEY === 'YOUR_API_KEY') {
        return null;
    }

    try {
        const response = await fetch(`https://${MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/news/${id}`, {
            headers: {
                'X-MICROCMS-API-KEY': MICROCMS_API_KEY,
            },
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to fetch news detail:', error);
        return null;
    }
}

/**
 * Format date string (YYYY.MM.DD)
 * @param {string} dateString 
 * @returns {string}
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
}

/**
 * Create HTML for a news item
 * @param {Object} item 
 * @returns {string}
 */
function createNewsItem(item) {
    // Determine category - handle both array and string types
    let categoryName = 'News';
    if (item.category) {
        if (Array.isArray(item.category) && item.category.length > 0) {
            categoryName = item.category[0];
        } else if (typeof item.category === 'string') {
            categoryName = item.category;
        }
    }

    return `
        <li class="news__item">
            <a href="news_detail.html?id=${item.id}" class="news__link">
                <div class="news__meta">
                    <time class="news__date" datetime="${item.date}">${formatDate(item.date)}</time>
                    <span class="news__tag">${categoryName}</span>
                </div>
                <p class="news__title">${item.title}</p>
            </a>
        </li>
    `;
}

/**
 * Render news list
 * @param {string} containerId 
 * @param {number} limit 
 */
async function renderNews(containerId, limit) {
    const container = document.getElementById(containerId);

    if (!container) {
        return;
    }

    // Show loading state or keep existing "Loading..." text

    const newsData = await fetchNews(limit);

    if (newsData.length === 0) {
        container.innerHTML = '<p class="news__empty">ニュースはありません。</p>';

        // Hide "View All" button if on index page and no news
        const moreLink = document.querySelector('.news__more');
        if (moreLink && window.location.pathname.endsWith('index.html')) {
            moreLink.style.display = 'none';
        }
        return;
    }

    try {
        const newsHtml = newsData.map(createNewsItem).join('');

        // Wrap in ul.news__list
        container.innerHTML = `<ul class="news__list">${newsHtml}</ul>`;

        // Add is-visible class to news items for CSS animation
        setTimeout(() => {
            const newsItems = container.querySelectorAll('.news__item');
            newsItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('is-visible');
                }, index * 100); // Stagger the animation
            });
        }, 100);
    } catch (err) {
        console.error('Error rendering news:', err);
    }
}

/**
 * Render news detail
 * @param {string} containerId
 */
async function renderNewsDetail(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Get ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        window.location.href = 'news.html';
        return;
    }

    const item = await fetchNewsDetail(id);

    if (!item) {
        container.innerHTML = '<p style="text-align:center;">記事が見つかりませんでした。</p>';
        return;
    }

    const categoryName = item.category && item.category.length > 0 ? item.category[0] : 'News';

    const html = `
        <div class="news-detail__header">
            <span class="news-detail__date">${formatDate(item.date)}</span>
            <h1 class="news-detail__title">${item.title}</h1>
            <span class="news-detail__category">${categoryName}</span>
        </div>
        <div class="news-detail__content">
            ${item.content || item.body || '<p>本文がありません。</p>'}
        </div>
    `;

    container.innerHTML = html;
}

// Initialize based on page
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    if (path.endsWith('index.html') || path === '/' || path.endsWith('/')) {
        renderNews('news-container', 3);
    } else if (path.endsWith('news.html')) {
        renderNews('news-container', 20);
    } else if (path.endsWith('news_detail.html')) {
        renderNewsDetail('news-detail-container');
    }
});
