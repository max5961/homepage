import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import googleLogo from "../images/logos/google.svg";
import bingLogo from "../images/logos/bing.svg";
import youtubeLogo from "../images/logos/youtube.svg";
import duckDuckGoLogo from "../images/logos/duckduckgo.svg";
import gitHubLogo from "../images/logos/github.svg";
import searchIcon from "../images/icons/search.svg";
import downCaretIcon from "../images/icons/down-caret.svg";
import checkIcon from "../images/icons/check.svg";

interface EngineDetails {
    name: string;
    placeholder: string;
    logo: string;
    searchPrefix: string;
}
interface Engines {
    google: EngineDetails;
    bing: EngineDetails;
    duckDuckGo: EngineDetails;
    youtube: EngineDetails;
    gitHub: EngineDetails;
}

export default function SearchBar(): React.ReactElement {
    const allEngines: Engines = getSearchEngines();
    const [searchEngine, setSearchEngine] = useState<EngineDetails>(
        allEngines.google,
    );
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [dropDown, setDropDown] = useState<boolean>(false);
    const dropDownButton = useRef<HTMLButtonElement>(null);
    const textInput = useRef<HTMLInputElement>(null);
    // In the event the user searches something and hits the back button, the
    //+ browser populates the input field with the previous search...but the
    //+ input is initialized with "" in React. The searchTerm state is only
    //+ modified on an onChange event so there is an initial disconnect.
    //+ Simply pushing to the event loop with a 0ms setTimeout is not enough,
    //+ so add a generous 250ms.
    useEffect(() => {
        setTimeout(() => {
            if (textInput.current) {
                setSearchTerm(textInput.current.value);
            }
        }, 250);
    }, []);

    function getSearchEngines(): Engines {
        return {
            google: {
                name: "Google",
                placeholder: "Search with Google",
                logo: googleLogo,
                searchPrefix: "https://google.com/search?q=",
            },
            bing: {
                name: "Bing",
                placeholder: "Search with Bing",
                logo: bingLogo,
                searchPrefix: "https://www.bing.com/search?q=",
            },
            duckDuckGo: {
                name: "DuckDuckGo",
                placeholder: "Search with DuckDuckGo",
                logo: duckDuckGoLogo,
                searchPrefix: "https://duckduckgo.com/?hps=1&q=",
            },
            youtube: {
                name: "Youtube",
                placeholder: "Search Youtube content",
                logo: youtubeLogo,
                searchPrefix: "https://www.youtube.com/results?search_query=",
            },
            gitHub: {
                name: "GitHub",
                placeholder: "Search GitHub content",
                logo: gitHubLogo,
                searchPrefix: "https://github.com/search?q=",
            },
        };
    }

    function handleInputChange(e: any): void {
        setSearchTerm(e.currentTarget.value);
    }

    function handleSubmit(e: any): void {
        e.preventDefault();
        const searchURL: string = `${searchEngine.searchPrefix}${searchTerm}`;
        window.location.href = searchURL;
    }

    function toggleDropDown(e: any): void {
        e.preventDefault();
        setDropDown(!dropDown);
    }

    function toggleCaretClass(): string {
        if (dropDown) {
            return "down-caret inverted";
        } else {
            return "down-caret";
        }
    }

    return (
        <section className="search">
            <div className="search-bar-container">
                <button
                    className="show-search-engines"
                    onClick={toggleDropDown}
                    ref={dropDownButton}
                >
                    <img
                        src={searchEngine.logo}
                        alt="Search icon"
                        className="search-engine-logo"
                    />
                    <img
                        src={downCaretIcon}
                        alt="show drop down"
                        className={`${toggleCaretClass()}`}
                    />
                </button>
                <form className="search" onSubmit={handleSubmit}>
                    <input
                        onChange={handleInputChange}
                        type="text"
                        className="search-bar"
                        placeholder={searchEngine.placeholder}
                        autoFocus
                        ref={textInput}
                    />
                    <button className="go-search">
                        <img src={searchIcon} alt="" />
                    </button>
                </form>
            </div>
            <SearchEnginesDropDown
                getSearchEngines={getSearchEngines}
                searchEngine={searchEngine}
                setSearchEngine={setSearchEngine}
                setDropDown={setDropDown}
                dropDown={dropDown}
                dropDownButton={dropDownButton}
            />
        </section>
    );
}

