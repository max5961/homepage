import React from "react";
import { useState } from "react";
import { backgrounds } from "./backgrounds";
import BackgroundImage from "./BackgroundImage";
import BackgroundSelector from "./BackgroundSelector";
import OptionsMenu from "./OptionsMenu";

export default function App(): React.ReactElement {
    const [bgIndex, setBgIndex] = useState<number>(0);
    const [backgroundsArray, setBackgroundsArray] =
        useState<string[]>(backgrounds);

    return (
        <div id="content">
            <BackgroundImage backgrounds={backgroundsArray} bgIndex={bgIndex} />
            <OptionsMenu
                backgrounds={backgrounds}
                bgIndex={bgIndex}
                setBgIndex={setBgIndex}
            />
        </div>
    );
}
