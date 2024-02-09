import React from "react";
import {
    useState,
    useEffect,
    useReducer,
    useContext,
    createContext,
} from "react";
import { format } from "date-fns";
import formatClockIcon from "../images/icons/format-clock.svg";
import checkmarkIcon from "../images/icons/check.svg";

class FormatClock {
    date: Date;
    options: string[];

    constructor(date: Date) {
        this.date = date;
        this.options = [
            "EEEE, MMMM do yyyy",
            "EEEE, MMMM d yyyy",
            "MMMM do yyyy",
            "MMMM d yyyy",
            "EE, MMM d yyyy",
            "MMM d yyyy",
            "MM / dd / yyyy",
            "MM | dd | yyyy",
        ];
    }

    getHour1_12(): string {
        return format(this.date, "h");
    }

    getHour0_23(): string {
        return format(this.date, "HH");
    }

    getMinutes(): string {
        return format(this.date, "mm");
    }

    getSeconds(): string {
        return format(this.date, "ss");
    }

    getAMPM(): string {
        return format(this.date, "aa");
    }

    getDate(optionsIndex: number): string {
        if (!this.options[optionsIndex]) {
            throw new Error("Invalid options index");
        }

        return format(this.date, this.options[optionsIndex]);
    }
}
interface ClockState {
    date: Date;
    showAMPM: boolean;
    show24Hour: boolean;
    showSeconds: boolean;
    dateFormatIndex: number;
}
function clockReducer(state: ClockState, action: { type: string }): ClockState {
    const copy: ClockState = {
        date: state.date,
        showAMPM: state.showAMPM,
        show24Hour: state.show24Hour,
        showSeconds: state.showSeconds,
        dateFormatIndex: state.dateFormatIndex,
    };
    switch (action.type) {
        case "update date":
            copy.date = new Date();
            break;
        case "toggle AM/PM":
            copy.showAMPM = !copy.showAMPM;
            break;
        case "off AM/PM":
            copy.showAMPM = false;
            break;
        case "toggle 24 hour":
            copy.show24Hour = !copy.show24Hour;
            break;
        case "off 24 hour":
            copy.show24Hour = false;
            break;
        case "toggle seconds":
            copy.showSeconds = !copy.showSeconds;
            break;
        case "off seconds":
            copy.showSeconds = false;
            break;
        case "date 0":
            copy.dateFormatIndex = 0;
            break;
        case "date 1":
            copy.dateFormatIndex = 1;
            break;
        case "date 2":
            copy.dateFormatIndex = 2;
            break;
        case "date 3":
            copy.dateFormatIndex = 3;
            break;
        case "date 4":
            copy.dateFormatIndex = 4;
            break;
        case "date 5":
            copy.dateFormatIndex = 5;
            break;
        case "date 6":
            copy.dateFormatIndex = 6;
            break;
        case "date 7":
            copy.dateFormatIndex = 7;
            break;
        default:
            throw new Error("Unhandled action type");
    }
    return copy;
}

interface ClockContext {
    clockState: ClockState;
    clockDispatch: (action: { type: string }) => void;
    showingToolTip: boolean;
    setShowingToolTip: (bool: boolean) => void;
}
const ClockContext = createContext<ClockContext | null>(null);

