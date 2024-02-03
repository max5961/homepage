import React from "react";
import { useState, useEffect } from "react";

interface BackgroundSelectorProps {
    backgrounds: Array<string>;
    bgIndex: number;
    setBgIndex: (num: number) => void;
    setShowBgMenu: (bool: boolean) => void;
}
export default function BackgroundSelector({
    backgrounds,
    bgIndex,
    setBgIndex,
    setShowBgMenu,
}: BackgroundSelectorProps): React.ReactElement {
    const [nextIndex, setNextIndex] = useState<number>(bgIndex);
    const [hidden, setHidden] = useState<boolean>(true);
    useEffect(() => {
        setHidden(false);
    }, []);

    function waitToFadeOut(): Promise<void> {
        setHidden(true);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 300);
        });
    }

    async function handleImageClick(index: number): Promise<void> {
        // re-render the background image by setting the index from which the
        // BackgroundImage prop gets the imported url from
        setBgIndex(index);
        setNextIndex(index);
    }

    async function handleCancelClick(): Promise<void> {
        // reset background to original first for more intuitive transition
        setBgIndex(0);
        await waitToFadeOut();
        // exit selection window
        setShowBgMenu(false);
    }

    async function handleApplyClick(): Promise<void> {
        await waitToFadeOut();

        // chosen image always appears at front of images
        // move chosen URL to front of containing array
        const chosenUrl: string = backgrounds.splice(nextIndex, 1)[0];
        backgrounds.unshift(chosenUrl);

        setBgIndex(0);
        setShowBgMenu(false);
    }

    function getBgElements(): Array<React.ReactElement> {
        const imageElems: React.ReactElement[] = [];

        for (let i = 0; i < backgrounds.length; i++) {
            const className: string =
                i === nextIndex ? "bg-tile chosen" : "bg-tile";

            const elem: React.ReactElement = (
                <button
                    className={className}
                    onClick={() => handleImageClick(i)}
                    key={i}
                >
                    <img src={backgrounds[i]} key={i} alt="" />
                </button>
            );

            imageElems.push(elem);
        }

        return imageElems;
    }

    return (
        <div
            className={
                hidden ? "bg-menu-container hidden" : "bg-menu-container"
            }
        >
            <div className="bg-images-container">{getBgElements()}</div>
            <div className="buttons-container">
                <button className="apply-changes" onClick={handleApplyClick}>
                    Apply
                </button>
                <button className="cancel-changes" onClick={handleCancelClick}>
                    Cancel
                </button>
            </div>
        </div>
    );
}
