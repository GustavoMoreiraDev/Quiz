import React from "react";
import Image from "next/image";
import style from './style.module.css';

export function Background({ children }) {

    return (
        <>
            <section className={style['bg-container']}>
                <div className={style['teste-div']}>
                    <Image className={style['teste-img']} src={'/bg.webp'} width={'350'} height={'250'} alt="Quiz" />
                </div>
                {/* <Image className={`${style['bg-image']} ${style['zoom']}`} src={'/bg.webp'} width={1920} height={1080} loading="eager" alt="quiz - Spilinsh" /> */}
                <div className={style['bg-image-mask']}></div>
                {children}
            </section>
        </>
    )
}