export default function Clock(): React.ReactElement {
    const [clockState, clockDispatch] = useReducer(clockReducer, {
        date: new Date(),
        showAMPM: false,
        show24Hour: true,
        showSeconds: true,
        dateFormatIndex: 0,
    });

    // init state to false for styling only
    const [showingToolTip, setShowingToolTip] = useState<boolean>(false);

    // update the clock time/date every second
    useEffect(() => {
        const interval = setInterval(() => {
            clockDispatch({ type: "update date" });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    function getWrapperClassName(): string {
        if (showingToolTip) {
            return "time-date-component";
        } else {
            return "time-date-component edit-mode";
        }
    }

    return (
        <ClockContext.Provider
            value={{
                clockState,
                clockDispatch,
                showingToolTip,
                setShowingToolTip,
            }}
        >
            <div className={getWrapperClassName()}>
                <TimeAndDate />
                <DropDown showingToolTip={showingToolTip} />
            </div>
        </ClockContext.Provider>
    );
}

function TimeAndDate(): React.ReactElement {
    const clockContext = useContext(ClockContext);
    if (!clockContext) {
        throw new Error("Context not set");
    }
    const { clockState, showingToolTip, setShowingToolTip } = clockContext;

    function getDate(dateFormatIndex: number): string {
        const formatClock: FormatClock = new FormatClock(clockState.date);
        return formatClock.getDate(dateFormatIndex);
    }

    function getTime(): string {
        const formatClock: FormatClock = new FormatClock(clockState.date);

        const hour = clockState.show24Hour
            ? formatClock.getHour0_23()
            : formatClock.getHour1_12();
        const minute = formatClock.getMinutes();
        const second = clockState.showSeconds ? formatClock.getSeconds() : "";
        const ampm = clockState.showAMPM ? formatClock.getAMPM() : "";

        return `${hour}:${minute}${clockState.showSeconds ? ":" : ""}${second}${" " + ampm}`;
        //         hh  :    mm            :?                             ss?       am/pm?
    }

    function getFormatClassName(): string {
        return showingToolTip ? "edit-tool-tip visible" : "edit-tool-tip";
    }

    return (
        <button
            onClick={() => setShowingToolTip(false)}
            className="time-date-container"
        >
            <p className={getFormatClassName()}>
                <img
                    src={formatClockIcon}
                    alt="gear-icon"
                    className="gear-icon"
                />
                <span className="format-message">Format Time and Date</span>
            </p>
            <p className="time">{getTime()}</p>
            <p className="date">{getDate(clockState.dateFormatIndex)}</p>
        </button>
    );
}

function DropDown({
    showingToolTip,
}: {
    showingToolTip: boolean;
}): React.ReactElement {
    const [dateActive, setDateActive] = useState<boolean>(false);
    const [timeActive, setTimeActive] = useState<boolean>(false);

    function wrapperClassName(): string {
        const fClass: string = "drop-down-wrapper";
        return showingToolTip ? fClass : `${fClass} active`;
    }
    function dateClass(fClass: string): string {
        return dateActive ? `${fClass} active` : fClass;
    }
    function timeClass(fClass: string): string {
        return timeActive ? `${fClass} active` : fClass;
    }

    // only allow one tab open at a time
    function handleClick(
        state: boolean,
        setState: (b: boolean) => void,
        setOtherState: (b: boolean) => void,
    ) {
        if (state) {
            setState(false);
        } else {
            setState(true);
            setOtherState(false);
        }
    }

    return (
        <div className={wrapperClassName()}>
            <div className="format-wrapper">
                <div className={timeClass("format-button-wrapper")}>
                    <button
                        onClick={() =>
                            handleClick(
                                timeActive,
                                setTimeActive,
                                setDateActive,
                            )
                        }
                        className={timeClass("format-button")}
                    >
                        Format Time
                    </button>
                    <div className={timeClass("underline")}></div>
                </div>
                <div className={timeClass("sub-drop-down-wrapper")}>
                    <FormatTime />
                </div>
            </div>
            <div className="format-wrapper">
                <div className={dateClass("format-button-wrapper")}>
                    <button
                        onClick={() =>
                            handleClick(
                                dateActive,
                                setDateActive,
                                setTimeActive,
                            )
                        }
                        className={dateClass("format-button")}
                    >
                        Format Date
                    </button>
                    <div className={dateClass("underline")}></div>
                </div>
                <div className={dateClass("sub-drop-down-wrapper")}>
                    <FormatDate />
                </div>
            </div>
        </div>
    );
}

function FormatDate(): React.ReactElement {
    const context = useContext(ClockContext);
    if (!context) {
        throw new Error("Context not created");
    }
    const { clockState, clockDispatch, showingToolTip } = context;

    function handleClick(dateFormatIndex: number): void {
        clockDispatch({ type: `date ${dateFormatIndex}` });
    }

    function getClass(num: number): string {
        if (num === clockState.dateFormatIndex) {
            return "chosen";
        } else {
            return "";
        }
    }

    function getListItems(): React.ReactElement[] {
        const formatClock: FormatClock = new FormatClock(clockState.date);
        const listItems: React.ReactElement[] = [];
        for (let i = 0; i < formatClock.options.length; i++) {
            const component: React.ReactElement = (
                <li key={i}>
                    <button
                        className={getClass(i)}
                        onClick={() => handleClick(i)}
                    >
                        <p>{formatClock.getDate(i)}</p>
                        {getClass(i) !== "" && (
                            <img src={checkmarkIcon} alt="checkmark" />
                        )}
                    </button>
                </li>
            );
            listItems.push(component);
        }
        return listItems;
    }

    if (showingToolTip) {
        return <></>;
    } else {
        return <ul>{getListItems()}</ul>;
    }
}

function FormatTime(): React.ReactElement {
    const clockContext = useContext(ClockContext);
    if (!clockContext) {
        throw new Error("Context not found");
    }
    const { showingToolTip, clockState, clockDispatch } = clockContext;

    function handleDispatch(className: string) {
        if (className === "option show-suffix") {
            if (!clockState.showAMPM) {
                // 24 hour time does not use AM/PM
                clockDispatch({ type: "toggle AM/PM" });
                clockDispatch({ type: "off 24 hour" });
            } else {
                clockDispatch({ type: "toggle AM/PM" });
            }
            return;
        }
        if (className === "option show-24-hour") {
            if (!clockState.show24Hour) {
                // 24 hour time does not use AM/PM
                clockDispatch({ type: "toggle 24 hour" });
                clockDispatch({ type: "off AM/PM" });
            } else {
                clockDispatch({ type: "toggle 24 hour" });
            }
            return;
        }
        if (className === "option show-seconds") {
            clockDispatch({ type: "toggle seconds" });
            return;
        }
    }

    interface ItemData {
        spanText: string;
        className: string;
        // action: { type: string };
        handleDispatch: () => void;
        clockState: boolean;
    }
    const items: ItemData[] = [
        {
            spanText: "Show AM/PM",
            className: "option show-suffix",
            // action: { type: "toggle AM/PM" },
            handleDispatch: () => handleDispatch("option show-suffix"),
            clockState: clockState.showAMPM,
        },
        {
            spanText: "24 hour time",
            className: "option show-24-hour",
            // action: { type: "toggle 24 hour" },
            handleDispatch: () => handleDispatch("option show-24-hour"),
            clockState: clockState.show24Hour,
        },
        {
            spanText: "Show seconds",
            className: "option show-seconds",
            // action: { type: "toggle seconds" },
            handleDispatch: () => handleDispatch("option show-seconds"),
            clockState: clockState.showSeconds,
        },
    ];

    if (showingToolTip) {
        return <></>;
    } else {
        return (
            <ul className="choose-time-format">
                {items.map((item, index) => {
                    return (
                        <li key={index} className={item.className}>
                            <span>{item.spanText}</span>
                            <CheckBoxSlider
                                clockState={item.clockState}
                                handleDispatch={item.handleDispatch}
                            />
                        </li>
                    );
                })}
            </ul>
        );
    }
}

interface CheckBoxSliderProps {
    // action: { type: string };
    handleDispatch: () => void;
    clockState: boolean; // reference to what format the clock is showing time in
}
function CheckBoxSlider({
    handleDispatch,
    clockState,
    // action,
}: CheckBoxSliderProps): React.ReactElement {
    const clockContext = useContext(ClockContext);
    if (!clockContext) {
        throw new Error("ClockContext is null");
    }

    const [on, setOn] = useState<boolean>(clockState);
    useEffect(() => {
        setOn(clockState);
    }, [setOn, clockState]);

    function handleClick(): void {
        setOn(!on);
        handleDispatch();
    }

    function getClassName(): string {
        const fClass = "slider-switch";
        return on ? `${fClass} on` : fClass;
    }

    return (
        <button onClick={handleClick} className="checkbox-slider">
            <div className={getClassName()}>
                <img src={checkmarkIcon} alt="checkmark" />
            </div>
        </button>
    );
}
