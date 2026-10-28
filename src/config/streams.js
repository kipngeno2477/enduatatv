// ===== ENDUATA TV & FM NAROK - Stream Configuration =====
// Update these URLs when real streaming endpoints are available.

export const STREAMS = {
  radio: {
    // Enduata FM 88.5 Narok live audio stream (Zeno.fm)
    url: 'https://stream.zeno.fm/f3wvbbqmdg8uv',
    name: 'Enduata FM 88.5',
    frequency: '88.5 FM',
    location: 'Narok, Kenya',
  },
  tv: {
    // YouTube Live embed ID for Enduata TV
    // Replace with an active YouTube Live stream ID when broadcasting
    youtubeVideoId: '7K_FN1Ym4gw',
    // HLS stream URL - set this when an HLS (m3u8) source is available
    // hlsUrl: 'https://your-hls-stream-url.m3u8',
    hlsUrl: null,
    name: 'Enduata TV Narok',
  },
  youtube: {
    channelUrl: 'https://www.youtube.com/@Enduata033',
    handle: '@Enduata033',
    subscribers: '7.76K',
    videosCount: '938',
  },
};

export const STATION = {
  name: 'ENDUATA TV & FM NAROK',
  tagline: 'NABOISHO OLOSHO LE MAA',
  mission:
    'Advocating for peace through mentorship programs, cultural preservation, and community development across Narok County and beyond.',
  location: 'Narok County, Kenya (County 033)',
  phone: '+254 795 502 587',
  email: 'enduatamedia@gmail.com',
  frequency: '88.5 FM / 033 Narok',
  socials: {
    youtube: 'https://www.youtube.com/@Enduata033',
    facebook: '#',
    twitter: '#',
    instagram: '#',
    tiktok: '#',
  },
};
