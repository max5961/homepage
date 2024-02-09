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

/* Takes in a new Date object and returns formatted dates with the help of the
 * date-fns library */
class FormatClock {
    date: Date;
    formatPatterns: string[];

    constructor(date: Date) {
        this.date = date;
        this.formatPatterns = [
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

    getDate(dateFormatIndex: number): string {
        // dateFormatIndex is part of the ClockState object
        if (!this.formatPatterns[dateFormatIndex]) {
            throw new Error("Invalid options index");
        }

        return format(this.date, this.formatPatterns[dateFormatIndex]);
    }
}

interface ClockState {
    date: Date;
    showAMPM: boolean;
    show24Hour: boolean;
    showSeconds: boolean;
    dateFormatIndex: number;
}
enum ActionType {
    UpdateDate = "UPDATE_DATE",
    ToggleAMPM = "TOGGLE_AM_PM",
    OffAMPM = "OFF_AM_PM",
    Toggle24Hour = "TOGGLE_24_HOUR",
    Off24Hour = "OFF_24_HOUR",
    ToggleSeconds = "TOGGLE_SECONDS",
    OffSeconds = "OFF_SECONDS",
    DateFormat0 = "DATE_0",
    DateFormat1 = "DATE_1",
    DateFormat2 = "DATE_2",
    DateFormat3 = "DATE_3",
    DateFormat4 = "DATE_4",
    DateFormat5 = "DATE_5",
    DateFormat6 = "DATE_6",
    DateFormat7 = "DATE_7",
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
        case ActionType.UpdateDate:
            copy.date = new Date();
            break;
        case ActionType.ToggleAMPM:
            copy.showAMPM = !copy.showAMPM;
            break;
        case ActionType.OffAMPM:
            copy.showAMPM = false;
            break;
        case ActionType.Toggle24Hour:
            copy.show24Hour = !copy.show24Hour;
            break;
        case ActionType.Off24Hour:
            copy.show24Hour = false;
            break;
        case ActionType.ToggleSeconds:
            copy.showSeconds = !copy.showSeconds;
            break;
        case ActionType.OffSeconds:
            copy.showSeconds = false;
            break;
        case ActionType.DateFormat0:
            copy.dateFormatIndex = 0;
            break;
        case ActionType.DateFormat1:
            copy.dateFormatIndex = 1;
            break;
        case ActionType.DateFormat2:
            copy.dateFormatIndex = 2;
            break;
        case ActionType.DateFormat3:
            copy.dateFormatIndex = 3;
            break;
        case ActionType.DateFormat4:
            copy.dateFormatIndex = 4;
            break;
        case ActionType.DateFormat5:
            copy.dateFormatIndex = 5;
            break;
        case ActionType.DateFormat6:
            copy.dateFormatIndex = 6;
            break;
        case ActionType.DateFormat7:
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
    editActive: boolean;
    setEditActive: (bool: boolean) => void;
}
const ClockContext = createContext<ClockContext | null>(null);

// Top Level Component
export default function Clock(): React.ReactElement {
    const [clockState, clockDispatch] = useReducer(clockReducer, {
        date: new Date(),
        showAMPM: false,
        show24Hour: true,
        showSeconds: true,
        dateFormatIndex: 0,
    });

    const [editActive, setEditActive] = useState<boolean>(false);

    // update the clock time/date every second
    useEffect(() => {
        const interval = setInterval(() => {
            clockDispatch({ type: ActionType.UpdateDate });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    function getWrapperClassName(): string {
        if (editActive) {
            return "time-date-component edit";
        } else {
            return "time-date-component";
        }
    }

    return (
        <ClockContext.Provider
            value={{
                clockState,
                clockDispatch,
                editActive,
                setEditActive,
            }}
        >
            <div className={getWrapperClassName()}>
                <TimeAndDate />
                <DropDown editActive={editActive} />
            </div>
        </ClockContext.Provider>
    );
}

function TimeAndDate(): React.ReactElement {
    const clockContext = useContext(ClockContext);
    if (!clockContext) {
        throw new Error("Context not set");
    }
    const { clockState, editActive, setEditActive } = clockContext;

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

    // if not actively editing the clock do not show the tool tip on hover
    function getFormatClassName(): string {
        return editActive ? "edit-tool-tip hidden" : "edit-tool-tip";
    }

    return (
        <button
            onClick={() => setEditActive(true)}
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

function DropDown({ editActive }: { editActive: boolean }): React.ReactElement {
    const [dateActive, setDateActive] = useState<boolean>(false);
    const [timeActive, setTimeActive] = useState<boolean>(false);

    // toggles an existing className to className.active
    function toggleActive(active: boolean, fClass: string): string {
        return active ? `${fClass} active` : fClass;
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
        <div className={toggleActive(editActive, "drop-down-wrapper")}>
            {" "}
            <div className="format-wrapper">
                <div
                    className={toggleActive(
                        timeActive,
                        "format-button-wrapper",
                    )}
                >
                    <button
                        onClick={() =>
                            handleClick(
                                timeActive,
                                setTimeActive,
                                setDateActive,
                            )
                        }
                        className={toggleActive(timeActive, "format-button")}
                    >
                        Format Time
                    </button>
                    <div
                        className={toggleActive(timeActive, "underline")}
                    ></div>
                </div>
                <div
                    className={toggleActive(
                        timeActive,
                        "sub-drop-down-wrapper",
                    )}
                >
                    <FormatTime />
                </div>
            </div>
            <div className="format-wrapper">
                <div
                    className={toggleActive(
                        dateActive,
                        "format-button-wrapper",
                    )}
                >
                    <button
                        onClick={() =>
                            handleClick(
                                dateActive,
                                setDateActive,
                                setTimeActive,
                            )
                        }
                        className={toggleActive(dateActive, "format-button")}
                    >
                        Format Date
                    </button>
                    <div
                        className={toggleActive(dateActive, "underline")}
                    ></div>
                </div>
                <div
                    className={toggleActive(
                        dateActive,
                        "sub-drop-down-wrapper",
                    )}
                >
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
    const { clockState, clockDispatch, editActive } = context;

    if (!editActive) return <></>; // return early if nothing if being edited

    function handleClick(dateFormatIndex: number): void {
        const actionTypes: ActionType[] = [
            ActionType.DateFormat0,
            ActionType.DateFormat1,
            ActionType.DateFormat2,
            ActionType.DateFormat3,
            ActionType.DateFormat4,
            ActionType.DateFormat5,
            ActionType.DateFormat6,
            ActionType.DateFormat7,
        ];
        clockDispatch({ type: `${actionTypes[dateFormatIndex]}` });
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
        for (let i = 0; i < formatClock.formatPatterns.length; i++) {
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

    return <ul>{getListItems()}</ul>;
}

function FormatTime(): React.ReactElement {
    const clockContext = useContext(ClockContext);
    if (!clockContext) {
        throw new Error("Context not found");
    }
    const { editActive, clockState, clockDispatch } = clockContext;

    if (!editActive) return <></>; // return early if nothing if being edited

    function handleDispatch(className: string) {
        if (className === "option show-suffix") {
            if (!clockState.showAMPM) {
                // 24 hour time does not use AM/PM
                clockDispatch({ type: ActionType.ToggleAMPM });
                clockDispatch({ type: ActionType.Off24Hour });
            } else {
                clockDispatch({ type: ActionType.ToggleAMPM });
            }
            return;
        }
        if (className === "option show-24-hour") {
            if (!clockState.show24Hour) {
                // 24 hour time does not use AM/PM
                clockDispatch({ type: ActionType.Toggle24Hour });
                clockDispatch({ type: ActionType.OffAMPM });
            } else {
                clockDispatch({ type: ActionType.Toggle24Hour });
            }
            return;
        }
        if (className === "option show-seconds") {
            clockDispatch({ type: ActionType.ToggleSeconds });
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
