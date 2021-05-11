"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDiskInfo = void 0;
var darwin_1 = require("./platforms/darwin");
var linux_1 = require("./platforms/linux");
var windows_1 = require("./platforms/windows");
var utils_1 = require("./utils/utils");
/**
 * Get disk info according current platform.
 *
 * @author Cristiam Mercado
 * @return {Promise<Drive[]>} Promise resolves array of disks and their info.
 */
function getDiskInfo() {
    return new Promise(function (resolve, reject) {
        try {
            var platform = utils_1.Utils.detectPlatform();
            var drivesInfo = void 0;
            switch (platform) {
                case 'aix': // IBM AIX platform
                    reject(new Error("Platform not supported: " + platform));
                    break;
                case 'android': // Android platform
                    reject(new Error("Platform not supported: " + platform));
                    break;
                case 'darwin': // Darwin platfrom(MacOS, IOS etc)
                    drivesInfo = darwin_1.Darwin.run();
                    resolve(drivesInfo);
                    break;
                case 'freebsd': // FreeBSD Platform
                    drivesInfo = darwin_1.Darwin.run();
                    resolve(drivesInfo);
                    break;
                case 'linux': // Linux Platform
                    drivesInfo = linux_1.Linux.run();
                    resolve(drivesInfo);
                    break;
                case 'openbsd': // OpenBSD platform
                    drivesInfo = darwin_1.Darwin.run();
                    resolve(drivesInfo);
                    break;
                case 'sunos': // SunOS platform
                    reject(new Error("Platform not supported: " + platform));
                    break;
                case 'win32': // windows platform
                    windows_1.Windows.run().then(function (drivesInfo) { return resolve(drivesInfo); });
                    break;
                default: // unknown platform
                    reject(new Error("Platform not recognized: " + platform));
            }
        }
        catch (e) {
            reject(e);
        }
    });
}
exports.getDiskInfo = getDiskInfo;
