const Albums = require('../../src/models/albums')
require('@code-fellows/supergoose')

const albums = new Albums()

describe('Albums model', () => {
  test('create a new album entry & get return that album', () => {
    const testAlbum = { title: 'Lemonade' }
    return albums.create(testAlbum)
      .then(results => {
        expect(results.title).toBe('Lemonade')
        return results._id
      })
      .then(results => {
        return albums.read(results)
          .then(results => expect(results[0].title).toBe('Lemonade'))
      })
  })

  test('read back all entries', () => {
    return albums.read()
      .then(results => {
        expect(results.length).toBe(1)
      })
  })

  test('able to update an album', () => {
    const testAlbum = { title: 'Lemonade' }
    return albums.create(testAlbum)
      .then(results => { return results._id })
      .then(results => {
        return albums.update(results._id, { title: 'Revolution' })
          .then(results => expect(results.title).toBe('Revolution'))
      })
  })

  test('able to delete an album', () => {
    const deleteThisAlbum = { title: 'My Own Prison' }
    return albums.create(deleteThisAlbum)
      .then(results => { return results._id })
      .then(results => {
        return albums.delete(results._id)
          .then(results => {
            expect(results.title).toBe('My Own Prison')
          })
      })
  })
})
