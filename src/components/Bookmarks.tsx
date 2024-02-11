import React from "react";

export default function Bookmarks(): React.ReactElement {
    return (
        <div className="bookmarks-container">
            <TabGroupRow />
            <TabGroupRow />
            <TabGroupRow />
        </div>
    );
}

function TabGroupRow(): React.ReactNode {
    return (
        <div className="tab-group-row">
            <TabGroup title={"tab0"} />
            <TabGroup title={"tab1"} />
            <TabGroup title={"tab2"} />
        </div>
    );
}

function TabGroup({ title }: { title: string }): React.ReactElement {
    return (
        <div className="tab-group-wrapper">
            <div className="tab-group">
                <div className="title">{title}</div>
                <div className="content">
                    <div className="content-stuff"></div>
                    <div className="content-stuff"></div>
                    <div className="content-stuff"></div>
                </div>
            </div>
        </div>
    );
}
