import * as os from 'os';
import { exec } from 'child_process';

/**
 * Class with utilitary methods.
 */
export class Utils {

    /**
     * Detects current platform.
     *
     * @return {string} Platform: win32, linux, darwin.
     */
    public static detectPlatform(): string {
        return os.platform().toLowerCase();
    }

    /**
     * Executes a command in SO console.
     *
     * @param {Buffer} command: Command to execute.
     */

    public static execute(command: string): Promise <any> {
        return new Promise((resolve) => {
            exec(command, { windowsHide: true }, (error, stdout, stderr) => {
                if (error) {
                    console.log('execSync', error);
                    return resolve('\r\r\n');
                }
                if (stderr) {
                    console.log('stderr', stderr);
                    return resolve('\r\r\n');
                }
                return resolve(stdout);
            });
        });
    }
}
