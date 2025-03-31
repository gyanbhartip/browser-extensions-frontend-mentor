import { type Dispatch, type SetStateAction, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useAppDispatch } from '../lib/Redux';
import { remove } from '../lib/Redux/extension-slice';
import Button from './button';

type Props = {
    extensionName: string;
    setConfirmationModalVisible: Dispatch<SetStateAction<boolean>>;
};

const Confirmation = ({
    extensionName,
    setConfirmationModalVisible,
}: Props) => {
    const dispatch = useAppDispatch();

    const onYes = useCallback(() => {
        dispatch(remove(extensionName));
        setConfirmationModalVisible(false);
    }, [dispatch, extensionName, setConfirmationModalVisible]);

    const onNo = useCallback(() => {
        setConfirmationModalVisible(false);
    }, [setConfirmationModalVisible]);

    return (
        <>
            {createPortal(
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="dark:bg-dark-gray-400 p-6 rounded-xl shadow-lg max-w-sm w-full mx-4">
                        <h2 className="text-xl font-semibold mb-6 text-center">
                            Do you really want to remove {extensionName}?
                        </h2>
                        <div className="flex items-center justify-center gap-4">
                            <Button onClick={onYes}>
                                <span className="uppercase">yes</span>
                            </Button>
                            <Button onClick={onNo}>
                                <span className="uppercase">no</span>
                            </Button>
                        </div>
                    </div>
                </div>,
                document.body,
            )}
        </>
    );
};

export default Confirmation;
