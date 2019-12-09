const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');

const router = express.Router();

const PORT = process.env.PORT || 5000;

const app = express();

app
  .use(express.static(path.join(__dirname, 'public')))
  .use(cors())
  .use(express.json())
  .use('/', router)
  .get('/', (req, res) => res.sendStatus(200))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

router.options('/pdf', (req, res) => res.sendStatus(100));

router.post('/pdf', function(req, res, next) {
  const { image, data } = req.body;

  const doc = new PDFDocument();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=protetics.pdf');
  // res.writeHead(200);

  // image
  doc
    .image(image, 20, 100, { fit: [560, 300] })
    .rect(20, 100, 560, 300)
    .stroke()
    .text('Fit', 320, 0);

  doc.text('Hello world!');
  doc.pipe(res);

  // res.setHeader('Content-Length', stat.size);

  // res.send(doc);
  doc.end();
});
