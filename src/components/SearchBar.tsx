import React from "react";
import { useState } from "react";

export default function SearchBar(): React.ReactElement {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchSite, setSearchSite] = useState<string>(
        "https://google.com/search?q=",
    );

    function handleInputChange(e: any): void {
        setSearchTerm(e.currentTarget.value);
    }

    function handleSubmit(e: any): void {
        e.preventDefault();
        const searchURL: string = `${searchSite}${searchTerm}`;
        window.location.href = searchURL;
    }

    return (
        <form className="search" onSubmit={handleSubmit}>
            <SearchEngines setSearchSite={setSearchSite} />
            <input
                onChange={handleInputChange}
                type="text"
                className="search-bar"
                placeholder="Search the web"
                autoFocus
            />
        </form>
    );
}

interface SearchEnginesProps {
    setSearchSite: (string: string) => void;
}
function SearchEngines({
    setSearchSite,
}: SearchEnginesProps): React.ReactElement {
    const [dropDown, setDropDown] = useState<boolean>(false);

    function toggleDropDown(e: any): void {
        e.preventDefault();
        console.log(dropDown);
        setDropDown(!dropDown);
    }

    function getClassName(): string {
        const firstClass: string = "search-engines-list";
        if (dropDown) {
            console.log(firstClass + " visible");
            return `${firstClass} visible`;
        } else {
            console.log(firstClass);
            return firstClass;
        }
    }

    return (
        <div className="search-engines-container">
            <button className="show-search-engines" onClick={toggleDropDown}>
                show
            </button>
            <ul className={getClassName()}>
                <li>
                    <button>
                        <p>Google</p>
                    </button>
                </li>
                <li>
                    <button>
                        <p>DuckDuckGo</p>
                    </button>
                </li>
                <li>
                    <button>
                        <p>Bing</p>
                    </button>
                </li>
                <li>
                    <button>
                        <p>Yahoo</p>
                    </button>
                </li>
                <li>
                    <button>
                        <p>Youtube</p>
                    </button>
                </li>
            </ul>
        </div>
    );
}
