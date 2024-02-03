import React from "react";
import { useState } from "react";
import { backgrounds } from "./backgrounds";

export default function App(): React.ReactElement {
    const [background, setBackground] = useState(backgrounds[0]);
    return (
        <div id="content">
            <BackgroundImage background={background} />
            <HandleBackgroundUI setBackground={setBackground} />
        </div>
    );
}

interface BackgroundImageProps {
    background: string;
}
function BackgroundImage({
    background,
}: BackgroundImageProps): React.ReactElement {
    return (
        <div
            className="background-image"
            style={{ backgroundImage: `url(${background})` }}
        ></div>
    );
}

interface HandleBackgroundUIProps {
    setBackground: (string) => void;
}
function HandleBackgroundUI({
    setBackground,
}: HandleBackgroundUIProps): React.ReactElement {
    const [choosing, setChoosing] = useState(false);

    function handleClick(): void {
        const newChoosing: boolean = !choosing;
        setChoosing(newChoosing);
    }

    if (!choosing) {
        return (
            <button className="change-background" onClick={handleClick}>
                Change Background
            </button>
        );
    } else {
        return (
            <ChooseBackgroundUI
                handleClick={handleClick}
                setBackground={setBackground}
            />
        );
    }
}

interface ChooseBackgroundUIProps {
    handleClick: () => void;
    setBackground: (string) => void;
}
function ChooseBackgroundUI({
    handleClick,
    setBackground,
}: ChooseBackgroundUIProps): React.ReactElement {
    function getBackgroundsArray(): React.ReactElement[] {
        return backgrounds.map((bg, index) => {
            return (
                <button
                    className="new-bg"
                    key={index}
                    onClick={() => setBackground(backgrounds[index])}
                >
                    <img src={bg} alt="" key={index} />
                </button>
            );
        });
    }

    return (
        <div className="choose-backgrounds-ui-container">
            <div className="backgrounds-container">{getBackgroundsArray()}</div>
            <button className="apply-changes" onClick={handleClick}>
                Apply Changes
            </button>
        </div>
    );
}
