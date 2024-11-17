import { NextResponse } from 'next/server';

// Use the API key from the environment variable
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

const FALLBACK_IMAGE = {
  url: 'https://images.pexels.com/photos/1178337/pexels-photo-1178337.jpeg',
  photographer: 'Pexels',
  photographerUrl: 'https://www.pexels.com'
};

export async function GET() {
  try {
    if (!PEXELS_API_KEY) {
      console.error('Pexels API key is missing');
      return NextResponse.json(FALLBACK_IMAGE);
    }

    const keywords = [
      'family memories',
      'nostalgic moments',
      'family gathering',
      'sunset family',
      'family love',
      'memory book',
      'family photo album',
      'family celebration',
      'family heritage',
      'family tradition'
    ];

    const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];

    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(randomKeyword)}&per_page=15&orientation=landscape`,
      {
        headers: {
          'Authorization': PEXELS_API_KEY,
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    if (!response.ok) {
      console.error('Pexels API error:', response.status, response.statusText);
      return NextResponse.json(FALLBACK_IMAGE);
    }

    const data = await response.json();
    
    if (!data.photos || data.photos.length === 0) {
      console.error('No photos found');
      return NextResponse.json(FALLBACK_IMAGE);
    }

    const randomPhoto = data.photos[Math.floor(Math.random() * data.photos.length)];
    
    return NextResponse.json({
      url: randomPhoto.src.landscape,
      photographer: randomPhoto.photographer,
      photographerUrl: randomPhoto.photographer_url
    });

  } catch (error) {
    console.error('Error in background API:', error);
    return NextResponse.json(FALLBACK_IMAGE);
  }
}
