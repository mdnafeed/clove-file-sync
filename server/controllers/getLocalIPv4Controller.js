const os = require('os');

exports.getLocalIPv4 = () => {
    const networkInterfaces = os.networkInterfaces();
    console.log('Network Interfaces:', networkInterfaces);  // Log the network interfaces for debugging
    
    let localIP = null;

    // Iterate over all network interfaces and their addresses
    for (const interfaceName in networkInterfaces) {
        const interfaces = networkInterfaces[interfaceName];

        // Iterate over all network addresses for each interface
        for (const net of interfaces) {
            if (net.family === 'IPv4' && !net.internal) {
                console.log(`Found IPv4 address: ${net.address} on interface ${interfaceName}`);
                localIP = net.address;
                break;  // Exit once a valid external IPv4 is found
            }
        }

        if (localIP) {
            break;  // Stop searching once a valid IP is found
        }
    }

    if (!localIP) {
        console.log('No external IPv4 address found.');
    }

    return localIP;
};
