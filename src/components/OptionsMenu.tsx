import React from "react";
import { useState } from "react";
import BackgroundSelector from "./BackgroundSelector";

interface OptionsMenuProps {
    backgroundUrls: Array<string>;
    bgIndex: number;
    setBgIndex: (num: number) => void;
}
export default function OptionsMenu({
    backgroundUrls,
    bgIndex,
    setBgIndex,
}: OptionsMenuProps): React.ReactElement {
    const [showBgMenu, setShowBgMenu] = useState<boolean>(false);
    return (
        <div className="options-menu-container">
            {showBgMenu ? (
                <BackgroundSelector
                    backgroundUrls={backgroundUrls}
                    bgIndex={bgIndex}
                    setBgIndex={setBgIndex}
                    setShowBgMenu={setShowBgMenu}
                />
            ) : (
                <div className="default-menu-container">
                    <button
                        className="change-background"
                        onClick={() => setShowBgMenu(!showBgMenu)}
                    >
                        Change Background
                    </button>
                </div>
            )}
        </div>
    );
}
