import { render } from 'test-utils.js'
import { expect, test } from 'vitest'
import server from 'server/server.js'
import request from 'supertest'

// test('renders a page with correct heading', async () => {
//   //ACT
//   const res = await request(server).get('/')
//   //ASSERT
//   expect(res.statusCode).toBe(200)
//   expect(res.text).toContain('List of Artworks')
//   expect(res.text).toMatch('Gallery')
// })

// test('render #each title', async () => {
//   //ACT
//   const res = await request(server).get('/')
//   //ASSERT
//   expect(res.statusCode).toBe(200)
//   expect(res.text).toMatch('Kea in Flight')
//   expect(res.text).toMatch('Kowhai Flowers')
//   expect(res.text).toMatch('Kotare')
//   expect(res.text).toMatch('Harakeke Flowers')
// })

// Test using JSDOM
test('renders a page with correct heading', async () => {
  const res = await request(server).get('/')
  const screen = render(res)

  const heading = screen.getByRole('heading', { level: 1 })
  expect(heading.textContent).toBe('Gallery')
})

test('renders correct title for #each artwork', async () => {
  const res = await request(server).get('/')
  const screen = render(res)

  const titleA = screen.getByText(/Kea in Flight/)
  const titleB = screen.getByText(/Kowhai Flowers/)

  expect(titleA.textContent).toMatch(/Kea in Flight/)
  expect(titleB.textContent).toMatch(/Kowhai Flowers/)
})

// /artworks/1 page
test('correct artwork artist', async () => {
  const res = await request(server).get('/artworks/1')
  const screen = render(res)

  const artist = screen.getByText(/Artist:/)
  expect(artist.textContent).toMatch(/Ben/)
})
// test comment
test('correct comment', async () => {
  const res = await request(server).get('/artworks/1')
  const screen = render(res)

  const comment = screen.getByText(/Comment:/)
  expect(comment.textContent).toMatch(/Very arty/)
})
// test image
test('correct image artworks/1', async () => {
  const res = await request(server).get('/artworks/1')
  const screen = render(res)

  const img = screen.getByAltText(/art/)
  expect(img.getAttribute('src')).toBe('/images/kea.jpg')
})
