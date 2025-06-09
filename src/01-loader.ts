import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf'

export async function loadPdf(pdfPath?: string) {
    const filePath = pdfPath || 'src/files/public_key_cryptography.pdf'

    const pdfLoader = new PDFLoader(filePath)

    return await pdfLoader.load()
}

/*loadPdf().then(docs => {
    console.log('Docs Length: ', docs.length)
    console.log('Docs: ', docs)
    console.log('Docs Metadata: ', docs[0].metadata)
    console.log('--------------------------------------')
    console.log('Doc pageContent: ', docs[0].pageContent)
});*/
