export enum prefix {
    INFO  = "INFO:",
    WARN  = "WARN:",
    ERROR = "ERROR:",
    DEBUG = "DEBUG:"
}

export async function out(type: prefix, info: any): Promise<void> {
    var newLine = "";
    if (String(info).startsWith('\n')) {
        newLine = "\n";
        info = info.substring(1);
    }

    const formatted = `${newLine}${formatPrefix(type)} ${info}`;
    console.log(formatted);
}



/* ======== PRIVATE FUNCTIONS ======== */

function formatPrefix(type: prefix): string {
    var colouredPrefix = `${type}${colour.RESET}`;
    switch (type) {
        case prefix.DEBUG:
            colouredPrefix = `${colour.WHITE}` + colouredPrefix;
            break;
        case prefix.INFO:
            colouredPrefix = `${colour.CYAN}` + colouredPrefix;
            break;
        case prefix.WARN:
            colouredPrefix = `${colour.YELLOW}` + colouredPrefix;
            break;
        case prefix.ERROR:
            colouredPrefix = `${colour.RED}` + colouredPrefix;
            break;
        default:
            break;
    }
    return `${colour.RESET}${getTimestamp()} ${colouredPrefix}`;
}

function getTimestamp() {
    const now = new Date(Date.now());
    const time = now.toLocaleTimeString('en-GB');
    const date = now.toLocaleDateString('en-GB', { dateStyle: 'medium' });
    const ms = String(now.getMilliseconds()).padStart(3, '0');
    return `[${date} - ${time}:${ms}]`;
}

enum colour {
    RESET   = "\x1b[0m",
    RED     = "\x1B[31m",
    YELLOW  = "\x1b[33m",
    CYAN    = "\x1b[36m",
    WHITE   = "\x1b[37m"
}