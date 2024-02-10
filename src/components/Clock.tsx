import React from "react";
import {
    useState,
    useEffect,
    useReducer,
    useContext,
    createContext,
    useRef,
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
enum ClockAction {
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
        case ClockAction.UpdateDate:
            copy.date = new Date();
            break;
        case ClockAction.ToggleAMPM:
            copy.showAMPM = !copy.showAMPM;
            break;
        case ClockAction.OffAMPM:
            copy.showAMPM = false;
            break;
        case ClockAction.Toggle24Hour:
            copy.show24Hour = !copy.show24Hour;
            break;
        case ClockAction.Off24Hour:
            copy.show24Hour = false;
            break;
        case ClockAction.ToggleSeconds:
            copy.showSeconds = !copy.showSeconds;
            break;
        case ClockAction.OffSeconds:
            copy.showSeconds = false;
            break;
        case ClockAction.DateFormat0:
            copy.dateFormatIndex = 0;
            break;
        case ClockAction.DateFormat1:
            copy.dateFormatIndex = 1;
            break;
        case ClockAction.DateFormat2:
            copy.dateFormatIndex = 2;
            break;
        case ClockAction.DateFormat3:
            copy.dateFormatIndex = 3;
            break;
        case ClockAction.DateFormat4:
            copy.dateFormatIndex = 4;
            break;
        case ClockAction.DateFormat5:
            copy.dateFormatIndex = 5;
            break;
        case ClockAction.DateFormat6:
            copy.dateFormatIndex = 6;
            break;
        case ClockAction.DateFormat7:
            copy.dateFormatIndex = 7;
            break;
        default:
            throw new Error("Unhandled action type");
    }
    return copy;
}

interface DropDownState {
    dropDownExpanded: boolean;
    timeExpanded: boolean;
    dateExpanded: boolean;
}
enum DDAction {
    CloseAll = "CLOSE_ALL",
    ToggleDD = "TOGGLE_DROP_DOWN",
    ToggleTime = "TOGGLE_TIME_DD",
    ToggleDate = "TOGGLE_DATE_DD",
    CloseDD = "CLOSE_DROP_DOWN",
    CloseTime = "CLOSE_TIME_DD",
    CloseDate = "CLOSE_DATE_DD",
    OpenDD = "OPEN_DROP_DOWN",
    OpenTime = "OPEN_TIME",
    OpenDate = "OPEN_DATE",
}
function dropDownReducer(
    ddState: DropDownState,
    action: { type: string },
): DropDownState {
    const copy: DropDownState = {
        dropDownExpanded: ddState.dropDownExpanded,
        timeExpanded: ddState.timeExpanded,
        dateExpanded: ddState.dateExpanded,
    };
    switch (action.type) {
        case DDAction.CloseAll:
            copy.dropDownExpanded = false;
            copy.timeExpanded = false;
            copy.dateExpanded = false;
            break;
        case DDAction.ToggleDD:
            copy.dropDownExpanded = !ddState.dropDownExpanded;
            break;
        case DDAction.ToggleTime:
            copy.timeExpanded = !ddState.timeExpanded;
            break;
        case DDAction.ToggleDate:
            copy.dateExpanded = !ddState.dateExpanded;
            break;
        case DDAction.CloseDD:
            copy.dropDownExpanded = false;
            break;
        case DDAction.CloseTime:
            copy.timeExpanded = false;
            break;
        case DDAction.CloseDate:
            copy.dateExpanded = false;
            break;
        case DDAction.OpenDD:
            copy.dropDownExpanded = true;
            break;
        case DDAction.OpenTime:
            copy.timeExpanded = true;
            break;
        case DDAction.OpenDate:
            copy.dateExpanded = true;
            break;
        default:
            throw new Error("Unhandled action type");
    }
    return copy;
}

interface ClockContext {
    clockState: ClockState;
    clockDispatch: (action: { type: string }) => void;
    ddState: DropDownState;
    ddDispatch: (action: { type: string }) => void;
    edit: boolean;
    setEdit: (b: boolean) => void;
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
    const [ddState, ddDispatch] = useReducer(dropDownReducer, {
        dropDownExpanded: false,
        timeExpanded: false,
        dateExpanded: false,
    });

    /* edit mode is entered when the TimeAndDate component is clicked.  The 
    /* TimeAndDate component is wrapped in a button */
    const [edit, setEdit] = useState<boolean>(false);

