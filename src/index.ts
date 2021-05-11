import Drive from './classes/drive';
import { Darwin } from './platforms/darwin';
import { Linux } from './platforms/linux';
import { Windows } from './platforms/windows';
import { Utils } from './utils/utils';

/**
 * Get disk info according current platform.
 *
 * @author Cristiam Mercado
 * @return {Promise<Drive[]>} Promise resolves array of disks and their info.
 */
export function getDiskInfo(): Promise<Drive[]> {

    return new Promise((resolve, reject) => {

        try {

            const platform = Utils.detectPlatform();
            let drivesInfo: Drive[];

            switch (platform) {
                case 'aix': // IBM AIX platform
                    reject(new Error(`Platform not supported: ${platform}`));
                    break;
                case 'android': // Android platform
                    reject(new Error(`Platform not supported: ${platform}`));
                    break;
                case 'darwin': // Darwin platfrom(MacOS, IOS etc)
                    drivesInfo = Darwin.run();
                    resolve(drivesInfo);
                    break;
                case 'freebsd': // FreeBSD Platform
                    drivesInfo = Darwin.run();
                    resolve(drivesInfo);
                    break;
                case 'linux': // Linux Platform
                    drivesInfo = Linux.run();
                    resolve(drivesInfo);
                    break;
                case 'openbsd': // OpenBSD platform
                    drivesInfo = Darwin.run();
                    resolve(drivesInfo);
                    break;
                case 'sunos': // SunOS platform
                    reject(new Error(`Platform not supported: ${platform}`));
                    break;
                case 'win32': // windows platform
                    Windows.run().then(drivesInfo => resolve(drivesInfo));
                    break;
                default: // unknown platform
                    reject(new Error(`Platform not recognized: ${platform}`));
            }

        } catch (e) {
            reject(e);
        }

    })

}
