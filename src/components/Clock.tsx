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
        return format(this.date, "K");
    }

    getHour1_24(): string {
        return format(this.date, "k");
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
    show12Hour: boolean;
    showSeconds: boolean;
    dateFormatIndex: number;
}
function clockReducer(state: ClockState, action: { type: string }): ClockState {
    const copy: ClockState = {
        date: state.date,
        showAMPM: state.showAMPM,
        show12Hour: state.show12Hour,
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
        case "toggle 12 hour":
            copy.show12Hour = !copy.show12Hour;
            break;
        case "toggle seconds":
            copy.showSeconds = !copy.showSeconds;
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
    dispatch: (action: { type: string }) => void;
    setEditing: (bool: boolean) => void;
}
const ClockContext = createContext<ClockContext | null>(null);

export default function Clock(): React.ReactElement {
    const [clockState, dispatch] = useReducer(clockReducer, {
        date: new Date(),
        showAMPM: false,
        show12Hour: true,
        showSeconds: true,
        dateFormatIndex: 0,
    });
    const [editing, setEditing] = useState<boolean>(true);

    // update the clock time/date every second
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch({ type: "update date" });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    function getTime(): string {
        const formatClock: FormatClock = new FormatClock(clockState.date);

        const hour = clockState.show12Hour
            ? formatClock.getHour1_12()
            : formatClock.getHour1_24();
        const minute = formatClock.getMinutes();
        const second = clockState.showSeconds ? formatClock.getSeconds() : "";
        const ampm = clockState.showAMPM ? formatClock.getAMPM() : "";

        return `${hour}:${minute}${clockState.showSeconds ? ":" : ""}${second}${" " + ampm}`;
        //         hh  :    mm            :?                             ss?       am/pm?
    }

    function getDate(dateFormatIndex: number): string {
        const formatClock: FormatClock = new FormatClock(clockState.date);
        return formatClock.getDate(dateFormatIndex);
    }

    const currEditClass: string = editing ? "editing" : "";

    return (
        <ClockContext.Provider value={{ clockState, dispatch, setEditing }}>
            <div className={`time-date-component ${currEditClass}`}>
                <button className="time-date-container">
                    <div
                        className={`format-message-container ${currEditClass}`}
                    >
                        <img
                            src={formatClockIcon}
                            alt="gear-icon"
                            className="gear-icon"
                        />
                        <span className="format-message">
                            Format Date and Time
                        </span>
                    </div>
                    <p className="time">{getTime()}</p>
                    <p className="date">
                        {getDate(clockState.dateFormatIndex)}
                    </p>
                </button>

                <FormatTime />
            </div>
        </ClockContext.Provider>
    );
}

function ChooseWhichToFormat(): React.ReactElement {
    return (
        <div className="format-container prompt-container">
            <h3>Edit Format</h3>
            <button className="edit-date">Date</button>
            <button className="edit-time">Time</button>
        </div>
    );
}
function FormatDate(): React.ReactElement {
    const context = useContext(ClockContext);
    if (!context) {
        throw new Error("Context not created");
    }
    const { clockState, dispatch } = context;
    const formatClock: FormatClock = new FormatClock(clockState.date);

    function handleClick(dateFormatIndex: number): void {
        dispatch({ type: `date ${dateFormatIndex}` });
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

        const components: React.ReactElement[] = [];
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
            components.push(component);
        }
        return components;
    }

    return (
        <div className="format-container date-container">
            <div className="divider"></div>
            <ul>{getListItems()}</ul>
            <ApplyCancelButtons />
        </div>
    );
}
function FormatTime(): React.ReactElement {
    return (
        <div className="format-container time-container">
            <ul>
                <li>
                    <div className="option show-suffix">
                        <span>Show AM/PM</span>
                        <CheckBoxSlider action={{ type: "toggle AM/PM" }} />
                    </div>
                </li>
                <li>
                    <div className="option show-24-hour">
                        <span>24 hour time</span>
                        <CheckBoxSlider action={{ type: "toggle 12 hour" }} />
                    </div>
                </li>
                <li>
                    <div className="option show-seconds">
                        <span>Show seconds</span>
                        <CheckBoxSlider action={{ type: "toggle seconds" }} />
                    </div>
                </li>
            </ul>
            <ApplyCancelButtons />
        </div>
    );
}

interface CheckBoxSliderProps {
    action: { type: string };
}
function CheckBoxSlider({ action }: CheckBoxSliderProps): React.ReactElement {
    const clockContext = useContext(ClockContext);
    if (!clockContext) {
        throw new Error("ClockContext is null");
    }
    const { dispatch } = clockContext;
    const [on, setOn] = useState<boolean>(false);
    const className = on ? "slider-switch on" : "slider-switch";

    function handleClick(): void {
        setOn(!on);
        dispatch(action);
    }

    return (
        <button onClick={handleClick} className="checkbox-slider">
            <div className={className}>
                <img src={checkmarkIcon} alt="checkmark" />
            </div>
        </button>
    );
}

function ApplyCancelButtons(): React.ReactElement {
    return (
        <div className="apply-cancel-container">
            <button className="cancel">Cancel</button>
            <button className="apply">Apply</button>
        </div>
    );
}
