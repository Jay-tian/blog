import APlayer from 'aplayer';

new APlayer({
  container: document.getElementById('music'),
  mini: false,
  autoplay: false,
  theme: '#FADFA3',
  loop: 'all',
  order: 'random',
  preload: 'auto',
  volume: 0.7,
  mutex: true,
  listFolded: false,
  listMaxHeight: 90,
  lrcType: 3,
  audio: [{
    name: 'name1',
    artist: 'artist1',
    url: '/data/music/201849194/1203948124124114.m4a',
    cover: '/data/music/201849194/1203948124124114.jpg',
    lrc: '/data/music/201849194/1203948124124114.lrc',
    theme: '#ebd0c2'
  }]
});