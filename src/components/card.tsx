import { type MouseEvent, memo, useCallback, useState } from 'react';
import { useAppDispatch } from '../lib/Redux';
import { markActiveStatus } from '../lib/Redux/extension-slice';
import Button from './button';
import Confirmation from './confirmation';
import Switch from './switch';

type Props = {
    logo: string;
    name: string;
    description: string;
    isActive: boolean;
};

const Card = ({ logo, name, description, isActive }: Props) => {
    const dispatch = useAppDispatch();

    const [confirmationModalVisible, setConfirmationModalVisible] =
        useState(false);

    const onRemove = useCallback((e: MouseEvent) => {
        setConfirmationModalVisible(true);
    }, []);

    const onChangeIsActive = useCallback(
        (_status: boolean) => {
            dispatch(
                markActiveStatus({
                    name,
                    isActive: _status,
                }),
            );
        },
        [dispatch, name],
    );

    return (
        <>
            <div className="border border-gray-800 rounded-2xl py-4 px-3 w-full">
                <div className="flex py-2">
                    <img
                        src={logo}
                        alt={`${name} logo`}
                        className="mr-4 self-start"
                    />
                    <div className="flex flex-col">
                        <span className="font-bold text-lg">{name}</span>
                        <span className="text-md mt-2">{description}</span>
                    </div>
                </div>
                <div className="flex justify-between items-center py-2">
                    <Button onClick={onRemove}>Remove</Button>
                    <Switch checked={isActive} setChecked={onChangeIsActive} />
                </div>
            </div>
            {confirmationModalVisible ? (
                <Confirmation
                    extensionName={name}
                    setConfirmationModalVisible={setConfirmationModalVisible}
                />
            ) : null}
        </>
    );
};

export default memo(Card);
