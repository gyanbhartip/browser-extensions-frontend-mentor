import { memo, useCallback } from 'react';

type Props = {
    checked: boolean;
    setChecked: (_status: boolean) => void;
};

const Switch = ({ checked, setChecked }: Props) => {
    const _onChangeHandler = useCallback(() => {
        setChecked(!checked);
    }, [checked, setChecked]);
    return (
        <label className="relative mx-auto inline-block h-[1rem] w-[2rem]">
            <input
                type="checkbox"
                className="peer h-0 w-0 opacity-0"
                checked={checked}
                onChange={_onChangeHandler}
            />
            <span className="absolute top-0 right-0 bottom-0 left-0 cursor-pointer rounded-[2rem] border-1 border-gray-400 bg-[#525868] peer-checked:bg-[#f35b56] before:absolute before:top-1/2 before:left-0.5 before:h-[0.7rem] before:w-[0.7rem] before:-translate-y-1/2 before:rounded-[0.7rem] before:bg-white before:transition before:duration-300 peer-checked:before:left-[1px] peer-checked:before:translate-x-[1rem] peer-checked:before:bg-white" />
        </label>
    );
};

export default memo(Switch);
