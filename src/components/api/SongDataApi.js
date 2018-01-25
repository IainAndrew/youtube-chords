class SongDataApi {
  static getSongData(id) {
    const proxyUrl = 'https://young-fjord-16053.herokuapp.com/'; // cors-anywhere instance
    const targetUrl = `https://play.riffstation.com/api/mir/songs?source=youtube&source_id=${id}`;
    const request = new Request(proxyUrl + targetUrl, {
      method: 'GET',
    })
    return fetch(request).then((response) => {
      return response.json()
    }).catch((err) => {
      throw (err)
    })
  }
}

export default SongDataApi