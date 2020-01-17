import 'dotenv/config'

import express from 'express'
import Youch from 'youch'
import cors from 'cors'
import http from 'http'
import io from 'socket.io'

import 'express-async-errors'

import routes from './routes'
import appConfig from './config/app'

import './database'

class App {
  constructor() {
    this.express = express()
    this.server = http.Server(this.express)
    this.isDev = appConfig.isDev

    this.socket()
    this.middlewares()
    this.routes()
    this.exceptionHandler()
  }

  socket() {
    this.io = io(this.server)

    this.io.on('connection', socket => {
      const { student_id } = socket.handshake.query
      this.conectedStudents[student_id] = socket.id

      socket.on('disconect', () => {
        delete this.conectedStudents[student_id]
      })
    })
  }

  middlewares() {
    this.express.use(cors())
    this.express.use(express.json())

    this.express.use((req, res, next) => {
      req.io = this.io
      req.conectedStudents = this.conectedStudents

      next()
    })
  }

  routes() {
    this.express.use(routes)
  }

  exceptionHandler() {
    this.express.use(async (err, req, res, next) => {
      if (this.isDev) {
        const errors = await new Youch(err, req).toJSON()

        return res.status(500).json(errors)
      }

      return res.status(500).json({ error: 'Internal server error' })
    })
  }
}

export default new App().server
