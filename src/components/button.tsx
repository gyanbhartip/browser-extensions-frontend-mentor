import {
    type CSSProperties,
    type MouseEventHandler,
    type ReactNode,
    memo,
} from 'react';

type Props = {
    bgColor?: string;
    children: ReactNode;
    onClick: MouseEventHandler<HTMLButtonElement>;
};

const Button = ({ bgColor, children, onClick }: Props) => {
    return (
        <button
            onClick={onClick}
            style={
                bgColor
                    ? ({
                          '--btn-bg': bgColor,
                          '--btn-hover-bg': bgColor,
                      } as CSSProperties)
                    : ({
                          '--btn-bg': '#2f354b',
                          '--btn-hover-bg': '#525767',
                      } as CSSProperties)
            }
            type="button"
            className={
                'mx-auto rounded-4xl border border-gray-400 bg-[var(--btn-bg)] px-3.5 py-1.5 hover:bg-[var(--btn-hover-bg)] focus-visible:bg-[#525767] active:bg-[#f35b56] '
            }>
            {children}
        </button>
    );
};

export default memo(Button);
