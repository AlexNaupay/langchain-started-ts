// https://js.langchain.com/docs/how_to/code_splitter
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const separatorsForLanguage = RecursiveCharacterTextSplitter.getSeparatorsForLanguage("js");

console.info(separatorsForLanguage);

const PHP_CODE = `<?php
namespace foo;
class Hello {
    public function __construct() { }
}
function hello() {
    echo "Hello World!";
}
interface Human {
    public function breath();
}
trait Foo { }
enum Color
{
    case Red;
    case Blue;
}`;

const phpSplitter = RecursiveCharacterTextSplitter.fromLanguage("php", {
    chunkSize: 50,
    chunkOverlap: 0,
});

phpSplitter.createDocuments([PHP_CODE]).then(console.info)