    // update the clock time/date every second
    useEffect(() => {
        const interval = setInterval(() => {
            clockDispatch({ type: ClockAction.UpdateDate });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <ClockContext.Provider
            value={{
                clockState,
                clockDispatch,
                ddState,
                ddDispatch,
                edit,
                setEdit,
            }}
        >
            <>{edit ? <EditClockWrapper /> : <ClockWrapper />}</>
        </ClockContext.Provider>
    );
}

function ClockWrapper(): React.ReactElement {
    return (
        <div id="clock">
            <TimeAndDate />
        </div>
    );
}

function EditClockWrapper(): React.ReactElement {
    const clockContext = useContext(ClockContext);
    if (!clockContext) {
        throw new Error("Context not set");
    }

    const { setEdit, ddDispatch } = clockContext;
    const wrapper = useRef<HTMLDivElement | null>(null);

    // exit edit and fade out with click outside of component
    useEffect(() => {
        function handleOutsideClick(e: any): void {
            const transitionTime: number = 300; // #clock.edit-clock

            if (wrapper.current && !wrapper.current.contains(e.target)) {
                wrapper.current.classList.add("exiting");
                setTimeout(() => {
                    setEdit(false);
                    ddDispatch({ type: DDAction.CloseAll });
                }, transitionTime);
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);

        return () =>
            document.removeEventListener("mousedown", handleOutsideClick);
    }, [setEdit, ddDispatch]);

    // fade in
    useEffect(() => {
        if (wrapper.current) {
            wrapper.current.classList.add("entering");
            setTimeout(() => {
                if (wrapper.current) {
                    wrapper.current.classList.remove("entering");
                }
            }, 0);
        }
    }, []);

    return (
        <div id="clock" className="edit-clock" ref={wrapper}>
            <TimeAndDate />
            <DropDown />
        </div>
    );
}

function TimeAndDate(): React.ReactElement {
    const clockContext = useContext(ClockContext);
    if (!clockContext) {
        throw new Error("Context not set");
    }
    const { clockState, ddState, ddDispatch, edit, setEdit } = clockContext;

    function getDate(): string {
        const formatClock: FormatClock = new FormatClock(clockState.date);
        return formatClock.getDate(clockState.dateFormatIndex);
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
        return edit ? "edit-tool-tip visible" : "edit-tool-tip";
    }

    function handleClick(): void {
        if (!ddState.dropDownExpanded) {
            ddDispatch({ type: DDAction.OpenDD });
        }
        if (!edit) {
            setEdit(true);
        }
    }

    return (
        <button onClick={handleClick} className="time-date">
            <p className={getFormatClassName()}>
                <img
                    src={formatClockIcon}
                    alt="format-icon"
                    className="format-icon"
                />
                <span className="format-message">Format Time and Date</span>
            </p>
            <p className="time">{getTime()}</p>
            <p className="date">{getDate()}</p>
        </button>
    );
}

function DropDown(): React.ReactElement {
    const context = useContext(ClockContext);
    if (!context) {
        throw new Error("Clock context in null");
    }
    const { ddState, ddDispatch } = context;

    // toggles an existing className to className.expanded
    function toggleActive(expanded: boolean, fClass: string): string {
        return expanded ? `${fClass} expanded` : fClass;
    }

    function handleTimeClick(): void {
        if (ddState.dateExpanded) {
            ddDispatch({ type: DDAction.CloseDate });
            ddDispatch({ type: DDAction.OpenTime });
        } else {
            ddDispatch({ type: DDAction.ToggleTime });
        }
    }

    function handleDateClick(): void {
        if (ddState.timeExpanded) {
            ddDispatch({ type: DDAction.CloseTime });
            ddDispatch({ type: DDAction.OpenDate });
        } else {
            ddDispatch({ type: DDAction.ToggleDate });
        }
    }

    return (
        <div
            className={toggleActive(
                ddState.dropDownExpanded,
                "drop-down-container",
            )}
        >
            <div className="sub-drop-down-container">
                <div
                    className={toggleActive(
                        ddState.timeExpanded,
                        "format-button-wrapper",
                    )}
                >
                    <button
                        onClick={() => handleTimeClick()}
                        className={toggleActive(
                            ddState.timeExpanded,
                            "format-button",
                        )}
                    >
                        Format Time
                    </button>
                    <div
                        className={toggleActive(
                            ddState.timeExpanded,
                            "underline-wrapper",
                        )}
                    >
                        <div
                            className={toggleActive(
                                ddState.timeExpanded,
                                "underline",
                            )}
                        ></div>
                    </div>
                </div>
                <div
                    className={toggleActive(ddState.timeExpanded, "ul-wrapper")}
                >
                    <FormatTime />
                </div>
            </div>
            <div className="sub-drop-down-container">
                <div
                    className={toggleActive(
                        ddState.dateExpanded,
                        "format-button-wrapper",
                    )}
                >
                    <button
                        onClick={() => handleDateClick()}
                        className={toggleActive(
                            ddState.dateExpanded,
                            "format-button",
                        )}
                    >
                        Format Date
                    </button>
                    <div
                        className={toggleActive(
                            ddState.dateExpanded,
                            "underline-wrapper",
                        )}
                    >
                        <div
                            className={toggleActive(
                                ddState.dateExpanded,
                                "underline",
                            )}
                        ></div>
                    </div>
                </div>
                <div
                    className={toggleActive(ddState.dateExpanded, "ul-wrapper")}
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
    const { clockState, clockDispatch, edit } = context;

    if (!edit) return <></>; // return early if nothing is being edited

    function handleClick(dateFormatIndex: number): void {
        const actionTypes: ClockAction[] = [
            ClockAction.DateFormat0,
            ClockAction.DateFormat1,
            ClockAction.DateFormat2,
            ClockAction.DateFormat3,
            ClockAction.DateFormat4,
            ClockAction.DateFormat5,
            ClockAction.DateFormat6,
            ClockAction.DateFormat7,
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

    return <ul className="choose-date-format">{getListItems()}</ul>;
}

function FormatTime(): React.ReactElement {
    const clockContext = useContext(ClockContext);
    if (!clockContext) {
        throw new Error("Context not found");
    }
    const { clockState, clockDispatch, edit } = clockContext;

    if (!edit) return <></>; // return early if nothing is being edited

    function handleDispatch(className: string) {
        if (className === "option show-suffix") {
            if (!clockState.showAMPM) {
                // 24 hour time does not use AM/PM
                clockDispatch({ type: ClockAction.ToggleAMPM });
                clockDispatch({ type: ClockAction.Off24Hour });
            } else {
                clockDispatch({ type: ClockAction.ToggleAMPM });
            }
            return;
        }
        if (className === "option show-24-hour") {
            if (!clockState.show24Hour) {
                // 24 hour time does not use AM/PM
                clockDispatch({ type: ClockAction.Toggle24Hour });
                clockDispatch({ type: ClockAction.OffAMPM });
            } else {
                clockDispatch({ type: ClockAction.Toggle24Hour });
            }
            return;
        }
        if (className === "option show-seconds") {
            clockDispatch({ type: ClockAction.ToggleSeconds });
            return;
        }
    }

    interface ItemData {
        spanText: string;
        className: string;
        handleDispatch: () => void;
        clockState: boolean;
    }
    const items: ItemData[] = [
        {
            spanText: "Show AM/PM",
            className: "option show-suffix",
            handleDispatch: () => handleDispatch("option show-suffix"),
            clockState: clockState.showAMPM,
        },
        {
            spanText: "24 hour time",
            className: "option show-24-hour",
            handleDispatch: () => handleDispatch("option show-24-hour"),
            clockState: clockState.show24Hour,
        },
        {
            spanText: "Show seconds",
            className: "option show-seconds",
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
                            toggleState={item.clockState}
                            handleDispatch={item.handleDispatch}
                        />
                    </li>
                );
            })}
        </ul>
    );
}

interface CheckBoxSliderProps {
    handleDispatch: () => void;
    toggleState: boolean;
}
function CheckBoxSlider({
    handleDispatch,
    toggleState,
}: CheckBoxSliderProps): React.ReactElement {
    const clockContext = useContext(ClockContext);
    if (!clockContext) {
        throw new Error("ClockContext is null");
    }

    const [on, setOn] = useState<boolean>(toggleState);
    useEffect(() => {
        setOn(toggleState);
    }, [setOn, toggleState]);

    function handleClick(): void {
        setOn(!on);
        handleDispatch();
    }

    function toggleClass(fClass: string): string {
        return on ? `${fClass} on` : fClass;
    }

    return (
        <button
            onClick={handleClick}
            className={toggleClass("checkbox-slider")}
        >
            <div className={toggleClass("slider-switch")}>
                <img src={checkmarkIcon} alt="checkmark" />
            </div>
        </button>
    );
}
