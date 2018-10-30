const express = require('express')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { formatError } = require('apollo-errors')
const bodyParser = require('body-parser')
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const schema = require('./schema')
const models = require('./libaries/model-loader')
const { getUserFromToken } = require('./libaries/token-manager')

const router = express.Router()

router.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(async (req, res) => {
    let user = null

    if (req.headers.authorization) {
      try {
        user = getUserFromToken(req.headers.authorization)
      } catch (err) {
        res.clearCookie(process.env.AUTH_TOKEN_NAME)
      }
    }

    return {
      formatError,
      schema,
      context: {
        models,
        user,
      },
      tracing: true,
      cacheControl: {
        defaultMaxAge: 5,
      },
    }
  })
)

router.get(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `wss://dev-api-wishopapp.tk:${
      process.env.APP_PORT
    }/subscriptions`,
  })
)

aws.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
})

var s3 = new aws.S3()

const bucket = process.env.S3_BUCKET

var upload = multer({
  storage: multerS3({
    s3,
    bucket,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function(req, file, cb) {
      cb(null, file.originalname)
    },
  }),
})

router.post('/upload', upload.single('photo'), function(req, res, next) {
  if (res.req.file) {
    const file = res.req.file
    res.json({
      message: 'Successfully uploaded',
      code: 200,
      result: {
        fileKey: file.key,
        fileSize: file.size,
        fileOriginalName: file.originalname,
        fileLocation: file.location,
      },
    })
  }
})

router.post('/upload/many', upload.array('photos', 3), function(
  req,
  res,
  next
) {
  if (req.files.length) {
    const files = req.files

    const uploadResult = files.map(file => ({
      fileKey: file.key,
      fileSize: file.size,
      fileOriginalName: file.originalname,
      fileLocation: file.location,
    }))

    res.json({
      message: 'Successfully uploaded',
      code: 200,
      result: uploadResult,
    })
  }
})

module.exports = router
