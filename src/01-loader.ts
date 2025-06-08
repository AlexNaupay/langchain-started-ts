import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf'

async function loadPdf() {
    const filePath = 'src/files/public_key_cryptography.pdf'

    const pdfLoader = new PDFLoader(filePath)

    const docs = await pdfLoader.load()

    console.log('Docs Length: ', docs.length)
    console.log('Docs: ', docs)
    console.log('Docs Metadata: ', docs[0].metadata)
    console.log('--------------------------------------')
    console.log('Doc pageContent: ', docs[0].pageContent)
}

loadPdf()
