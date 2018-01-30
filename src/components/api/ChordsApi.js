class ChordsApi {
  static getChords(id) {
    const proxyUrl = 'https://young-fjord-16053.herokuapp.com/' // cors-anywhere instance (https://github.com/Rob--W/cors-anywhere)
    const targetUrl = 'https://play.riffstation.com/api/mir/chords'
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

export default ChordsApi