interface SearchEnginesDropDownProps {
    getSearchEngines: () => Engines;
    searchEngine: EngineDetails;
    setSearchEngine: (engine: EngineDetails) => void;
    setDropDown: (bool: boolean) => void;
    dropDown: boolean;
    dropDownButton: React.RefObject<HTMLButtonElement>;
}
function SearchEnginesDropDown({
    getSearchEngines,
    searchEngine,
    setSearchEngine,
    setDropDown,
    dropDown,
    dropDownButton,
}: SearchEnginesDropDownProps): React.ReactElement {
    // clicking outside of drop down closes drop down
    const unorderedListElement = useRef<HTMLUListElement>(null);
    useEffect(() => {
        function handleOutsideClick(e: any): void {
            if (
                unorderedListElement.current &&
                !unorderedListElement.current.contains(e.target) &&
                dropDownButton.current &&
                !dropDownButton.current.contains(e.target)
            ) {
                setDropDown(false);
            }
        }
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    });

    // change className to make toggle drop down visibility
    function getClassName(firstClass: string): string {
        if (dropDown) {
            return `${firstClass} visible`;
        } else {
            return firstClass;
        }
    }

    // changes searchEngine and closes drop down
    function handleButtonClick(engine: EngineDetails): void {
        // setSearchEngine with new EngineDetails object
        const copy: Engines = getSearchEngines();
        for (const key in copy) {
            if (copy[key].name === engine.name) {
                setSearchEngine(copy[key]);
            }
        }

        // close the drop down
        setDropDown(false);
    }

    // add a checkmark next to chosen search engine
    function setCheckIconClass(engine: EngineDetails): string {
        if (searchEngine.name === engine.name) {
            return "check-icon visible";
        }
        return "check-icon";
    }

    const allEngines: Engines = getSearchEngines();

    return (
        <ul
            className={getClassName("search-engines-drop-down")}
            ref={unorderedListElement}
        >
            <li>
                <button onClick={() => handleButtonClick(allEngines.google)}>
                    <img src={googleLogo} alt="Google logo" />
                    <p>Google</p>
                    <img
                        src={checkIcon}
                        alt="current search engine"
                        className={`${setCheckIconClass(allEngines.google)}`}
                    />
                </button>
            </li>
            <li>
                <button
                    onClick={() => handleButtonClick(allEngines.duckDuckGo)}
                >
                    <img src={duckDuckGoLogo} alt="DuckDuckGo logo" />
                    <p>DuckDuckGo</p>
                    <img
                        src={checkIcon}
                        alt="current search engine"
                        className={`${setCheckIconClass(allEngines.duckDuckGo)}`}
                    />
                </button>
            </li>
            <li>
                <button onClick={() => handleButtonClick(allEngines.bing)}>
                    <img src={bingLogo} alt="Bing logo" />
                    <p>Bing</p>
                    <img
                        src={checkIcon}
                        alt="current search engine"
                        className={`${setCheckIconClass(allEngines.bing)}`}
                    />
                </button>
            </li>
            <li>
                <button onClick={() => handleButtonClick(allEngines.youtube)}>
                    <img src={youtubeLogo} alt="YouTube logo" />
                    <p>Youtube</p>
                    <img
                        src={checkIcon}
                        alt="current search engine"
                        className={`${setCheckIconClass(allEngines.youtube)}`}
                    />
                </button>
            </li>
            <li>
                <button onClick={() => handleButtonClick(allEngines.gitHub)}>
                    <img src={gitHubLogo} alt="GitHub logo" />
                    <p>GitHub</p>
                    <img
                        src={checkIcon}
                        alt="current search engine"
                        className={`${setCheckIconClass(allEngines.gitHub)}`}
                    />
                </button>
            </li>
        </ul>
    );
}
