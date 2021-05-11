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
     * Get chcp value (only for Win32 platform).
     *
     * @return {string} Platform: win32.
     */
    public static chcp(): any {
        return new Promise((resolve) => {
            exec('chcp', { windowsHide: true }, (error, stdout, stderr) => {
                if (error) {
                    console.log('execSync', error);
                    return resolve(null);
                }
                if (stderr) {
                    console.log('stderr', stderr);
                    return resolve(null);
                }
                return resolve(stdout.toString().split(':')[1].trim());
            });
        });
    }

    /**
     * Executes a command in SO console.
     *
     * @param {Buffer} command: Command to execute.
     */
    public static execute(command: string): any {
        return new Promise((resolve) => {
            exec(command, { windowsHide: true, encoding: 'buffer' }, (error, stdout, stderr) => {
                if (error) {
                    console.log('execSync', error);
                    return resolve(Buffer.from('\r\r\n', 'utf8'));
                }
                if (stderr) {
                    console.log('stderr', stderr);
                    return resolve(Buffer.from('\r\r\n', 'utf8'));
                }
                return resolve(stdout);
            });
        });
    }
}
