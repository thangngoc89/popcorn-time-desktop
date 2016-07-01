import kat from 'kat-api';
import {
  determineQuality, getHealth, formatSeasonEpisodeToString
} from './BaseTorrentProvider';


export default class KatTorrentProvider {

  static fetch(imdbId, type, query) {
    return kat.search({
      query
    })
    .then(data => {
      console.log({ 'kat res': data.results });
      return data.results;
    })
    .then(
      results => results.splice(0, 100).map(this.formatTorrent)
    )
    .catch(error => {
      console.log(error);
      return [];
    });
  }

  static formatTorrent(torrent) {
    return {
      quality: determineQuality(torrent.magnet),
      magnet: torrent.magnet,
      seeders: torrent.seeds,
      leechers: torrent.leechs,
      ...getHealth(torrent.seeds, torrent.peers, torrent.leechs),
      _provider: 'kat'
    };
  }

  static provide(imdbId, type, extendedDetails = {}) {
    const { searchQuery } = extendedDetails;

    switch (type) {
      // case 'movies':
      //   return this.fetch(imdbId, type, searchQuery)
      //     .catch(error => {
      //       console.log(error);
      //       return [];
      //     });
      case 'shows': {
        const { season, episode } = extendedDetails;

        return this.fetch(
          imdbId,
          type,
          `${searchQuery} ${formatSeasonEpisodeToString(season, episode)}`
        )
          .catch(error => {
            console.log(error);
            return [];
          });
      }
      default:
        return [];
    }
  }
}
