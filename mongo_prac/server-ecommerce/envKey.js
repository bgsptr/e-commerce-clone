import * as fs from "fs";

const env = {
    privateKey: fs.readFileSync('./private.key', 'utf-8'),
    publicKey: fs.readFileSync('./public.key', 'utf-8')
};

const {privateKey, publicKey} = env;

export {privateKey, publicKey};