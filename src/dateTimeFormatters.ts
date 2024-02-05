export class TimeFormatter {
    dateString: string;

    // takes in an optional date represented as a string to make testing easier
    constructor(dateString: string = new Date().toLocaleTimeString()) {
        this.dateString = dateString;
    }

    failureDefault(): string {
        console.error("regex failed to match");
        return this.dateString;
    }

    get12Hour_hh_mm(): string {
        const hh_mm: RegExpMatchArray | null =
            this.dateString.match(/^\d{1,2}:\d{2}/g);
        if (hh_mm) {
            return hh_mm[0];
        }
        return this.failureDefault();
    }

    get12Hour_hh_mm_ss(): string {
        const hh_mm_ss: RegExpMatchArray | null =
            this.dateString.match(/^\d{1,2}:\d{2}:\d{2}/g);
        if (hh_mm_ss) {
            return hh_mm_ss[0];
        }
        return this.failureDefault();
    }

    get12Hour_hh_mm_tt(): string {
        const tt: RegExpMatchArray | null = this.dateString.match(/\w{2}$/g);
        if (tt) {
            const hh_mm: string = this.get12Hour_hh_mm();
            if (hh_mm.length <= 5) {
                return `${hh_mm} ${tt}`;
            }
        }
        return this.failureDefault();
    }

    get12Hour_hh_mm_ss_tt(): string {
        return this.dateString;
    }

    get24Hour_hh_mm(): string {
        const hh_mm_12hr: string = this.get12Hour_hh_mm();
        if (this.dateString.match(/[PMpm]{2}$/g)) {
            let hh: string = "";
            for (let i = 0; i < 2; i++) {
                if (hh_mm_12hr[i] !== ":") {
                    hh += hh_mm_12hr[i];
                }
            }
            let hhNums: number = Number(hh);
            if (hhNums < 12) {
                hhNums += 12;
            }
            const split = hh_mm_12hr.split(":");
            split[0] = hhNums.toString();
            return split.join(":");
        } else {
            return hh_mm_12hr;
        }
    }

    get24Hour_hh_mm_ss(): string {
        const hh_mm_24hr: string = this.get24Hour_hh_mm();
        const ss: RegExpMatchArray | null = this.dateString.match(
            /^\d{1,2}:\d{2}:(\d{2})/,
        );
        if (ss) {
            if (ss[1]) {
                return `${hh_mm_24hr}:${ss[1]}`;
            }
        }
        return this.failureDefault();
    }
}

export class DateFormatter {
    date: Date;

    constructor() {
        this.date = new Date();
    }

    // February 5, 2024
    getFullMonthFullYear(): string {
        return "";
    }

    // Feb 5, 2024
    getShortMonthFullYear(): string {
        return "";
    }

    // February 5
    getFullMonthNoYear(): string {
        return "";
    }

    // Feb 5
    getShortMonthNoYear(): string {
        return "";
    }

    // 2-5-2024
    getNumericalHyphens(): string {
        return "";
    }

    // 2/5/2024
    getNumericalForwardSlashes(): string {
        return "";
    }

    // 2|5|24
    getNumbericalVerticalBars(): string {
        return "";
    }
}
