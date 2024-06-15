import 'dotenv/config'
import express from 'express'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
})

const port = 3000

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/tell', async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: 'Say "test"' }],
      model: 'gpt-3.5-turbo',
      max_tokens: 100,
      temperature: 0.5,
    })
    console.log('completion :', completion)
    res.send(completion.choices[0].message.content)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
