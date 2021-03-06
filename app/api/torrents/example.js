//
//  Here is an example of the structure of a TorrentProvider
//

// Required:
// imdbId
// type    | The type of torrent: movies or shows

// Example:
//
// getTorrent(imdbId, type, {
//  searchQuery: 'harry potter and the half...',
//  ...otherCustomOptions
// })
//
// Return array of availabe torrents
// Preferrably, these should be ordered by best quality.
//
// [
//   {
//     quality: <string>, 1080p || 720p,
//     magnet: <string>
//     seeders: <number>
//     leechers: <number>
//     health: <string>, healthy || decent || poor
//     _provder: <string>
//   },
//   ...
// ]
