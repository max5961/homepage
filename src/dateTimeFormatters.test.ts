import { TimeFormatter } from "./dateTimeFormatters";

describe("TimeFormatter", () => {
    const am: string = "5:30:05 AM";
    const pm: string = "5:30:05 PM";
    const doubleDigitAm = "10:30:05 AM";
    const doubleDigitPm = "10:30:05 PM";

    describe("get12Hour_hh_mm()", () => {
        test(am, () => {
            const timeFormatter: TimeFormatter = new TimeFormatter(am);
            const formattedTime = timeFormatter.get12Hour_hh_mm();
            expect(formattedTime).toBe("5:30");
        });
        test(pm, () => {
            const timeFormatter: TimeFormatter = new TimeFormatter(pm);
            const formattedTime = timeFormatter.get12Hour_hh_mm();
            expect(formattedTime).toBe("5:30");
        });
        test(doubleDigitAm, () => {
            const timeFormatter: TimeFormatter = new TimeFormatter(
                doubleDigitAm,
            );
            const formattedTime = timeFormatter.get12Hour_hh_mm();
            expect(formattedTime).toBe("10:30");
        });
        test(doubleDigitPm, () => {
            const timeFormatter: TimeFormatter = new TimeFormatter(
                doubleDigitPm,
            );
            const formattedTime = timeFormatter.get12Hour_hh_mm();
            expect(formattedTime).toBe("10:30");
        });
    });
    describe("get12Hour_hh_mm_ss()", () => {
        test(am, () => {
            const timeFormatter: TimeFormatter = new TimeFormatter(am);
            const formattedTime = timeFormatter.get12Hour_hh_mm_ss();
            expect(formattedTime).toBe("5:30:05");
        });
        test(pm, () => {
            const timeFormatter: TimeFormatter = new TimeFormatter(pm);
            const formattedTime = timeFormatter.get12Hour_hh_mm_ss();
            expect(formattedTime).toBe("5:30:05");
        });
        test(doubleDigitAm, () => {
            const timeFormatter: TimeFormatter = new TimeFormatter(
                doubleDigitAm,
            );
            const formattedTime = timeFormatter.get12Hour_hh_mm_ss();
            expect(formattedTime).toBe("10:30:05");
        });
        test(doubleDigitPm, () => {
            const timeFormatter: TimeFormatter = new TimeFormatter(
                doubleDigitPm,
            );
            const formattedTime = timeFormatter.get12Hour_hh_mm_ss();
            expect(formattedTime).toBe("10:30:05");
        });
    });
    describe("get12Hour_hh_mm_tt", () => {
        test(am, () => {
            const timeFormatter: TimeFormatter = new TimeFormatter(am);
            const formattedTime = timeFormatter.get12Hour_hh_mm_tt();
            expect(formattedTime).toBe("5:30 AM");
        });
        test(pm, () => {
            const timeFormatter: TimeFormatter = new TimeFormatter(pm);
            const formattedTime = timeFormatter.get12Hour_hh_mm_tt();
            expect(formattedTime).toBe("5:30 PM");
        });
        test(doubleDigitAm, () => {
            const timeFormatter: TimeFormatter = new TimeFormatter(
                doubleDigitAm,
            );
            const formattedTime = timeFormatter.get12Hour_hh_mm_tt();
            expect(formattedTime).toBe("10:30 AM");
        });
        test(doubleDigitPm, () => {
            const timeFormatter: TimeFormatter = new TimeFormatter(
                doubleDigitPm,
            );
            const formattedTime = timeFormatter.get12Hour_hh_mm_tt();
            expect(formattedTime).toBe("10:30 PM");
        });
    });
    describe("get12Hour_hh_mm_ss_tt", () => {
        test(am, () => {
            const timeFormatter: TimeFormatter = new TimeFormatter(am);
            const formattedTime = timeFormatter.get12Hour_hh_mm_ss_tt();
            expect(formattedTime).toBe("5:30:05 AM");
        });
        test(pm, () => {
            const timeFormatter: TimeFormatter = new TimeFormatter(pm);
            const formattedTime = timeFormatter.get12Hour_hh_mm_ss_tt();
            expect(formattedTime).toBe("5:30:05 PM");
        });
        test(doubleDigitAm, () => {
            const timeFormatter: TimeFormatter = new TimeFormatter(
                doubleDigitAm,
            );
            const formattedTime = timeFormatter.get12Hour_hh_mm_ss_tt();
            expect(formattedTime).toBe("10:30:05 AM");
        });
        test(doubleDigitPm, () => {
            const timeFormatter: TimeFormatter = new TimeFormatter(
                doubleDigitPm,
            );
            const formattedTime = timeFormatter.get12Hour_hh_mm_ss_tt();
            expect(formattedTime).toBe("10:30:05 PM");
        });
    });
    describe("get24Hour_hh_mm())", () => {
        test(am, () => {
            const timeFormatter: TimeFormatter = new TimeFormatter(am);
            const formattedTime = timeFormatter.get24Hour_hh_mm();
            expect(formattedTime).toBe("5:30");
        });
        test(pm, () => {
            const timeFormatter: TimeFormatter = new TimeFormatter(pm);
            const formattedTime = timeFormatter.get24Hour_hh_mm();
            expect(formattedTime).toBe("17:30");
        });
        test(doubleDigitAm, () => {
            const timeFormatter: TimeFormatter = new TimeFormatter(
                doubleDigitAm,
            );
            const formattedTime = timeFormatter.get24Hour_hh_mm();
            expect(formattedTime).toBe("10:30");
        });
        test(doubleDigitPm, () => {
            const timeFormatter: TimeFormatter = new TimeFormatter(
                doubleDigitPm,
            );
            const formattedTime = timeFormatter.get24Hour_hh_mm();
            expect(formattedTime).toBe("22:30");
        });
    });
    describe("get24Hour_hh_mm_ss())", () => {
        test(am, () => {
            const timeFormatter: TimeFormatter = new TimeFormatter(am);
            const formattedTime = timeFormatter.get24Hour_hh_mm_ss();
            expect(formattedTime).toBe("5:30:05");
        });
        test(pm, () => {
            const timeFormatter: TimeFormatter = new TimeFormatter(pm);
            const formattedTime = timeFormatter.get24Hour_hh_mm_ss();
            expect(formattedTime).toBe("17:30:05");
        });
        test(doubleDigitAm, () => {
            const timeFormatter: TimeFormatter = new TimeFormatter(
                doubleDigitAm,
            );
            const formattedTime = timeFormatter.get24Hour_hh_mm_ss();
            expect(formattedTime).toBe("10:30:05");
        });
        test(doubleDigitPm, () => {
            const timeFormatter: TimeFormatter = new TimeFormatter(
                doubleDigitPm,
            );
            const formattedTime = timeFormatter.get24Hour_hh_mm_ss();
            expect(formattedTime).toBe("22:30:05");
        });
    });
});
