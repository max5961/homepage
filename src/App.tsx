import React from "react";
import { useState } from "react";
import { backgroundUrls } from "./backgroundUrls";
import OptionsMenu from "./components/OptionsMenu";
import SearchBar from "./components/SearchBar";
import Bookmarks from "./components/Bookmarks";
import Clock from "./components/Clock";

export default function App(): React.ReactElement {
    const [bgIndex, setBgIndex] = useState<number>(0);
    function getBackground(): string {
        return backgroundUrls[bgIndex];
    }

    return (
        <div
            id="content"
            style={{ backgroundImage: `url(${getBackground()})` }}
        >
            <Clock />
            <div className="center-container">
                <SearchBar />
                <Bookmarks />
            </div>
            <OptionsMenu
                backgroundUrls={backgroundUrls}
                bgIndex={bgIndex}
                setBgIndex={setBgIndex}
            />
        </div>
    );
}
