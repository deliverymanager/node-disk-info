import { Constants } from '../utils/constants';
import Drive from '../classes/drive';
import { Utils } from "../utils/utils";

/**
 * Class with Windows specific logic to get disk info.
 */
export class Windows {

    /**
     * Execute specific Windows command to get disk info.
     *
     * @return {Drive[]} List of drives and their info.
     */
    public static run(): Promise<Drive[]> {
        const drives: Drive[] = [];
        return new Promise((resolve) => {
            Utils.execute(Constants.WINDOWS_COMMAND).then((execution_string: any) => {

                if (!execution_string) {
                    return drives;
                }

                const lines = execution_string.split('\r\r\n');

                let newDiskIteration = false;

                let caption: string = '';
                let description: string = '';
                let freeSpace: number = 0;
                let size: number = 0;

                lines.forEach((value: string) => {

                    if (value !== '') {

                        const tokens = value.split('=');
                        const section = tokens[0];
                        const data = tokens[1];

                        switch (section) {
                            case 'Caption':
                                caption = data;
                                newDiskIteration = true;
                                break;
                            case 'Description':
                                description = data;
                                break;
                            case 'FreeSpace':
                                freeSpace = isNaN(parseFloat(data)) ? 0 : +data;
                                break;
                            case 'Size':
                                size = isNaN(parseFloat(data)) ? 0 : +data;
                                break;
                        }

                    } else {

                        if (newDiskIteration) {

                            const used: number = (size - freeSpace);

                            let percent = '0%';

                            if (size > 0) {
                                percent = Math.round((used / size) * 100) + '%';
                            }

                            const d = new Drive(
                                description,
                                size,
                                used,
                                freeSpace,
                                percent,
                                caption);

                            drives.push(d);

                            newDiskIteration = false;
                            caption = '';
                            description = '';
                            freeSpace = 0;
                            size = 0;
                        }

                    }

                });
                return resolve(drives);
            });
        });
    }
}
