const http = require('http')
const port = 3000;


const server = http.createServer((req,res=>{
    const options = {
        hostname: '2.2.2.2',
        port: 3500,
        path: '/api/users',
        method: req.method,
        headers: req.headers,
    }
    makeRequest(req,res,options)
}))

const makeRequest = (options,clientRequest,clientResponse)=>{
    const proxy = http.request(options, res=>{
        clientResponse.writeHead( res.statusCode, res.headers);
        res.pipe(clientResponse,{end: true})
    } )
    clientRequest.pipe(proxy, { end: true });

}

server.listen(port,()=>{
    console.log(`proxy server is running`)
})