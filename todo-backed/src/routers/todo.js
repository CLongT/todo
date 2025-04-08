const express = require('express')
const db = require('../config/db.js')

const router = express.Router()

// 获取所有待办事项
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM todos')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 创建待办事项
router.post('/', async (req, res) => {
  const { id, name, done } = req.body
  try {
    await db.query('INSERT INTO todos (id, name, done) VALUES (?, ?, ?)', [id, name, done])
    res.status(201).json({ id, name, done })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 更新待办事项状态
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { done } = req.body

  try {
    await db.query('UPDATE todos SET done = ? WHERE id = ?', [done, id])
    res.json({ message: 'Todo updated' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 删除单个待办事项
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    await db.query('DELETE FROM todos WHERE id = ?', [id])
    res.json({ message: 'Todo deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 删除所有已完成事项
router.delete('/', async (req, res) => {
  try {
    await db.query('DELETE FROM todos WHERE done = true')
    res.json({ message: 'Completed todos deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
module.exports = router
