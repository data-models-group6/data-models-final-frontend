const https = require('https');

const endpoints = [
    '/api/ranking/regional',
    '/api/ranking/regional/ranking/regional',
    '/ranking/regional',
    '/api/heartbeat-auto'
];

const postData = JSON.stringify({
    lat: 25.0330,
    lng: 121.5654
});

endpoints.forEach(path => {
    const options = {
        hostname: 'data-models-final-backend.onrender.com',
        port: 443,
        path: path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': postData.length
        }
    };

    const req = https.request(options, (res) => {
        console.log(`${path}: ${res.statusCode}`);
        res.on('data', () => { }); // Consume data
    });

    req.on('error', (e) => {
        console.error(`${path}: Error ${e.message}`);
    });

    req.write(postData);
    req.end();
});
