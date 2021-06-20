/// <reference path="../../typings/discord.d.ts"/>
import {Caret} from "@discord/icons";
import {joinClassNames} from "@discord/utils";
import React, {useState} from "react";
import styles from "./category.scss";

export default function Category({label, children, className, look = Category.Looks.DEFAULT}) {
    const [opened, toggle] = useState(false);

    const isCompact = look === styles.compact;

    return (
        <div className={joinClassNames(className, look, styles.category, {[styles.opened]: opened})}>
            <div className={styles.header} onClick={() => toggle(!opened)}>
                <div className={styles.label}>{label}</div>
                {
                    isCompact ? <div className={styles.stroke} /> : null
                }
                <Caret direction={opened ? Caret.Directions.DOWN : (isCompact ? Caret.Directions.LEFT : Caret.Directions.RIGHT)} className={styles.caret} />
            </div>
            {
                !isCompact ? <div className={styles.divider} /> : null
            }
            <div className={styles.content}>{opened ? children : null}</div>
        </div>
    );
};

Category.Looks = {
    COMPACT: styles.compact,
    DEFAULT: styles.default
};