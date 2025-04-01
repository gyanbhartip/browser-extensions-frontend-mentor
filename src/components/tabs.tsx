import { memo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../lib/Redux';
import { setSelectedTab } from '../lib/Redux/extension-slice';
import { selectExtensionsMeta } from '../lib/Redux/selector';
import Button from './button';

const tabList = ['All', 'Active', 'Inactive'] as const;

export type Tab = (typeof tabList)[number];

const Tabs = () => {
    const dispatch = useAppDispatch();
    const { selectedTab } = useAppSelector(selectExtensionsMeta);
    const onTabSelect = useCallback(
        (_tabType: Tab) => () => {
            dispatch(setSelectedTab(_tabType));
        },
        [dispatch],
    );

    return (
        <nav className="flex items-center justify-between mb-8">
            <span className="text-3xl font-bold">Extensions List</span>
            <div className="flex gap-2.5">
                {tabList.map(_tabItem => (
                    <Button
                        onClick={onTabSelect(_tabItem)}
                        key={_tabItem}
                        bgColor={
                            selectedTab === _tabItem
                                ? 'var(--color-accent)'
                                : undefined
                        }>
                        {_tabItem}
                    </Button>
                ))}
            </div>
        </nav>
    );
};

export default memo(Tabs);
